"use client";

import { useEffect, useState } from "react";
import { X, ExternalLink, Loader2, CheckCircle2 } from "lucide-react";
import type { DatosEnvio, Producto } from "@/lib/tipos";
import { MERCADO_PAGO, diasEstimados } from "@/lib/config";
import { enviarMercadoPago } from "@/lib/formspree";
import { formatCOP } from "@/lib/formato";
import Boton from "@/components/ui/boton";
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

export default function MPModal({
  producto,
  talla,
  color,
  onCerrar,
}: {
  producto: Producto;
  talla: string;
  color: string;
  onCerrar: () => void;
}) {
  const [paso, setPaso] = useState<"datos" | "exito">("datos");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [datos, setDatos] = useState<DatosEnvio>(VACIO);

  const link = producto.mercadopagoUrl ?? MERCADO_PAGO.linkGenerico;

  useEffect(() => {
    document.body.classList.add("scroll-bloqueado");
    const id = requestAnimationFrame(() => {
      try {
        const raw = localStorage.getItem(CLAVE_ENVIO);
        if (raw) setDatos({ ...VACIO, ...JSON.parse(raw) });
      } catch {
        /* ignorar */
      }
    });
    return () => {
      document.body.classList.remove("scroll-bloqueado");
      cancelAnimationFrame(id);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_ENVIO, JSON.stringify(datos));
    } catch {
      /* ignorar */
    }
  }, [datos]);

  function set(clave: keyof DatosEnvio, valor: string) {
    setDatos((d) => ({ ...d, [clave]: valor }));
  }

  async function alEnviar(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    setError(null);
    try {
      await enviarMercadoPago(
        [{ productoSlug: producto.slug, talla, color, cantidad: 1 }],
        datos
      );
      setPaso("exito");
      window.open(link, "_blank", "noopener,noreferrer");
    } catch {
      setError(
        "No pudimos registrar tus datos. Intenta de nuevo o escríbenos por WhatsApp."
      );
    } finally {
      setCargando(false);
    }
  }

  function campo(
    etiqueta: string,
    clave: keyof DatosEnvio,
    tipo = "text",
    requerido = true,
    autoComplete?: string,
    inputMode?: "text" | "tel" | "email" | "numeric",
    enterKeyHint?: "next" | "done" | "send",
    placeholder?: string
  ) {
    return (
      <label className="block">
        <span className="text-xs font-bold text-ceniza">
          {etiqueta}
          {requerido ? "" : " (opcional)"}
        </span>
        <input
          type={tipo}
          required={requerido}
          value={datos[clave]}
          onChange={(e) => set(clave, e.target.value)}
          name={clave}
          autoComplete={autoComplete}
          inputMode={inputMode}
          enterKeyHint={enterKeyHint}
          placeholder={placeholder}
          className="mt-1 w-full h-12 px-4 rounded-2xl bg-white border-[1.5px] border-vidrio-borde text-base sm:text-sm font-medium outline-none focus:border-verde"
        />
      </label>
    );
  }

  const dias = diasEstimados(datos.ciudad);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-carbon/50 backdrop-blur-sm"
        onClick={onCerrar}
        aria-label="Cerrar"
      />
      <div className="relative w-full sm:max-w-lg bg-fondo panel animar-entrada max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 vidrio-solido sticky top-0 rounded-t-[24px]">
          <h2 className="font-extrabold">Pago con Mercado Pago</h2>
          <button
            type="button"
            onClick={onCerrar}
            className="p-2 hover:bg-verde-50 rounded-full"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>

        {paso === "datos" ? (
          <form onSubmit={alEnviar} className="p-5 space-y-4 safe-area-pb">
            <div className="vidrio panel p-4">
              <p className="text-sm font-extrabold">{producto.nombre}</p>
              <p className="text-xs text-ceniza mt-0.5">
                Talla {talla} · {color}
              </p>
              <p className="text-lg font-extrabold text-verde mt-2">
                {formatCOP(producto.precio)}
              </p>
              <p className="text-xs text-ceniza mt-1">
                Envío gratis
                {dias ? ` · Entrega estimada ${dias}` : ""}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {campo(
                "Nombre completo",
                "nombre",
                "text",
                true,
                "name",
                "text",
                "next"
              )}
              {campo(
                "Teléfono / WhatsApp",
                "telefono",
                "tel",
                true,
                "tel",
                "tel",
                "next",
                "300 123 4567"
              )}
              {campo(
                "Correo electrónico",
                "email",
                "email",
                false,
                "email",
                "email",
                "next",
                "tu@correo.com"
              )}
              {campo(
                "Barrio",
                "barrio",
                "text",
                true,
                "address-level3",
                "text",
                "next"
              )}
              {campo(
                "Dirección",
                "direccion",
                "text",
                true,
                "street-address",
                "text",
                "done",
                "Calle, número, apto…"
              )}
            </div>
            <CampoCiudad valor={datos.ciudad} onChange={(v) => set("ciudad", v)} />
            {campo(
              "Notas de entrega",
              "notas",
              "text",
              false,
              undefined,
              "text",
              "done",
              "Horario preferido, portería…"
            )}

            {error && (
              <p className="text-sm font-semibold bg-[#FFF3C4] rounded-2xl px-4 py-3">
                {error}
              </p>
            )}

            <div className="vidrio panel p-4 space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-wide">
                Pasos del pago
              </p>
              <ol className="space-y-1.5 text-xs text-ceniza list-decimal list-inside">
                {MERCADO_PAGO.instrucciones.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ol>
            </div>

            <Boton type="submit" disabled={cargando} className="w-full py-4">
              {cargando ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Registrando…
                </>
              ) : (
                <>
                  Registrar envío y pagar {formatCOP(producto.precio)}
                </>
              )}
            </Boton>
            <p className="text-[11px] text-ceniza text-center">
              Confirmamos el pago manualmente y despachamos tu pedido.
            </p>
          </form>
        ) : (
          <div className="p-8 pb-12 text-center space-y-4 safe-area-pb">
            <CheckCircle2 className="size-12 text-verde mx-auto" />
            <h3 className="text-xl font-extrabold">Datos registrados</h3>
            <p className="text-sm text-ceniza max-w-sm mx-auto">
              Abrimos el link de Mercado Pago. Realiza el pago por{" "}
              <strong className="text-carbon">{formatCOP(producto.precio)}</strong>{" "}
              con la referencia{" "}
              <strong className="text-carbon">PACEFORM {producto.nombre}</strong>{" "}
              y envíanos el comprobante por WhatsApp.
            </p>
            <Boton href={link} external variant="mp" className="mx-auto">
              <ExternalLink className="size-4" /> Abrir Mercado Pago
            </Boton>
            <button
              type="button"
              onClick={onCerrar}
              className="block mx-auto text-sm font-bold text-verde underline underline-offset-4"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
