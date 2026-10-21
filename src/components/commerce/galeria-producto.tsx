"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export default function GaleriaProducto({
  principal,
  galeria,
  alt,
  imagenColor,
}: {
  principal: string;
  galeria?: string[];
  alt: string;
  imagenColor?: string;
}) {
  const imagenes = galeria && galeria.length > 0 ? galeria : [principal];
  const [imagenManual, setImagenManual] = useState<{
    color: string | undefined;
    src: string;
  } | null>(null);
  const activa =
    imagenManual && imagenManual.color === imagenColor
      ? imagenManual.src
      : imagenColor ?? imagenes[0];

  const todas =
    imagenColor && !imagenes.includes(imagenColor)
      ? [imagenColor, ...imagenes]
      : imagenes;

  return (
    <div className="vidrio panel w-full min-w-0 max-w-full p-3 sm:p-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] bg-humo sm:aspect-[5/4]">
        <Image
          key={activa}
          src={activa}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-contain crossfade-img"
        />
      </div>
      {todas.length > 1 && (
        <div className="mt-3 flex max-w-full gap-2 overflow-x-auto scroll-oculto pb-1">
          {todas.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setImagenManual({ color: imagenColor, src: img })}
              className={cn(
                "relative size-14 shrink-0 overflow-hidden rounded-xl border-[2px] bg-humo transition-colors sm:size-16",
                activa === img
                  ? "border-verde"
                  : "border-transparent hover:border-verde/30"
              )}
              aria-label={`Ver imagen ${i + 1}`}
              aria-pressed={activa === img}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="64px"
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
