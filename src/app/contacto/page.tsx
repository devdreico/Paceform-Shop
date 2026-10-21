import Link from "next/link";
import { MessageCircle, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { WHATSAPP, INSTAGRAM } from "@/lib/config";
import GlassPanel from "@/components/ui/glass-panel";
import Boton from "@/components/ui/boton";
import IconoInstagram from "@/components/ui/icono-instagram";

export const metadata = {
  title: "Contacto",
  description: "Contacta a PACEFORM por WhatsApp, correo o redes.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-wide text-verde">
        Estamos para ayudarte
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Contacto</h1>
      <p className="mt-3 text-sm text-ceniza max-w-xl">
        Consultas sobre tallas, compatibilidad, estado del pedido o devoluciones.
        Respondemos por WhatsApp en horario hábil.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <GlassPanel solido className="p-6 flex flex-col gap-3">
          <span className="size-11 rounded-2xl bg-verde text-blanco flex items-center justify-center">
            <MessageCircle className="size-5" />
          </span>
          <h2 className="text-base font-extrabold">WhatsApp</h2>
          <p className="text-xs font-semibold text-ceniza">
            {WHATSAPP.visible}
          </p>
          <p className="text-xs text-ceniza leading-relaxed">
            El canal más rápido. Incluye el nombre del producto o tu número de
            pedido para agilizar la respuesta.
          </p>
          <Boton
            href={`https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(
              WHATSAPP.mensaje
            )}`}
            external
            className="mt-auto"
          >
            Abrir WhatsApp
          </Boton>
        </GlassPanel>

        <GlassPanel solido className="p-6 flex flex-col gap-3">
          <span className="size-11 rounded-2xl bg-verde text-blanco flex items-center justify-center">
            <Mail className="size-5" />
          </span>
          <h2 className="text-base font-extrabold">Correo</h2>
          <p className="text-xs text-ceniza leading-relaxed">
            Para temas formales, facturación o documentación de pedidos.
          </p>
          <a
            href="mailto:hola@paceform.co"
            className="btn-secundario mt-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm"
          >
            hola@paceform.co
          </a>
        </GlassPanel>

        <a
          href={INSTAGRAM.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-verde text-blanco panel tarjeta-hover p-6 flex flex-col gap-3 sm:col-span-2"
        >
          <div className="flex items-start gap-4">
            <span className="size-11 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
              <IconoInstagram className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-extrabold">@{INSTAGRAM.usuario}</h2>
              <p className="text-xs text-white/70 leading-relaxed mt-1">
                Lanzamientos, tips de entrenamiento y contenido de la comunidad
                PACEFORM. Escríbenos por mensaje directo o síguenos para ver el
                equipamiento en acción.
              </p>
            </div>
          </div>
          <span className="text-sm font-bold inline-flex items-center gap-1 mt-auto">
            Seguir en Instagram <ArrowRight className="size-3.5 flecha-slide" />
          </span>
        </a>

        <GlassPanel solido className="p-6 flex flex-col gap-3 sm:col-span-2">
          <div className="flex items-start gap-4">
            <span className="size-11 rounded-2xl bg-verde text-blanco flex items-center justify-center shrink-0">
              <MapPin className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-extrabold">Operación en Colombia</h2>
              <p className="text-xs text-ceniza leading-relaxed mt-1">
                Despachamos a todo el país. Envíos gratis: 1–2 días en ciudades
                principales, 3–4 días en el resto.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 pt-3 border-t border-verde/10">
            <span className="size-11 rounded-2xl bg-verde text-blanco flex items-center justify-center shrink-0">
              <Clock className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-extrabold">Horario</h2>
              <p className="text-xs text-ceniza leading-relaxed mt-1">
                Lunes a sábados, 8:00 a.m. – 6:00 p. m. (hora Colombia).
              </p>
            </div>
          </div>
        </GlassPanel>
      </div>

      <p className="mt-8 text-sm text-ceniza">
        Revisa también{" "}
        <Link href="/faq" className="font-bold text-verde underline underline-offset-2">
          preguntas frecuentes
        </Link>{" "}
        y{" "}
        <Link
          href="/envios-cambios"
          className="font-bold text-verde underline underline-offset-2"
        >
          envíos y devoluciones
        </Link>
        .
      </p>
    </div>
  );
}
