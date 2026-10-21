"use client";

import { ArrowRight, Truck, ShieldCheck, MessageCircle } from "lucide-react";
import { MARCA } from "@/lib/config";
import { productos } from "@/data/productos";
import Boton from "@/components/ui/boton";
import Badge from "@/components/ui/badge";
import { useCountUp, useReveal } from "@/lib/animaciones";
import { cn } from "@/lib/cn";

function CorredorSVG() {
  return (
    <svg
      viewBox="0 0 320 260"
      className="w-full h-auto"
      aria-hidden
      role="presentation"
    >
      {/* Rayas de velocidad */}
      <g opacity="0.5">
        <rect
          className="raya-velocidad"
          x="30"
          y="78"
          width="46"
          height="4"
          rx="2"
          fill="#ffffff"
        />
        <rect
          className="raya-velocidad raya-velocidad-2"
          x="18"
          y="108"
          width="60"
          height="4"
          rx="2"
          fill="#ffffff"
        />
        <rect
          className="raya-velocidad raya-velocidad-3"
          x="36"
          y="138"
          width="38"
          height="4"
          rx="2"
          fill="#ffffff"
        />
      </g>

      {/* Suelo */}
      <rect className="suelo-runner" x="0" y="228" width="320" height="8" rx="4" fill="rgba(255,255,255,0.2)" />

      <g className="cuerpo-runner">
        {/* Pierna trasera */}
        <g className="corredor-trasero" style={{ transformOrigin: "175px 140px" }}>
          <rect x="171" y="138" width="11" height="52" rx="5.5" fill="#dcebe5" />
          <rect x="168" y="184" width="22" height="10" rx="5" fill="#ffffff" />
        </g>

        {/* Brazo trasero */}
        <g className="brazo-trasero" style={{ transformOrigin: "168px 96px" }}>
          <rect x="164" y="94" width="10" height="44" rx="5" fill="#dcebe5" />
        </g>

        {/* Torso */}
        <rect x="158" y="88" width="34" height="58" rx="14" fill="#ffffff" />
        {/* Detalle torso */}
        <rect x="166" y="100" width="18" height="6" rx="3" fill="#063d2e" opacity="0.35" />

        {/* Pierna delantera */}
        <g className="corredor-delantero" style={{ transformOrigin: "175px 140px" }}>
          <rect x="171" y="138" width="12" height="54" rx="6" fill="#ffffff" />
          <rect x="168" y="186" width="24" height="10" rx="5" fill="#7CFC00" />
        </g>

        {/* Brazo delantero */}
        <g className="brazo-delantero" style={{ transformOrigin: "168px 96px" }}>
          <rect x="164" y="94" width="11" height="46" rx="5.5" fill="#ffffff" />
        </g>

        {/* Cabeza */}
        <circle cx="188" cy="70" r="18" fill="#ffffff" />
        {/* Visera / gorra */}
        <path d="M172 64c4-12 28-14 34-2v6H172z" fill="#dcebe5" />
        <rect x="200" y="66" width="14" height="5" rx="2.5" fill="#dcebe5" />
      </g>
    </svg>
  );
}

function Contador({ target, sufijo, label }: { target: number; sufijo?: string; label: string }) {
  const { ref, valor } = useCountUp(target);
  return (
    <div className="text-center">
      <p className="text-2xl sm:text-3xl font-extrabold text-blanco">
        <span ref={ref}>{valor}</span>
        {sufijo}
      </p>
      <p className="text-[11px] font-semibold text-white/55 mt-0.5">{label}</p>
    </div>
  );
}

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

