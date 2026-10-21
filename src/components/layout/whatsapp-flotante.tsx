"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP } from "@/lib/config";

export default function WhatsAppFlotante({ oculto = false }: { oculto?: boolean }) {
  if (oculto) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(
        WHATSAPP.mensaje
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 z-30 btn-primario size-14 flex items-center justify-center"
      style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}
      aria-label={`Escribir por WhatsApp al ${WHATSAPP.visible}`}
      title={`WhatsApp ${WHATSAPP.visible}`}
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
