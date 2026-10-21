"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, ShoppingBag } from "lucide-react";
import type { Producto } from "@/lib/tipos";
import { useCarrito } from "@/lib/carrito";
import { formatCOP } from "@/lib/formato";
import Boton from "@/components/ui/boton";
import MPModal from "./mp-modal";

export default function SelectorProducto({
  producto,
  onColorChange,
}: {
  producto: Producto;
  onColorChange?: (imagen?: string) => void;
}) {
  const { agregar } = useCarrito();
  const [talla, setTalla] = useState<string | null>(
    producto.tallas.length === 1 ? producto.tallas[0] : null
  );
  const [color, setColor] = useState<string | null>(
    producto.colores.length === 1 ? producto.colores[0].nombre : null
  );
  const [error, setError] = useState<string | null>(null);
  const [mpAbierto, setMpAbierto] = useState(false);
  const [agregado, setAgregado] = useState(false);

  const requiereTalla = producto.tallas.length > 0;
  const faltan = (requiereTalla && !talla) || !color;

  useEffect(() => {
    const c = producto.colores.find((x) => x.nombre === color);
    onColorChange?.(c?.imagen);
  }, [color, producto.colores, onColorChange]);

  function validar(): boolean {
    if (faltan) {
      setError(
        requiereTalla && !talla
          ? "Selecciona una talla para continuar."
          : "Selecciona un color para continuar."
      );
      return false;
    }
    setError(null);
    return true;
  }

  function alAgregar() {
    if (!validar()) return;
    agregar({
      productoSlug: producto.slug,
      talla: talla ?? "Única",
      color: color ?? "Único",
      cantidad: 1,
    });
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2000);
  }

  function alPagarMP() {
    if (!validar()) return;
    setMpAbierto(true);
  }

  return (
    <div className="space-y-6">
      {requiereTalla && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-ceniza mb-3">
            Talla
          </p>
          <div className="flex flex-wrap gap-2">
            {producto.tallas.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTalla(t)}
                className={`min-w-12 h-12 px-4 rounded-2xl text-sm font-bold border-[1.5px] transition-colors ${
                  talla === t
                    ? "bg-verde text-blanco border-verde"
                    : "bg-white border-vidrio-borde hover:bg-verde-50"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {producto.colores.length > 1 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-ceniza mb-3">
            Color
          </p>
          <div className="flex flex-wrap gap-2">
            {producto.colores.map((c) => (
              <button
                key={c.nombre}
                type="button"
                onClick={() => setColor(c.nombre)}
                className={`inline-flex items-center gap-2 px-4 h-12 rounded-2xl text-xs font-bold border-[1.5px] transition-colors ${
                  color === c.nombre
                    ? "bg-verde text-blanco border-verde"
                    : "bg-white border-vidrio-borde hover:bg-verde-50"
                }`}
              >
                <span
                  className="size-4 rounded-full border border-carbon/20 shrink-0"
                  style={{ background: c.hex }}
                  aria-hidden
                />
                {c.nombre}
              </button>
            ))}
          </div>
        </div>
      )}

      {producto.colores.length === 1 && (
        <p className="text-xs font-semibold text-ceniza">
          Color: {producto.colores[0].nombre}
        </p>
      )}

      {error && (
        <p className="text-sm font-semibold text-carbon bg-[#FFF3C4] rounded-2xl px-4 py-3">
          {error}
        </p>
      )}

      <div className="grid gap-3">
        <Boton onClick={alAgregar} className="w-full py-4 text-base">
          {agregado ? (
            <>
              <Check className="size-5" /> Agregado al carrito
            </>
          ) : (
            <>
              <ShoppingBag className="size-5" /> Agregar al carrito ·{" "}
              {formatCOP(producto.precio)}
            </>
          )}
        </Boton>
        <Boton
          variant="mp"
          onClick={alPagarMP}
          disabled={faltan}
          className="w-full py-4 text-base"
        >
          Pagar con Mercado Pago
        </Boton>
        <p className="text-xs text-ceniza text-center">
          Mercado Pago: registras tus datos de envío y pagas con el link oficial.
          Contra entrega: pagas al recibir el pedido.
        </p>
      </div>

      {mpAbierto && talla !== undefined && color && (
        <MPModal
          producto={producto}
          talla={talla ?? "Única"}
          color={color}
          onCerrar={() => setMpAbierto(false)}
        />
      )}
    </div>
  );
}

export function EstadoStock({ estado }: { estado: Producto["disponibilidad"] }) {
  const mapa = {
    "en-stock": { texto: "En stock", tono: "text-verde bg-verde-50" },
    "pocas-unidades": {
      texto: "Pocas unidades",
      tono: "text-carbon bg-[#FFF3C4]",
    },
    proximamente: { texto: "Próximamente", tono: "text-ceniza bg-humo" },
  } as const;
  const { texto, tono } = mapa[estado];
  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${tono}`}
    >
      {texto}
    </span>
  );
}

export { Loader2 };
