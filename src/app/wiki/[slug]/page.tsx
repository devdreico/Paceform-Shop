import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, BookOpen } from "lucide-react";
import { wiki, wikiPorSlug } from "@/data/wiki";
import GlassPanel from "@/components/ui/glass-panel";
import Boton from "@/components/ui/boton";

export function generateStaticParams() {
  return wiki.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articulo = wikiPorSlug(slug);
  if (!articulo) return { title: "Artículo no encontrado" };
  return { title: articulo.titulo, description: articulo.resumen };
}

export default async function WikiArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articulo = wikiPorSlug(slug);
  if (!articulo) notFound();

  const relacionados = wiki
    .filter((a) => a.slug !== articulo.slug && a.seccion === articulo.seccion)
    .slice(0, 2);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-ceniza mb-6">
        <Link href="/" className="hover:text-verde">
          Inicio
        </Link>
        <ChevronRight className="size-3" />
        <Link href="/wiki" className="hover:text-verde">
          Wiki
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-carbon">{articulo.seccion}</span>
      </nav>

      <p className="text-xs font-bold uppercase tracking-wide text-verde">
        {articulo.seccion}
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight leading-tight">
        {articulo.titulo}
      </h1>
      <div className="mt-3 flex items-center gap-4 text-xs font-semibold text-ceniza">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5" /> {articulo.tiempoLectura} min de lectura
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="size-3.5" /> Guía PACEFORM
        </span>
      </div>

      <GlassPanel className="mt-8 p-6 sm:p-8">
        <div className="prose-paceform space-y-5">
          {articulo.contenido.map((parrafo, i) => (
            <p
              key={i}
              className="text-sm sm:text-base text-carbon/85 leading-relaxed"
            >
              {parrafo}
            </p>
          ))}
        </div>
      </GlassPanel>

      <div className="mt-8 vidrio panel p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div>
          <p className="text-sm font-extrabold">¿Listo para entrenar mejor?</p>
          <p className="text-xs text-ceniza mt-1">
            Explora el equipamiento seleccionado por PACEFORM.
          </p>
        </div>
        <Boton href="/tienda" className="shrink-0">
          Ir a la tienda
        </Boton>
      </div>

      {relacionados.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-extrabold mb-4">Más en esta sección</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relacionados.map((a) => (
              <Link key={a.slug} href={`/wiki/${a.slug}`} className="group">
                <GlassPanel className="p-5 h-full hover:border-verde/30 transition-colors">
                  <p className="text-xs font-bold text-ceniza">{a.seccion}</p>
                  <p className="text-sm font-extrabold mt-1 leading-tight group-hover:text-verde transition-colors">
                    {a.titulo}
                  </p>
                  <p className="text-xs text-ceniza mt-2 line-clamp-2">
                    {a.resumen}
                  </p>
                </GlassPanel>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
