"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Truck, ShieldCheck, Banknote } from "lucide-react";
import { useCarrito, totalDe } from "@/lib/carrito";
import { productoPorSlug } from "@/data/productos";
import { formatCOP } from "@/lib/formato";
import { enviarContraEntrega } from "@/lib/formspree";
import type { DatosEnvio } from "@/lib/tipos";
import Boton from "@/components/ui/boton";
import GlassPanel from "@/components/ui/glass-panel";
import CampoCiudad from "@/components/commerce/campo-ciudad";

const CLAVE_ENVIO = "paceform-envio";

const VACIO: DatosEnvio = {
  nombre: "",
  telefono: "",
  email: "",
  ciudad: "",
  direccion: "",
  barrio: "",
  notas: "",
};

export default function CheckoutPage() {
  const { items, subtotal, listo, vaciar } = useCarrito();
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [datos, setDatos] = useState<DatosEnvio>(VACIO);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(CLAVE_ENVIO);
        if (raw) setDatos({ ...VACIO, ...JSON.parse(raw) });
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
      localStorage.setItem(CLAVE_ENVIO, JSON.stringify(datos));
    } catch {
      /* ignorar */
    }
  }, [datos, hidratado]);

  function set(clave: keyof DatosEnvio, valor: string) {
    setDatos((d) => ({ ...d, [clave]: valor }));
  }

  async function alEnviar(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setCargando(true);
    setError(null);
    try {
      await enviarContraEntrega(items, datos);
      vaciar();
      try {
        localStorage.removeItem(CLAVE_ENVIO);
      } catch {
        /* ignorar */
      }
      const params = new URLSearchParams({
        nombre: datos.nombre,
        ciudad: datos.ciudad,
        total: String(totalDe(items)),
      });
      router.push(`/pedido/exito?${params.toString()}`);
    } catch {
      setError(
        "No fue posible registrar el pedido. Verifica tus datos o escríbenos por WhatsApp."
      );
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

  const total = totalDe(items);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 pb-28 lg:pb-10">
      <p className="text-xs font-bold uppercase tracking-wide text-verde">
        Checkout · Contra entrega
      </p>
      <h1 className="text-3xl font-extrabold mt-1">Finalizar compra</h1>
      <p className="mt-2 text-sm text-ceniza max-w-xl">
        Pagas en efectivo al recibir el pedido. Completa tus datos de envío y
        registramos el pedido automáticamente.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px] lg:items-start">
        <form
          id="checkout-form"
          onSubmit={alEnviar}
          className="order-2 lg:order-1 space-y-5"
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
                  onChange={(e) => set("telefono", e.target.value)}
                  name="telefono"
                  autoComplete="tel"
                  inputMode="tel"
                  enterKeyHint="next"
                  placeholder="300 123 4567"
                  className="mt-1 w-full h-12 px-4 rounded-2xl bg-white border-[1.5px] border-vidrio-borde text-base sm:text-sm font-medium outline-none focus:border-verde"
                />
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
              </label>
            </div>
          </GlassPanel>

          <GlassPanel solido className="p-6">
            <h2 className="text-base font-extrabold inline-flex items-center gap-2">
              <Truck className="size-4 text-verde" /> Dirección de envío
            </h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              <CampoCiudad valor={datos.ciudad} onChange={(v) => set("ciudad", v)} />
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
            <p className="text-sm font-semibold bg-[#FFF3C4] rounded-2xl px-4 py-3">
              {error}
            </p>
          )}
        </form>

        <GlassPanel solido className="order-1 lg:order-2 p-6 lg:sticky lg:top-20">
          <h2 className="text-base font-extrabold">Tu pedido</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item, i) => {
              const prod = productoPorSlug(item.productoSlug);
              if (!prod) return null;
              return (
                <li key={i} className="flex gap-3">
                  <span className="size-14 rounded-xl bg-humo overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={prod.imagen} alt="" className="size-full object-cover" />
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
              disabled={cargando}
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
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 vidrio-solido border-t border-verde/12 safe-area-pb px-4 pt-3">
        <Boton
          type="submit"
          form="checkout-form"
          disabled={cargando}
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
