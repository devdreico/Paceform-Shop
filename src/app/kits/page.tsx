import Link from "next/link";
import { Boxes, Clock } from "lucide-react";
import { kits } from "@/data/kits";
import { productoPorSlug } from "@/data/productos";
import { formatCOP } from "@/lib/formato";
import GlassPanel from "@/components/ui/glass-panel";
import Badge from "@/components/ui/badge";

export const metadata = {
  title: "Kits de entrenamiento",
  description:
    "Conjuntos de productos complementarios para correr, entrenar y recuperar.",
};

export default function KitsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-wide text-verde">
        Combos con sentido
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
        Kits de entrenamiento
      </h1>
      <p className="mt-2 text-sm text-ceniza max-w-xl">
        Conjuntos pensados para resolver una necesidad completa, no para inflar el
        carrito. Cada kit explica por qué van juntos.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {kits.map((k) => {
          const items = k.productos
            .map(productoPorSlug)
            .filter((p): p is NonNullable<typeof p> => Boolean(p));
          const total = items.reduce((a, p) => a + p.precio, 0);

          return (
            <GlassPanel key={k.slug} className="p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-extrabold">{k.nombre}</h2>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-ceniza mt-1">
                    {items.length} producto{items.length === 1 ? "" : "s"}
                  </p>
                </div>
                {k.estado === "disponible" ? (
                  <Badge>Disponible</Badge>
                ) : (
                  <Badge tono="claro">
                    <Clock className="size-3 mr-1" /> En armación
                  </Badge>
                )}
              </div>

              <p className="text-xs text-ceniza leading-relaxed">{k.descripcion}</p>

              {items.length > 0 && (
                <ul className="space-y-2">
                  {items.map((p) => (
                    <li key={p.slug} className="flex items-center gap-3">
                      <span className="size-9 rounded-xl bg-humo overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.imagen} alt="" className="size-full object-cover" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/tienda/${p.slug}`}
                          className="text-sm font-bold hover:text-verde truncate block"
                        >
                          {p.nombre}
                        </Link>
                      </div>
                      <p className="text-xs font-extrabold text-verde">
                        {formatCOP(p.precio)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-3 border-t border-verde/10 flex items-center justify-between gap-3">
                {total > 0 ? (
                  <>
                    <div>
                      <p className="text-[11px] text-ceniza font-semibold">Total</p>
                      <p className="text-lg font-extrabold text-verde">
                        {formatCOP(total)}
                      </p>
                    </div>
                    <Link
                      href={`/tienda/${items[0].slug}`}
                      className="btn-primario px-6 py-3 text-sm inline-flex items-center gap-2"
                    >
                      <Boxes className="size-4" /> Ver productos
                    </Link>
                  </>
                ) : (
                  <p className="text-xs font-semibold text-ceniza">
                    Este kit se activará cuando sumemos sus productos al catálogo.
                  </p>
                )}
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </div>
  );
}
