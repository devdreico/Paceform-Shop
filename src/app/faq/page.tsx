import Link from "next/link";
import { HelpCircle } from "lucide-react";
import GlassPanel from "@/components/ui/glass-panel";

export const metadata = {
  title: "Preguntas frecuentes",
  description: "Respuestas sobre pagos, envíos, tallas y devoluciones en PACEFORM.",
};

const faqs = [
  {
    pregunta: "¿El envío tiene costo?",
    respuesta:
      "No. El envío es gratis a todo Colombia. Ciudades principales: 1 a 2 días hábiles. Resto del país: 3 a 4 días hábiles.",
  },
  {
    pregunta: "¿Cómo pago mi pedido?",
    respuesta:
      "Puedes pagar contra entrega (en efectivo al recibir) o con Mercado Pago desde la ficha del producto. En Mercado Pago confirmamos el pago manualmente antes de despachar.",
  },
  {
    pregunta: "¿Necesito crear una cuenta para comprar?",
    respuesta:
      "No. El checkout es corto: solo pedimos los datos de contacto y envío necesarios para entregarte el pedido.",
  },
  {
    pregunta: "¿Cómo elijo mi talla?",
    respuesta:
      "En la ficha de cada producto verás las tallas disponibles y la guía de uso. Si tienes duda entre dos tallas, escríbenos por WhatsApp con tu medida habitual y te orientamos.",
  },
  {
    pregunta: "¿Puedo cambiar la talla o el color?",
    respuesta:
      "Sí, si el producto está en empaque original y nos contactas dentro de los 5 días calendario posteriores a la recepción, sujeto a disponibilidad. Consulta condiciones en Envíos y devoluciones.",
  },
  {
    pregunta: "¿Hacen envíos a todo el país?",
    respuesta:
      "Sí, despachamos a capitales y municipios principales de Colombia con el mismo costo de envío: gratis.",
  },
  {
    pregunta: "¿Cómo confirmo un pago con Mercado Pago?",
    respuesta:
      "Pagas en el link oficial de Mercado Pago y nos envías el comprobante por WhatsApp. Verificamos el pago y despachamos el pedido.",
  },
  {
    pregunta: "¿Los precios incluyen impuestos?",
    respuesta:
      "Sí, el precio publicado es el precio final por producto. No hay costos ocultos de envío al finalizar la compra.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-wide text-verde">
        Ayuda al cliente
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
        Preguntas frecuentes
      </h1>
      <p className="mt-3 text-sm text-ceniza">
        Lo esencial antes de comprar. Si algo no está aquí,{" "}
        <Link href="/contacto" className="font-bold text-verde underline underline-offset-2">
          contáctanos
        </Link>
        .
      </p>

      <div className="mt-8 space-y-3">
        {faqs.map((f) => (
          <GlassPanel key={f.pregunta} className="p-6">
            <h2 className="text-sm font-extrabold inline-flex items-start gap-2">
              <HelpCircle className="size-4 text-verde shrink-0 mt-0.5" />
              {f.pregunta}
            </h2>
            <p className="mt-2.5 text-sm text-carbon/80 leading-relaxed pl-6">
              {f.respuesta}
            </p>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
}
