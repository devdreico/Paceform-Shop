import Link from "next/link";
import type { Producto } from "@/lib/tipos";
import { formatCOP } from "@/lib/formato";
import Badge from "@/components/ui/badge";
import { categoriaPorSlug } from "@/data/productos";

export default function ProductCard({ producto }: { producto: Producto }) {
  const categoria = categoriaPorSlug(producto.categoriaSlug);
  const descuento =
    producto.precioAntes && producto.precioAntes > producto.precio
      ? Math.round((1 - producto.precio / producto.precioAntes) * 100)
      : null;

  return (
    <Link
      href={`/tienda/${producto.slug}`}
      className="group vidrio-card tarjeta tarjeta-hover overflow-hidden flex flex-col sin-reflejos"
    >
      <div className="relative aspect-square bg-humo overflow-hidden rounded-t-[22px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="size-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        {(producto.etiqueta || descuento) && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {producto.etiqueta && <Badge>{producto.etiqueta}</Badge>}
            {descuento && <Badge tono="amarillo">-{descuento}%</Badge>}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-1 min-w-0">
        {categoria && (
          <p className="text-[11px] font-bold uppercase tracking-wide text-ceniza truncate">
            {categoria.nombre}
          </p>
        )}
        <h3 className="text-sm sm:text-base font-extrabold leading-tight line-clamp-2 break-words">
          {producto.nombre}
        </h3>
        <p className="text-xs text-ceniza leading-relaxed line-clamp-2 hidden sm:block">
          {producto.descripcionCorta}
        </p>
        <div className="mt-auto pt-3 flex items-end justify-between gap-2 min-w-0">
          <div className="min-w-0">
            <p className="text-base sm:text-lg font-extrabold text-verde leading-none">
              {formatCOP(producto.precio)}
            </p>
            {producto.precioAntes && (
              <p className="text-xs font-bold text-ceniza line-through mt-1">
                {formatCOP(producto.precioAntes)}
              </p>
            )}
          </div>
          {producto.tallas.length > 0 && (
            <span className="hidden sm:inline shrink-0 text-[11px] font-semibold text-ceniza">
              {producto.tallas.length} tallas
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
