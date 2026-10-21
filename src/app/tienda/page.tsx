"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { productos, categorias } from "@/data/productos";
import ProductCard from "@/components/commerce/product-card";
import Chip from "@/components/ui/chip";

const ordenes = [
  { id: "destacado", label: "Destacados" },
  { id: "precio-asc", label: "Menor precio" },
  { id: "precio-desc", label: "Mayor precio" },
] as const;

export default function TiendaPage() {
  const [categoria, setCategoria] = useState<string | null>(null);
  const [orden, setOrden] = useState<(typeof ordenes)[number]["id"]>("destacado");
  const [soloStock, setSoloStock] = useState(false);
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const listado = useMemo(() => {
    let resultado = [...productos];
    if (categoria) resultado = resultado.filter((p) => p.categoriaSlug === categoria);
    if (soloStock)
      resultado = resultado.filter((p) => p.disponibilidad === "en-stock");
    if (orden === "precio-asc") resultado.sort((a, b) => a.precio - b.precio);
    if (orden === "precio-desc") resultado.sort((a, b) => b.precio - a.precio);
    return resultado;
  }, [categoria, orden, soloStock]);

  const filtros = (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-ceniza mb-3">
          Categoría
        </p>
        <div className="flex flex-wrap gap-2">
          <Chip activo={!categoria} onClick={() => setCategoria(null)}>
            Todas
          </Chip>
          {categorias.map((c) => (
            <Chip
              key={c.slug}
              activo={categoria === c.slug}
              onClick={() => setCategoria(categoria === c.slug ? null : c.slug)}
            >
              {c.nombre}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-ceniza mb-3">
          Ordenar por
        </p>
        <div className="flex flex-wrap gap-2">
          {ordenes.map((o) => (
            <Chip
              key={o.id}
              activo={orden === o.id}
              onClick={() => setOrden(o.id)}
            >
              {o.label}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-ceniza mb-3">
          Disponibilidad
        </p>
        <Chip activo={soloStock} onClick={() => setSoloStock((v) => !v)}>
          Solo en stock
        </Chip>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wide text-verde">
          Catálogo PACEFORM
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Tienda</h1>
        <p className="mt-2 text-sm text-ceniza max-w-xl">
          Equipamiento de running seleccionado. Envío gratis a todo Colombia,
          contra entrega o pago con Mercado Pago.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="vidrio panel p-5 sticky top-24">{filtros}</div>
        </aside>

        <div>
          <div className="flex items-center justify-between gap-3 mb-5">
            <p className="text-sm font-semibold text-ceniza">
              {listado.length} producto{listado.length === 1 ? "" : "s"}
            </p>
            <button
              type="button"
              onClick={() => setFiltrosAbiertos((v) => !v)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border-[1.5px] border-vidrio-borde text-xs font-bold"
            >
              <SlidersHorizontal className="size-4" /> Filtros
            </button>
          </div>

          {filtrosAbiertos && (
            <div className="lg:hidden vidrio panel p-5 mb-5 animar-entrada">
              {filtros}
            </div>
          )}

          {listado.length === 0 ? (
            <div className="vidrio panel p-12 text-center">
              <p className="font-extrabold">Sin productos en esta selección</p>
              <p className="text-sm text-ceniza mt-2">
                Ajusta los filtros o escríbenos por WhatsApp para ayudarte a
                encontrar lo que buscas.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {listado.map((p) => (
                <ProductCard key={p.slug} producto={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
