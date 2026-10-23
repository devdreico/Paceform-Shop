"use client";

import { useSyncExternalStore } from "react";
import { CheckCircle2, Home, MessageCircle, TriangleAlert, Truck } from "lucide-react";
import {
  pedidoFueAceptado,
  suscribirConfirmacionPedido,
} from "@/lib/confirmacion-pedido";
import { WHATSAPP } from "@/lib/config";
import GlassPanel from "@/components/ui/glass-panel";
import Boton from "@/components/ui/boton";

export default function PedidoExitoCliente({ pedidoId }: { pedidoId: string }) {
  const confirmado = useSyncExternalStore(
    suscribirConfirmacionPedido,
    () => pedidoFueAceptado(pedidoId),
    () => false
  );

  if (!confirmado) {
    return (
      <GlassPanel solido className="p-8 text-center">
        <TriangleAlert className="size-12 text-carbon mx-auto" />
        <h1 className="mt-5 text-2xl font-extrabold">No pudimos verificar el pedido</h1>
        <p className="mt-3 text-sm text-ceniza leading-relaxed">
          No vuelvas a enviarlo todavía. Confirma primero su estado por WhatsApp para evitar duplicados.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Boton
            href={`https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(
              "Hola PACEFORM, necesito confirmar el estado de mi pedido contra entrega."
            )}`}
            external
          >
            <MessageCircle className="size-4" /> Consultar por WhatsApp
          </Boton>
          <Boton href="/tienda" variant="secundario">
            Volver a la tienda
          </Boton>
        </div>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel solido className="p-8 text-center">
      <CheckCircle2 className="size-14 text-verde mx-auto" />
      <h1 className="mt-5 text-2xl sm:text-3xl font-extrabold">¡Pedido registrado!</h1>
      <p className="mt-3 text-sm text-ceniza leading-relaxed">
        Recibimos tu pedido contra entrega. Te contactaremos por WhatsApp para coordinar la entrega.
      </p>
      <p className="mt-3 text-xs font-semibold text-ceniza">
        Referencia: {pedidoId.slice(0, 8).toUpperCase()}
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Boton
          href={`https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(
            `Hola PACEFORM, quiero confirmar el pedido ${pedidoId.slice(0, 8).toUpperCase()}.`
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
  );
}