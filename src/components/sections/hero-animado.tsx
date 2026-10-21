"use client";

import Image from "next/image";
import { ArrowRight, Truck, ShieldCheck, MessageCircle } from "lucide-react";
import { MARCA } from "@/lib/config";
import { productos } from "@/data/productos";
import Boton from "@/components/ui/boton";
import Badge from "@/components/ui/badge";
import { useReveal } from "@/lib/animaciones";
import { cn } from "@/lib/cn";

export function RevealSeccion({
  children,
  className,
  retardo,
}: {
  children: React.ReactNode;
  className?: string;
  retardo?: 1 | 2 | 3 | 4 | 5;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "reveal",
        retardo && `reveal-${retardo}`,
        visible && "visible",
        className
      )}
    >
      {children}
    </div>
  );
}

export default function HeroAnimado() {
  const total = productos.length;

  return (
    <section className="hero-paceform relative isolate min-h-[560px] overflow-hidden bg-carbon text-blanco sm:min-h-[600px]">
      <Image
        src="/lifestyle/corredor-1.webp"
        alt="Corredores entrenando al amanecer"
        fill
        priority
        sizes="100vw"
        className="hero-paceform-foto object-cover object-[52%_48%]"
      />
      <div className="absolute inset-0 bg-carbon/60" aria-hidden="true" />
      <div className="hero-paceform-trama absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-5 py-14 sm:min-h-[600px] sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <div className="hero-paceform-entrada">
            <Badge tono="claro">{MARCA.tagline} · COLOMBIA</Badge>
          </div>
          <h1 className="mt-7 max-w-4xl text-[48px] font-extrabold leading-[0.94] sm:text-[72px] lg:text-[92px]">
            <span className="hero-paceform-linea block">CORRE A</span>
            <span className="hero-paceform-linea hero-paceform-acento block">
              TU RITMO.
            </span>
          </h1>
          <p className="hero-paceform-entrada mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            {MARCA.mensaje} Elige tu equipo, recíbelo en casa y paga cuando
            llegue.
          </p>
          <div className="hero-paceform-entrada mt-8 flex flex-wrap gap-3">
            <Boton href="/tienda" className="min-h-14 bg-[#d7f36a] px-7 text-carbon hover:bg-white">
              Explorar la tienda <ArrowRight className="size-4 flecha-slide" />
            </Boton>
            <Boton
              href="/wiki"
              variant="secundario"
              className="min-h-14 border-white/50 px-7 text-blanco hover:bg-white/10"
            >
              Guía de running
            </Boton>
          </div>
        </div>

        <div className="hero-paceform-entrada mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/25 pt-5 text-xs font-semibold text-white/80 sm:mt-16">
          <span className="inline-flex items-center gap-2">
            <Truck className="size-4 text-[#d7f36a]" /> Envío gratis en Colombia
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="size-4 text-[#d7f36a]" /> Pago al recibir
          </span>
          <span className="inline-flex items-center gap-2">
            <MessageCircle className="size-4 text-[#d7f36a]" /> Atención por WhatsApp
          </span>
          <span className="ml-auto hidden text-white/60 md:block">
            {String(total).padStart(2, "0")} productos seleccionados
          </span>
        </div>
      </div>
    </section>
  );
}
