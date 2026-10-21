import { Users, MessageCircle, ShieldAlert } from "lucide-react";
import { hilos } from "@/data/comunidad";
import { WHATSAPP } from "@/lib/config";
import { fechaLegible } from "@/lib/formato";
import GlassPanel from "@/components/ui/glass-panel";
import Badge from "@/components/ui/badge";
import Boton from "@/components/ui/boton";

export const metadata = {
  title: "Comunidad",
  description:
    "Conversaciones de corredores colombianos sobre entrenamiento, ciudades y equipamiento.",
};

export default function ComunidadPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-verde">
            Juntos se corre mejor
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
            Comunidad PACEFORM
          </h1>
          <p className="mt-2 text-sm text-ceniza max-w-xl">
            Espacio de conversación entre corredores del país. Comparte avances,
            pregunta por equipamiento y entrena acompañado.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF3C4] text-carbon text-[11px] font-bold uppercase tracking-wide">
          <ShieldAlert className="size-3.5" /> Contenido de demostración
        </span>
      </div>

      <div className="mt-8 space-y-4">
        {hilos.map((hilo) => (
          <GlassPanel key={hilo.id} className="p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge tono="claro">{hilo.categoria}</Badge>
                  <span className="text-[11px] text-ceniza font-semibold">
                    {fechaLegible(hilo.fecha)}
                  </span>
                </div>
                <h2 className="text-lg font-extrabold mt-2 leading-tight">
                  {hilo.titulo}
                </h2>
                <p className="text-xs text-ceniza mt-1 inline-flex items-center gap-1.5">
                  <Users className="size-3.5" /> {hilo.autor} ·{" "}
                  {hilo.respuestas} respuesta{hilo.respuestas === 1 ? "" : "s"}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {hilo.mensajes.map((m, i) => (
                <div
                  key={i}
                  className={`rounded-2xl px-4 py-3 ${
                    i === 0
                      ? "bg-verde text-blanco"
                      : "bg-white border-[1.5px] border-vidrio-borde"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className={`text-xs font-extrabold ${
                        i === 0 ? "text-blanco" : "text-carbon"
                      }`}
                    >
                      {m.autor}
                      {i === 0 && (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wide opacity-70">
                          Abrió el hilo
                        </span>
                      )}
                    </p>
                    <p
                      className={`text-[11px] ${
                        i === 0 ? "text-white/60" : "text-ceniza"
                      }`}
                    >
                      {fechaLegible(m.fecha)}
                    </p>
                  </div>
                  <p
                    className={`mt-1.5 text-sm leading-relaxed ${
                      i === 0 ? "text-white/85" : "text-carbon/85"
                    }`}
                  >
                    {m.texto}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>
        ))}
      </div>

      <GlassPanel solido className="mt-8 p-6 text-center">
        <MessageCircle className="size-8 text-verde mx-auto" />
        <h2 className="mt-3 text-lg font-extrabold">
          ¿Quieres sumarte a la conversación?
        </h2>
        <p className="mt-2 text-sm text-ceniza max-w-md mx-auto">
          La comunidad interactiva estará disponible próximamente. Mientras
          tanto, escríbenos por WhatsApp y te sumamos a nuestros canales.
        </p>
        <Boton
          href={`https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(
            "Hola PACEFORM, quiero unirme a la comunidad de corredores."
          )}`}
          external
          className="mt-5 mx-auto"
        >
          <MessageCircle className="size-4" /> Unirme por WhatsApp
        </Boton>
      </GlassPanel>
    </div>
  );
}
