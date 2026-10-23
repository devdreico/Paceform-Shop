"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, Truck, ShieldCheck, Banknote } from "lucide-react";
import { useCarrito } from "@/lib/carrito";
import { productoPorSlug } from "@/data/productos";
import { formatCOP } from "@/lib/formato";
import { enviarContraEntrega } from "@/lib/pedidos-cliente";
import { departamentoParaMunicipio, municipioPerteneceA } from "@/lib/geografia-colombia";
import { totalPedido } from "@/lib/calculos-pedido";
import { registrarPedidoAceptado } from "@/lib/confirmacion-pedido";
import { WHATSAPP } from "@/lib/config";
import type { DatosEnvio } from "@/lib/tipos";
import Boton from "@/components/ui/boton";
import GlassPanel from "@/components/ui/glass-panel";
import CampoCiudad from "@/components/commerce/campo-ciudad";

const CLAVE_ENVIO = "paceform-envio";
const CLAVE_PEDIDO_PENDIENTE = "paceform-pedido-pendiente";
const VIGENCIA_ENVIO_MS = 30 * 24 * 60 * 60 * 1000;

const VACIO: DatosEnvio = {
  nombre: "",
  telefono: "",
  email: "",
  departamento: "",
  municipio: "",
  direccion: "",
  barrio: "",
  notas: "",
};

