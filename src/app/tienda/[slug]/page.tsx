import { notFound } from "next/navigation";
import { productos, productoPorSlug } from "@/data/productos";
import ProductoContenido from "@/components/commerce/producto-contenido";

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = productoPorSlug(slug);
  if (!producto) return { title: "Producto no encontrado" };
  return {
    title: producto.nombre,
    description: producto.descripcionCorta,
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = productoPorSlug(slug);
  if (!producto) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <ProductoContenido slug={slug} />
    </div>
  );
}
