import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { wiki } from "@/data/wiki";
import GlassPanel from "@/components/ui/glass-panel";

export const metadata = {
  title: "Wiki de running",
  description:
    "Guías de running y atletismo: equipamiento, técnica, hidratación, prevención de lesiones y más.",
};

export default function WikiPage() {
  const secciones = Array.from(new Set(wiki.map((a) => a.seccion)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-wide text-verde">
        Aprende y entrena mejor
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Wiki PACEFORM</h1>
      <p className="mt-2 text-sm text-ceniza max-w-xl">
        Guías prácticas de running y atletismo general, escritas para corredores
        de todos los niveles en Colombia.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {secciones.map((s) => (
          <span
            key={s}
            className="px-4 py-2 rounded-full bg-white border-[1.5px] border-vidrio-borde text-xs font-bold"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wiki.map((a) => (
          <Link key={a.slug} href={`/wiki/${a.slug}`} className="group">
            <GlassPanel className="p-6 h-full flex flex-col hover:border-verde/30 transition-colors">
              <div className="flex items-center justify-between">
                <span className="size-10 rounded-2xl bg-verde text-blanco flex items-center justify-center">
                  <BookOpen className="size-4" />
                </span>
                <span className="text-[11px] font-bold text-ceniza inline-flex items-center gap-1">
                  <Clock className="size-3" /> {a.tiempoLectura} min
                </span>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-verde mt-4">
                {a.seccion}
              </p>
              <h2 className="text-base font-extrabold mt-1 leading-tight group-hover:text-verde transition-colors">
                {a.titulo}
              </h2>
              <p className="text-xs text-ceniza mt-2 leading-relaxed flex-1">
                {a.resumen}
              </p>
              <span className="text-sm font-bold text-verde mt-4">
                Leer guía →
              </span>
            </GlassPanel>
          </Link>
        ))}
      </div>
    </div>
  );
}
