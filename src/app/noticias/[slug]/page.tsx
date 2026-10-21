import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Newspaper } from "lucide-react";
import { noticias, noticiaPorSlug } from "@/data/noticias";
import { fechaLegible } from "@/lib/formato";
import GlassPanel from "@/components/ui/glass-panel";
import Boton from "@/components/ui/boton";

export function generateStaticParams() {
  return noticias.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const noticia = noticiaPorSlug(slug);
  if (!noticia) return { title: "Noticia no encontrada" };
  return { title: noticia.titulo, description: noticia.resumen };
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const noticia = noticiaPorSlug(slug);
  if (!noticia) notFound();

  const masNoticias = noticias.filter((n) => n.slug !== noticia.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-ceniza mb-6">
        <Link href="/" className="hover:text-verde">
          Inicio
        </Link>
        <ChevronRight className="size-3" />
        <Link href="/noticias" className="hover:text-verde">
          Noticias
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-carbon">{noticia.categoria}</span>
      </nav>

      <div className="flex items-center gap-3 text-xs font-bold">
        <span className="px-3 py-1 rounded-full bg-verde text-blanco uppercase tracking-wide">
          {noticia.categoria}
        </span>
        <span className="text-ceniza inline-flex items-center gap-1.5">
          <Calendar className="size-3.5" /> {fechaLegible(noticia.fecha)}
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight leading-tight">
        {noticia.titulo}
      </h1>
      <p className="mt-3 text-base text-ceniza leading-relaxed">
        {noticia.resumen}
      </p>

      <GlassPanel className="mt-8 p-6 sm:p-8 space-y-5">
        {noticia.contenido.map((parrafo, i) => (
          <p
            key={i}
            className="text-sm sm:text-base text-carbon/85 leading-relaxed"
          >
            {parrafo}
          </p>
        ))}
      </GlassPanel>

      <div className="mt-8 vidrio panel p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div>
          <p className="text-sm font-extrabold inline-flex items-center gap-2">
            <Newspaper className="size-4 text-verde" /> Equipamiento para
            entrenar
          </p>
          <p className="text-xs text-ceniza mt-1">
            Mira el catálogo seleccionado por PACEFORM.
          </p>
        </div>
        <Boton href="/tienda" className="shrink-0">
          Ver tienda
        </Boton>
      </div>

      {masNoticias.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-extrabold mb-4">Más noticias</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {masNoticias.map((n) => (
              <Link key={n.slug} href={`/noticias/${n.slug}`} className="group">
                <GlassPanel className="p-5 h-full hover:border-verde/30 transition-colors">
                  <p className="text-[11px] font-bold text-verde uppercase tracking-wide">
                    {n.categoria}
                  </p>
                  <p className="text-sm font-extrabold mt-1 leading-tight group-hover:text-verde transition-colors">
                    {n.titulo}
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