const fotosEscena = [
  {
    src: "/lifestyle/corredor-1.jpg",
    alt: "Corredor en ruta al amanecer",
    posicion: "top-[3%] left-[2%] w-[50%] z-0",
    clase: "tarjeta-3d-1",
    ratio: "aspect-[4/5]",
  },
  {
    src: "/lifestyle/corredor-2.jpg",
    alt: "Corredora entrenando en la ciudad",
    posicion: "top-[8%] right-[2%] w-[44%] z-0",
    clase: "tarjeta-3d-2",
    ratio: "aspect-[3/4]",
  },
  {
    src: "/lifestyle/corredor-3.jpg",
    alt: "Salida de running en grupo",
    posicion: "bottom-[3%] left-[14%] w-[54%] z-0",
    clase: "tarjeta-3d-3",
    ratio: "aspect-[16/10]",
  },
];

export default function HeroAnimado() {
  const total = productos.length;

  return (
    <section className="relative bg-verde text-blanco overflow-hidden">
      {/* Decoración geométrica */}
      <div className="absolute inset-0 opacity-[0.06]" aria-hidden>
        <div className="absolute -top-32 -right-32 size-[520px] rounded-full border-[40px] border-blanco" />
        <div className="absolute bottom-10 -left-20 size-[300px] rounded-full border-[30px] border-blanco" />
      </div>

      {/* Franja kinetic */}
      <div className="relative border-b border-white/10 overflow-hidden">
        <div className="marquee-pista py-2.5">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {[
                "RUN",
                "TRAIN",
                "RECOVER",
                "PACEFORM",
                "ENVÍO GRATIS",
                "CONTRA ENTREGA",
                "MERCADO PAGO",
                "COLOMBIA",
              ].map((w) => (
                <span
                  key={`${dup}-${w}`}
                  className="px-6 text-[11px] font-extrabold tracking-[0.25em] text-white/45 uppercase whitespace-nowrap"
                >
                  {w} ·
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="zancada zancada-1">
            <Badge tono="claro">{MARCA.tagline}</Badge>
          </div>

          <h1 className="mt-5 text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.04] tracking-tight">
            <span className="block zancada zancada-2">MEJOR</span>
            <span className="block zancada zancada-3">EQUIPAMIENTO.</span>
            <span className="block text-white/70 zancada zancada-4">
              MÁS KILÓMETROS.
            </span>
          </h1>

          <p className="zancada zancada-4 mt-6 text-base sm:text-lg text-white/75 max-w-lg leading-relaxed">
            {MARCA.mensaje}
          </p>

          <div className="zancada zancada-5 mt-8 flex flex-wrap gap-3">
            <Boton href="/tienda" variant="claro" className="px-8">
              Explorar equipamiento <ArrowRight className="size-4 flecha-slide" />
            </Boton>
            <Boton
              href="/wiki"
              variant="secundario"
              className="px-8 border-white/40 text-blanco hover:bg-white/10"
            >
              Guía de running
            </Boton>
          </div>

          <div className="zancada zancada-5 mt-10 grid grid-cols-3 max-w-md gap-4 pt-6 border-t border-white/10">
            <Contador target={total} label="Productos" />
            <Contador target={100} sufijo="%" label="Envío gratis" />
            <Contador target={1} sufijo="–4 d" label="Entrega" />
          </div>

          <div className="zancada zancada-5 mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-white/55">
            <span className="inline-flex items-center gap-1.5">
              <Truck className="size-4" /> Envío gratis Colombia
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4" /> Contra entrega
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="size-4" /> Soporte WhatsApp
            </span>
          </div>
        </div>

        {/* Escena 3D: collage de fotos reales + corredor animado */}
        <div className="relative zancada zancada-3">
          <div className="escena-3d relative aspect-[4/3] sm:aspect-[5/4]">
            {fotosEscena.map((foto) => (
              <div
                key={foto.src}
                className={`absolute ${foto.posicion} ${foto.clase}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={foto.src}
                  alt={foto.alt}
                  loading="eager"
                  className={`w-full ${foto.ratio} object-cover rounded-[22px] border border-white/20`}
                />
              </div>
            ))}

            <div className="absolute left-1/2 top-1/2 z-10 w-[46%] -translate-x-1/2 -translate-y-1/2 vidrio-oscuro panel p-4 corredor-3d-pasada">
              <CorredorSVG />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
