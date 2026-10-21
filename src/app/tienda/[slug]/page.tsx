import { notFound } from "next/navigation";
import { Suspense } from "react";
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

async function ContenidoProducto({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = productoPorSlug(slug);
  if (!producto) notFound();

  return (
    <div className="mx-auto w-full max-w-[1440px] min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      <ProductoContenido slug={slug} />
    </div>
  );
}

export default function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
          <div className="h-5 w-40 animate-pulse rounded bg-humo" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="aspect-[4/3] animate-pulse rounded-panel bg-humo" />
            <div className="h-80 animate-pulse rounded-panel bg-humo" />
          </div>
        </div>
      }
    >
      <ContenidoProducto params={params} />
    </Suspense>
  );
}
