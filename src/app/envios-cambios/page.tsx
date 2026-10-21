import Link from "next/link";
import { Truck, MapPin, RotateCcw, ShieldCheck, Clock } from "lucide-react";
import { ENVIO } from "@/lib/config";
import GlassPanel from "@/components/ui/glass-panel";

export const metadata = {
  title: "Envíos, cambios y devoluciones",
  description:
    "Condiciones de envío gratis, tiempos de entrega, cambios y devoluciones en PACEFORM.",
};

export default function EnviosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-wide text-verde">
        Condiciones de compra
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
        Envíos, cambios y devoluciones
      </h1>
      <p className="mt-3 text-sm text-ceniza leading-relaxed">
        Información previa a la compra, según la normativa colombiana aplicable al
        comercio electrónico (Ley 1480 de 2011 y sus modificaciones).
      </p>

      <div className="mt-8 space-y-4">
        <GlassPanel solido className="p-6">
          <h2 className="text-base font-extrabold inline-flex items-center gap-2">
            <Truck className="size-4 text-verde" /> Envío gratis en todo Colombia
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-carbon/80">
            <li>
              <strong>Ciudades principales</strong> (
              {ENVIO.principales.ciudades.join(", ")}): entrega estimada{" "}
              <strong>{ENVIO.principales.dias}</strong>.
            </li>
            <li>
              <strong>Resto del país:</strong> entrega estimada{" "}
              <strong>{ENVIO.resto.dias}</strong>.
            </li>
            <li>
              El costo de envío es <strong>$0</strong> en todos los pedidos, sin
              monto mínimo.
            </li>
            <li>
              Los tiempos se cuentan desde la confirmación del pedido contra
              entrega.
            </li>
          </ul>
        </GlassPanel>

        <GlassPanel solido className="p-6">
          <h2 className="text-base font-extrabold inline-flex items-center gap-2">
            <MapPin className="size-4 text-verde" /> Cobertura y seguimiento
          </h2>
          <p className="mt-3 text-sm text-carbon/80 leading-relaxed">
            Despachamos a todas las capitales y municipios principales de
            Colombia. Al confirmar tu pedido te contactamos por WhatsApp con la
            fecha estimada y el estado del envío.
          </p>
        </GlassPanel>

        <GlassPanel solido className="p-6">
          <h2 className="text-base font-extrabold inline-flex items-center gap-2">
            <RotateCcw className="size-4 text-verde" /> Cambios y devoluciones
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-carbon/80 list-disc list-inside">
            <li>
              Tienes <strong>5 días calendario</strong> desde la recepción para
              solicitar cambio o devolución por fallas de fábrica o error en el
              producto enviado.
            </li>
            <li>
              El producto debe conservar empaque, etiquetas y estado original de
              uso.
            </li>
            <li>
              Por cambio de talla o color sujeto a disponibilidad, contáctanos lo
              antes posible; coordinamos la logística inversa.
            </li>
            <li>
              No aplican devoluciones por preferencia personal una vez usado el
              producto, salvo defecto comprobable.
            </li>
            <li>
              En contra entrega, se emite nota crédito o cambio según el caso,
              una vez recibido y verificado el producto.
            </li>
          </ul>
        </GlassPanel>

        <GlassPanel solido className="p-6">
          <h2 className="text-base font-extrabold inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-verde" /> Pago contraentrega
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-carbon/80">
            <li>Pagas en efectivo al recibir el pedido en tu dirección.</li>
          </ul>
        </GlassPanel>

        <GlassPanel solido className="p-6">
          <h2 className="text-base font-extrabold inline-flex items-center gap-2">
            <Clock className="size-4 text-verde" /> Horarios de atención
          </h2>
          <p className="mt-3 text-sm text-carbon/80">
            Atendemos pedidos y consultas de lunes a sábados de 8:00 a.m. a 6:00
            p.m. Los pedidos confirmados en días hábiles salen el mismo día o el
            siguiente hábil.
          </p>
        </GlassPanel>
      </div>

      <p className="mt-8 text-sm text-ceniza">
        ¿Dudas? Escríbenos por WhatsApp o visita{" "}
        <Link href="/faq" className="font-bold text-verde underline underline-offset-2">
          preguntas frecuentes
        </Link>
        .
      </p>
    </div>
  );
}
