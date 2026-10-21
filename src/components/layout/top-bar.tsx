"use client";

import { useEffect, useState } from "react";
import { Truck, ShieldCheck, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";

const mensajes = [
  {
    icon: Truck,
    texto: "Envío gratis en todo Colombia",
  },
  {
    icon: MapPin,
    texto: "Ciudades principales 1–2 días · Resto 3–4 días",
  },
  {
    icon: ShieldCheck,
    texto: "Contra entrega o Mercado Pago seguro",
  },
];

export default function TopBar() {
  const [indice, setIndice] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndice((i) => (i + 1) % mensajes.length);
        setVisible(true);
      }, 280);
    }, 4200);

    return () => clearInterval(id);
  }, []);

  const actual = mensajes[indice];
  const Icono = actual.icon;

  return (
    <div className="bg-verde text-blanco text-[11px] sm:text-xs font-semibold">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center gap-3 min-h-[34px]">
        <span
          className={cn(
            "flex items-center gap-2 min-w-0 max-w-full transition-opacity duration-300",
            visible ? "opacity-100" : "opacity-0"
          )}
          key={indice}
        >
          <Icono className="size-3.5 shrink-0" aria-hidden />
          <span className="line-clamp-1">{actual.texto}</span>
        </span>
      </div>
    </div>
  );
}