export default function CheckoutPage() {
  const { items, subtotal, listo, vaciar, avisoRestauracion } = useCarrito();
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [datos, setDatos] = useState<DatosEnvio>(VACIO);
  const [hidratado, setHidratado] = useState(false);
  const [pedidoPendiente, setPedidoPendiente] = useState<string | null>(null);
  const [reintentoAutorizado, setReintentoAutorizado] = useState(false);
  const envioEnCurso = useRef(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(CLAVE_ENVIO);
        const intentoPendiente = sessionStorage.getItem(CLAVE_PEDIDO_PENDIENTE);
        if (intentoPendiente && /^[0-9a-f-]{36}$/i.test(intentoPendiente)) {
          setPedidoPendiente(intentoPendiente);
        }
        if (raw) {
          const parseado: unknown = JSON.parse(raw);
          const sobre =
            typeof parseado === "object" && parseado !== null && "datos" in parseado
              ? parseado
              : null;
          if (
            sobre &&
            "actualizado" in sobre &&
            typeof sobre.actualizado === "number" &&
            Date.now() - sobre.actualizado > VIGENCIA_ENVIO_MS
          ) {
            localStorage.removeItem(CLAVE_ENVIO);
            setHidratado(true);
            return;
          }
          const guardado = (sobre && "datos" in sobre ? sobre.datos : parseado) as Partial<DatosEnvio> & {
            ciudad?: string;
          };
          const { ciudad: ciudadAnterior, ...datosGuardados } = guardado;
          const municipio = guardado.municipio || ciudadAnterior || "";
          const departamento = guardado.departamento || departamentoParaMunicipio(municipio);
          setDatos({
            ...VACIO,
            ...datosGuardados,
            departamento,
            municipio: municipioPerteneceA(departamento, municipio) ? municipio : "",
          });
        }
      } catch {
        /* ignorar */
      }
      setHidratado(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!hidratado) return;
    try {
      localStorage.setItem(
        CLAVE_ENVIO,
        JSON.stringify({ datos, actualizado: Date.now() })
      );
    } catch {
      /* ignorar */
    }
  }, [datos, hidratado]);

  function set(clave: keyof DatosEnvio, valor: string) {
    setError(null);
    setDatos((d) => ({ ...d, [clave]: valor }));
  }

  function cambiarTelefono(valor: string) {
    set("telefono", valor.replace(/\D/g, "").slice(0, 10));
  }

  async function alEnviar(e: React.FormEvent) {
    e.preventDefault();
    if (envioEnCurso.current) return;
    if (pedidoPendiente && !reintentoAutorizado) {
      setError("Verifica primero el estado del pedido antes de volver a enviarlo.");
      return;
    }
    if (items.length === 0) {
      setError("Tu carrito está vacío. Agrega un producto antes de confirmar.");
      return;
    }
    if (datos.telefono.length !== 10 || !datos.telefono.startsWith("3")) {
      setError("Revisa el número celular: debe tener 10 dígitos y comenzar por 3.");
      return;
    }
    if (!municipioPerteneceA(datos.departamento, datos.municipio)) {
      setError("Selecciona un departamento y un municipio válidos.");
      return;
    }
    envioEnCurso.current = true;
    setReintentoAutorizado(false);
    setCargando(true);
    setError(null);
    const pedidoId = pedidoPendiente ?? crypto.randomUUID();
    try {
      sessionStorage.setItem(CLAVE_PEDIDO_PENDIENTE, pedidoId);
    } catch {
      /* El bloqueo en memoria sigue activo durante este intento. */
    }
    try {
      await enviarContraEntrega(items, datos, pedidoId);
      registrarPedidoAceptado(pedidoId);
      setPedidoPendiente(null);
      setReintentoAutorizado(false);
      try {
        sessionStorage.removeItem(CLAVE_PEDIDO_PENDIENTE);
      } catch {
        /* La sesión puede no permitir almacenamiento. */
      }
      setPedidoPendiente(null);
      vaciar();
      try {
        localStorage.removeItem(CLAVE_ENVIO);
      } catch {
        /* ignorar */
      }
      const params = new URLSearchParams({
        id: pedidoId,
      });
      router.push(`/pedido/exito?${params.toString()}`);
    } catch (error) {
      const ambiguo = error instanceof Error && error.message === "FORMULARIO_TIMEOUT";
      const mensajeServidor =
        error instanceof Error &&
        error.message !== "Failed to fetch" &&
        error.message !== "FORMULARIO_TIMEOUT"
          ? error.message
          : "No fue posible registrar el pedido. Conservamos tu carrito; inténtalo de nuevo.";
      if (ambiguo) {
        setPedidoPendiente(pedidoId);
      } else {
        setPedidoPendiente(null);
        setReintentoAutorizado(false);
        try {
          sessionStorage.removeItem(CLAVE_PEDIDO_PENDIENTE);
        } catch {
          /* La sesión puede no permitir almacenamiento. */
        }
      }
      setError(ambiguo
        ? `No recibimos confirmación. Conservamos el pedido y la referencia ${pedidoId.slice(0, 8).toUpperCase()}; consúltala por WhatsApp antes de reintentar.`
        : mensajeServidor);
      envioEnCurso.current = false;
      setCargando(false);
    }
  }

  if (!listo) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-sm text-ceniza">Cargando checkout…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-extrabold">No hay productos para pagar</h1>
        <p className="mt-2 text-sm text-ceniza">
          Agrega productos al carrito para continuar con la compra contra entrega.
        </p>
        <Boton href="/tienda" className="mt-6">
          Ir a la tienda
        </Boton>
      </div>
    );
  }

  const total = totalPedido(items);
  const emailNormalizado = datos.email.trim();
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado);
  const sugerenciaGmail = emailNormalizado && !emailValido
    ? `${emailNormalizado.split("@")[0]}@gmail.com`
    : "";
  const contactoRevision = `Hola PACEFORM, necesito verificar el pedido contra entrega ${pedidoPendiente?.slice(0, 8).toUpperCase() ?? ""} antes de reintentarlo.`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 pb-40 lg:pb-10">
      <p className="text-xs font-bold uppercase tracking-wide text-verde">
        Checkout · Contra entrega
      </p>
      <h1 className="text-3xl font-extrabold mt-1">Finalizar compra</h1>
      <p className="mt-2 text-sm text-ceniza max-w-xl">
        Pagas en efectivo al recibir el pedido. Completa tus datos de envío y
        registramos el pedido automáticamente.
      </p>
      {avisoRestauracion && (
        <p role="status" className="mt-4 rounded-xl bg-[#FFF3C4] px-4 py-3 text-sm font-semibold">
          Corregimos variantes antiguas del carrito. Revisa los productos antes de confirmar.
        </p>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
        <form
          id="checkout-form"
          onSubmit={alEnviar}
          className="order-1 space-y-5"
        >
          <GlassPanel solido className="p-6">
            <h2 className="text-base font-extrabold inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-verde" /> Datos de contacto
            </h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold text-ceniza">
                  Nombre completo *
                </span>
                <input
                  required
                  value={datos.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                  name="nombre"
                  autoComplete="name"
                  enterKeyHint="next"
                  className="mt-1 w-full h-12 px-4 rounded-2xl bg-white border-[1.5px] border-vidrio-borde text-base sm:text-sm font-medium outline-none focus:border-verde"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold text-ceniza">
                  Teléfono / WhatsApp *
                </span>
                <input
                  required
                  type="tel"
                  value={datos.telefono}
                  onChange={(e) => cambiarTelefono(e.target.value)}
                  name="telefono"
                  autoComplete="tel-national"
                  inputMode="tel"
                  enterKeyHint="next"
                  minLength={10}
                  maxLength={10}
                  pattern="3[0-9]{9}"
                  placeholder="3001234567"
                  aria-describedby="telefono-ayuda"
                  className="mt-1 w-full h-12 pl-14 pr-4 rounded-2xl bg-white border-[1.5px] border-vidrio-borde text-base sm:text-sm font-medium outline-none focus:border-verde"
                />
                <span className="relative -mt-12 ml-4 flex h-12 items-center text-sm font-bold text-ceniza pointer-events-none">
                  +57
                </span>
                <span id="telefono-ayuda" className="sr-only">
                  Escribe los 10 dígitos de tu celular colombiano, sin el prefijo +57.
                </span>
              </label>
              <label className="block">
                <span className="text-xs font-bold text-ceniza">
                  Correo electrónico (opcional)
                </span>
                <input
                  type="email"
                  value={datos.email}
                  onChange={(e) => set("email", e.target.value)}
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  enterKeyHint="next"
                  placeholder="tu@correo.com"
                  className="mt-1 w-full h-12 px-4 rounded-2xl bg-white border-[1.5px] border-vidrio-borde text-base sm:text-sm font-medium outline-none focus:border-verde"
                />
                {sugerenciaGmail && (
                  <button
                    type="button"
                    onClick={() => set("email", sugerenciaGmail)}
                    className="mt-2 text-xs font-semibold text-verde underline underline-offset-2"
                  >
                    Usar {sugerenciaGmail}
                  </button>
                )}
              </label>
            </div>
          </GlassPanel>

          <GlassPanel solido className="p-6">
            <h2 className="text-base font-extrabold inline-flex items-center gap-2">
              <Truck className="size-4 text-verde" /> Dirección de envío
            </h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <CampoCiudad
                departamento={datos.departamento}
                municipio={datos.municipio}
                onDepartamentoChange={(departamento) => {
                  setError(null);
                  setDatos((actual) => ({ ...actual, departamento, municipio: "" }));
                }}
                onMunicipioChange={(municipio) => set("municipio", municipio)}
              />
              <label className="block">
                <span className="text-xs font-bold text-ceniza">Barrio *</span>
                <input
                  required
                  value={datos.barrio}
                  onChange={(e) => set("barrio", e.target.value)}
                  name="barrio"
                  autoComplete="address-level3"
                  enterKeyHint="next"
                  className="mt-1 w-full h-12 px-4 rounded-2xl bg-white border-[1.5px] border-vidrio-borde text-base sm:text-sm font-medium outline-none focus:border-verde"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold text-ceniza">
                  Dirección completa *
                </span>
                <input
                  required
                  value={datos.direccion}
                  onChange={(e) => set("direccion", e.target.value)}
                  placeholder="Calle, número, apartamento, referencias"
                  name="direccion"
                  autoComplete="street-address"
                  enterKeyHint="done"
                  className="mt-1 w-full h-12 px-4 rounded-2xl bg-white border-[1.5px] border-vidrio-borde text-base sm:text-sm font-medium outline-none focus:border-verde"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-xs font-bold text-ceniza">
                  Notas de entrega (opcional)
                </span>
                <textarea
                  rows={3}
                  value={datos.notas}
                  onChange={(e) => set("notas", e.target.value)}
                  placeholder="Horario preferido, portería, etc."
                  name="notas"
                  className="mt-1 w-full px-4 py-3 rounded-2xl bg-white border-[1.5px] border-vidrio-borde text-base sm:text-sm font-medium outline-none focus:border-verde resize-none"
                />
              </label>
            </div>
          </GlassPanel>

          {error && (
            <div role="alert" className="space-y-3 rounded-2xl bg-[#FFF3C4] px-4 py-3">
              <p className="text-sm font-semibold">{error}</p>
              {pedidoPendiente && (
                <div className="flex flex-wrap gap-2">
                  <Boton
                    href={`https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(contactoRevision)}`}
                    external
                    className="min-h-10 px-4 py-2 text-xs"
                  >
                    Verificar por WhatsApp
                  </Boton>
                  <button
                    type="button"
                    onClick={() => {
                      setReintentoAutorizado(true);
                      setError("Reintentaremos con la misma referencia del pedido.");
                    }}
                    className="min-h-10 px-3 text-xs font-semibold underline underline-offset-2"
                  >
                    Ya verifiqué; reintentar
                  </button>
                </div>
              )}
            </div>
          )}
        </form>

        <GlassPanel solido className="order-2 p-6 lg:sticky lg:top-20">
          <h2 className="text-base font-extrabold">Tu pedido</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item, i) => {
              const prod = productoPorSlug(item.productoSlug);
              if (!prod) return null;
              return (
                <li key={i} className="flex gap-3">
                  <span className="relative size-14 rounded-xl bg-humo overflow-hidden shrink-0">
                    <Image
                      src={prod.imagen}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-contain"
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate">{prod.nombre}</p>
                    <p className="text-[11px] text-ceniza">
                      Talla {item.talla} · {item.color} · x{item.cantidad}
                    </p>
                  </div>
                  <p className="text-xs font-extrabold text-verde whitespace-nowrap">
                    {formatCOP(prod.precio * item.cantidad)}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-5 pt-4 border-t border-verde/10 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ceniza font-semibold">Subtotal</span>
              <span className="font-bold">{formatCOP(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ceniza font-semibold">Envío</span>
              <span className="font-extrabold text-verde">GRATIS</span>
            </div>
            <div className="flex justify-between text-base pt-2">
              <span className="font-extrabold">Total a pagar</span>
              <span className="font-extrabold text-verde">{formatCOP(total)}</span>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-ceniza">
            Al confirmar, enviamos tu pedido a nuestro sistema y te contactamos
            por WhatsApp para coordinar la entrega. Pagas en efectivo al recibir.
          </p>

          <div className="hidden lg:block mt-5">
            <Boton
              type="submit"
              form="checkout-form"
              disabled={cargando || (pedidoPendiente !== null && !reintentoAutorizado)}
              className="w-full py-4 min-h-14 text-base"
            >
              {cargando ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Registrando…
                </>
              ) : (
                "Confirmar pedido contra entrega"
              )}
            </Boton>
          </div>
        </GlassPanel>
      </div>

      {/* CTA sticky móvil */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 vidrio-solido border-t border-verde/12 px-4 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
        <Boton
          type="submit"
          form="checkout-form"
              disabled={cargando || (pedidoPendiente !== null && !reintentoAutorizado)}
          className="w-full py-4 min-h-14 text-base"
        >
          {cargando ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Registrando pedido…
            </>
          ) : (
            <>
              <Banknote className="size-5" /> Confirmar · {formatCOP(total)}
            </>
          )}
        </Boton>
      </div>
    </div>
  );
}
