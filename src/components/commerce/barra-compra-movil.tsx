"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, Check } from "lucide-react";
import { useCarrito } from "@/lib/carrito";
import { formatCOP } from "@/lib/formato";
import type { Producto } from "@/lib/tipos";
import { cn } from "@/lib/cn";

export default function BarraCompraMovil({
  producto,
  talla,
  color,
  requerido = false,
  onIntentar,
}: {
  producto: Producto;
  talla: string | null;
  color: string | null;
  requerido?: boolean;
  onIntentar?: () => void;
}) {
  const { totalArticulos, agregar, setAbierto, listo } = useCarrito();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [rebotar, setRebotar] = useState(false);
  const anterior = useRef(totalArticulos);

  const faltaSeleccion =
    (producto.tallas.length > 0 && !talla) || !color;

  function alAgregar() {
    if (requerido || faltaSeleccion) {
      if (onIntentar) {
        onIntentar();
        return;
      }
      setAbierto(true);
      return;
    }
    agregar({
      productoSlug: producto.slug,
      talla: talla ?? "Única",
      color: color ?? "Único",
      cantidad: 1,
    });
    setAbierto(true);
  }

  useEffect(() => {
    if (!listo) return;
    const subio = totalArticulos > anterior.current;
    anterior.current = totalArticulos;
    if (!subio) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const t = setTimeout(() => {
      setRebotar(true);
      setTimeout(() => setRebotar(false), 450);
    }, 0);
    return () => clearTimeout(t);
  }, [totalArticulos, listo]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > 280);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 vidrio-solido sin-reflejos border-t border-vidrio-borde px-4 py-3 safe-area-pb">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-wide text-ceniza truncate">
            {producto.nombre}
          </p>
          <p className="text-base font-extrabold text-verde leading-tight">
            {formatCOP(producto.precio)}
          </p>
        </div>
        <button
          type="button"
          onClick={alAgregar}
          className={cn(
            "btn-primario inline-flex items-center justify-center gap-2 px-5 py-3 min-h-11 text-sm shrink-0",
            rebotar && "badge-bounce"
          )}
        >
          {rebotar ? (
            <Check className="size-4" />
          ) : (
            <ShoppingBag className="size-4" />
          )}
          Agregar
          {totalArticulos > 0 && (
            <span className="ml-0.5 size-5 rounded-full bg-white/20 text-[10px] font-bold flex items-center justify-center">
              {totalArticulos}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
