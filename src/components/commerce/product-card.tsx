import Link from "next/link";
import type { Producto } from "@/lib/tipos";
import { formatCOP } from "@/lib/formato";
import Badge from "@/components/ui/badge";
import { categoriaPorSlug } from "@/data/productos";

export default function ProductCard({ producto }: { producto: Producto }) {
  const categoria = categoriaPorSlug(producto.categoriaSlug);

  return (
    <Link
      href={`/tienda/${producto.slug}`}
      className="group vidrio panel overflow-hidden flex flex-col sin-reflejos hover:border-verde/30 transition-colors"
    >
      <div className="relative aspect-[4/3] bg-humo overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="size-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        {producto.etiqueta && (
          <div className="absolute top-3 left-3">
            <Badge>{producto.etiqueta}</Badge>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-1">
        {categoria && (
          <p className="text-[11px] font-bold uppercase tracking-wide text-ceniza">
            {categoria.nombre}
          </p>
        )}
        <h3 className="text-sm sm:text-base font-extrabold leading-tight">
          {producto.nombre}
        </h3>
        <p className="text-xs text-ceniza leading-relaxed line-clamp-2">
          {producto.descripcionCorta}
        </p>
        <div className="mt-auto pt-3 flex items-end justify-between gap-2">
          <div>
            <p className="text-lg font-extrabold text-verde leading-none">
              {formatCOP(producto.precio)}
            </p>
            {producto.precioAntes && (
              <p className="text-xs font-bold text-ceniza line-through mt-1">
                {formatCOP(producto.precioAntes)}
              </p>
            )}
          </div>
          {producto.tallas.length > 0 && (
            <span className="text-[11px] font-semibold text-ceniza">
              {producto.tallas.length} tallas
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
