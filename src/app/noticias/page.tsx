import Link from "next/link";
import { Newspaper, Calendar } from "lucide-react";
import { noticias } from "@/data/noticias";
import { fechaLegible } from "@/lib/formato";
import GlassPanel from "@/components/ui/glass-panel";

export const metadata = {
  title: "Noticias de running",
  description:
    "Carreras, entrenamiento, equipamiento y todo lo que pasa en el running colombiano.",
};

export default function NoticiasPage() {
  const categorias = Array.from(new Set(noticias.map((n) => n.categoria)));
  const [principal, ...resto] = noticias;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-wide text-verde">
        Feed editorial
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
        Noticias de running
      </h1>
      <p className="mt-2 text-sm text-ceniza max-w-xl">
        Carreras en Colombia, entrenamiento, equipamiento y tendencias del
        atletismo.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {categorias.map((c) => (
          <span
            key={c}
            className="px-4 py-2 rounded-full bg-white border-[1.5px] border-vidrio-borde text-xs font-bold"
          >
            {c}
          </span>
        ))}
      </div>

      {/* Noticia principal */}
      <Link href={`/noticias/${principal.slug}`} className="block mt-8 group">
        <div className="bg-verde text-blanco rounded-[24px] overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-3 text-xs font-bold text-white/60">
              <span className="px-3 py-1 rounded-full bg-white/15 text-blanco">
                {principal.categoria}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" /> {fechaLegible(principal.fecha)}
              </span>
            </div>
            <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight group-hover:text-white/85 transition-colors">
              {principal.titulo}
            </h2>
            <p className="mt-4 text-white/70 max-w-2xl leading-relaxed text-sm sm:text-base">
              {principal.resumen}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
              Leer artículo <Newspaper className="size-4" />
            </span>
          </div>
        </div>
      </Link>

      {/* Resto */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resto.map((n) => (
          <Link key={n.slug} href={`/noticias/${n.slug}`} className="group">
            <GlassPanel className="p-6 h-full flex flex-col hover:border-verde/30 transition-colors">
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span className="text-verde uppercase tracking-wide">
                  {n.categoria}
                </span>
                <span className="text-ceniza">{fechaLegible(n.fecha)}</span>
              </div>
              <h3 className="text-base font-extrabold mt-3 leading-tight group-hover:text-verde transition-colors">
                {n.titulo}
              </h3>
              <p className="text-xs text-ceniza mt-2 leading-relaxed flex-1">
                {n.resumen}
              </p>
              <span className="text-sm font-bold text-verde mt-4">Leer →</span>
            </GlassPanel>
          </Link>
        ))}
      </div>
    </div>
  );
}
