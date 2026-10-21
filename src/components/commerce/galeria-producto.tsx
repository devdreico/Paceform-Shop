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
  const [activa, setActiva] = useState(
    imagenColor && imagenes.includes(imagenColor) ? imagenColor : imagenes[0]
  );
  const [colorPrevio, setColorPrevio] = useState(imagenColor);

  if (imagenColor !== colorPrevio) {
    setColorPrevio(imagenColor);
    if (imagenColor) setActiva(imagenColor);
  }

  const todas =
    imagenColor && !imagenes.includes(imagenColor)
      ? [imagenColor, ...imagenes]
      : imagenes;

  return (
    <div className="vidrio panel p-4">
      <div className="relative rounded-[18px] overflow-hidden bg-humo aspect-[4/3]">
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
        <div className="mt-3 flex gap-2 overflow-x-auto scroll-oculto pb-1">
          {todas.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActiva(img)}
              className={cn(
                "relative size-16 rounded-xl overflow-hidden bg-humo shrink-0 border-[2px] transition-colors",
                activa === img
                  ? "border-verde"
                  : "border-transparent hover:border-verde/30"
              )}
              aria-label={`Ver imagen ${i + 1}`}
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
