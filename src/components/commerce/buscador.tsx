"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X, Package } from "lucide-react";
import { buscarProductos, categorias } from "@/data/productos";
import { formatCOP } from "@/lib/formato";
import Link from "next/link";

export default function Buscador({ onCerrar }: { onCerrar: () => void }) {
  const [q, setQ] = useState("");
  const resultados = useMemo(() => buscarProductos(q), [q]);

  useEffect(() => {
    document.body.classList.add("scroll-bloqueado");
    return () => document.body.classList.remove("scroll-bloqueado");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <button
        type="button"
        className="absolute inset-0 bg-carbon/40 backdrop-blur-sm"
        onClick={onCerrar}
        aria-label="Cerrar búsqueda"
      />
      <div className="relative w-full max-w-xl vidrio-solido panel animar-entrada overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-vidrio-borde">
          <Search className="size-5 text-verde shrink-0" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre, categoría o uso…"
            className="flex-1 min-w-0 bg-transparent outline-none text-base sm:text-sm font-medium placeholder:text-ceniza"
          />
          <button
            type="button"
            onClick={onCerrar}
            className="shrink-0 p-2.5 -mr-2 hover:bg-verde-50 rounded-full"
            aria-label="Cerrar"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!q.trim() && (
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-ceniza mb-3">
                Categorías
              </p>
              <div className="flex flex-wrap gap-2">
                {categorias.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/categorias/${c.slug}`}
                    onClick={onCerrar}
                    className="px-4 py-2 rounded-full bg-white border-[1.5px] border-vidrio-borde text-xs font-semibold hover:bg-verde-50"
                  >
                    {c.nombre}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {q.trim() && resultados.length === 0 && (
            <div className="p-8 text-center">
              <Package className="size-8 text-ceniza mx-auto" />
              <p className="mt-3 text-sm font-semibold">
                Sin resultados para «{q}»
              </p>
              <p className="mt-1 text-xs text-ceniza">
                Estamos sumando productos al catálogo. Escríbenos por WhatsApp
                si buscas algo específico.
              </p>
            </div>
          )}

          {resultados.map((p) => (
            <Link
              key={p.slug}
              href={`/tienda/${p.slug}`}
              onClick={onCerrar}
              className="flex items-center gap-4 px-5 py-4 min-h-14 hover:bg-verde-50 transition-colors border-b border-vidrio-borde last:border-0"
            >
              <div className="size-14 rounded-2xl bg-humo shrink-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.imagen}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate">{p.nombre}</p>
                <p className="text-xs text-ceniza truncate">{p.descripcionCorta}</p>
              </div>
              <p className="ml-auto text-sm font-extrabold text-verde whitespace-nowrap">
                {formatCOP(p.precio)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
