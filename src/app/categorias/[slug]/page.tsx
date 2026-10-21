import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  categorias,
  productosPorCategoria,
  categoriaPorSlug,
} from "@/data/productos";
import ProductCard from "@/components/commerce/product-card";

export function generateStaticParams() {
  return categorias.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = categoriaPorSlug(slug);
  if (!cat) return { title: "Categoría no encontrada" };
  return { title: cat.nombre, description: cat.descripcion };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoria = categoriaPorSlug(slug);
  if (!categoria) notFound();
  const listado = productosPorCategoria(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-ceniza mb-6">
        <Link href="/" className="hover:text-verde">
          Inicio
        </Link>
        <ChevronRight className="size-3" />
        <Link href="/categorias" className="hover:text-verde">
          Categorías
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-carbon">{categoria.nombre}</span>
      </nav>

      <p className="text-xs font-bold uppercase tracking-wide text-verde">
        Categoría
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
        {categoria.nombre}
      </h1>
      <p className="mt-2 text-sm text-ceniza max-w-xl">{categoria.descripcion}</p>

      <div className="mt-8">
        {listado.length === 0 ? (
          <div className="vidrio panel p-12 text-center">
            <p className="font-extrabold">Próximamente en esta categoría</p>
            <p className="text-sm text-ceniza mt-2 max-w-md mx-auto">
              Estamos seleccionando productos para {categoria.nombre.toLowerCase()}
              . Mientras tanto, explora el{" "}
              <Link href="/tienda" className="font-bold text-verde underline">
                catálogo completo
              </Link>
              .
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
  );
}
