import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2, Truck, MessageCircle, Home } from "lucide-react";
import { formatCOP } from "@/lib/formato";
import { WHATSAPP } from "@/lib/config";
import GlassPanel from "@/components/ui/glass-panel";
import Boton from "@/components/ui/boton";

export const metadata = {
  title: "Pedido registrado",
};

async function ContenidoExito({
  searchParams,
}: {
  searchParams: Promise<{ nombre?: string; ciudad?: string; total?: string }>;
}) {
  const sp = await searchParams;
  const nombre = sp.nombre?.trim() || "";
  const ciudad = sp.ciudad?.trim() || "";
  const total = Number(sp.total || 0);

  return (
    <>
      <GlassPanel solido className="p-8 text-center">
        <CheckCircle2 className="size-14 text-verde mx-auto" />
        <h1 className="mt-5 text-2xl sm:text-3xl font-extrabold">
          ¡Pedido registrado!
        </h1>
        <p className="mt-3 text-sm text-ceniza leading-relaxed">
          {nombre ? (
            <>
              Gracias, <strong className="text-carbon">{nombre}</strong>.{" "}
            </>
          ) : null}
          Recibimos tu compra contra entrega
          {ciudad ? (
            <>
              {" "}
              con destino a <strong className="text-carbon">{ciudad}</strong>
            </>
          ) : null}
          {total > 0 ? (
            <>
              {" "}
              por <strong className="text-carbon">{formatCOP(total)}</strong>
            </>
          ) : null}
          . Te contactaremos por WhatsApp para confirmar la entrega.
        </p>

        <div className="mt-6 vidrio panel p-4 text-left space-y-2.5">
          <p className="text-xs font-extrabold uppercase tracking-wide">
            ¿Qué sigue?
          </p>
          <ol className="space-y-2 text-xs text-ceniza list-decimal list-inside">
            <li>Verificamos tu pedido y te escribimos por WhatsApp.</li>
            <li>Coordinamos la entrega en tu dirección.</li>
            <li>Pagas en efectivo al recibir el producto.</li>
            <li>
              Envío gratis: 1–2 días en ciudades principales, 3–4 en el resto.
            </li>
          </ol>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Boton
            href={`https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(
              "Hola PACEFORM, acabo de registrar un pedido contra entrega."
            )}`}
            external
          >
            <MessageCircle className="size-4" /> Confirmar por WhatsApp
          </Boton>
          <Boton href="/" variant="secundario">
            <Home className="size-4" /> Volver al inicio
          </Boton>
        </div>

        <p className="mt-6 text-[11px] text-ceniza inline-flex items-center gap-1.5">
          <Truck className="size-3.5" /> Envío gratis a todo Colombia
        </p>
      </GlassPanel>

      <p className="mt-6 text-center text-xs text-ceniza">
        ¿Compraste con Mercado Pago? También registramos tu envío y confirmamos
        el pago manualmente.{" "}
        <Link href="/contacto" className="font-bold text-verde underline">
          Contacto
        </Link>
      </p>
    </>
  );
}

export default function ExitoPage({
  searchParams,
}: {
  searchParams: Promise<{ nombre?: string; ciudad?: string; total?: string }>;
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <Suspense
        fallback={
          <GlassPanel solido className="p-8 text-center">
            <p className="text-sm text-ceniza">Cargando confirmación…</p>
          </GlassPanel>
        }
      >
        <ContenidoExito searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
