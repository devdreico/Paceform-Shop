"use client";

import { useState } from "react";
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
  const activaInicial = imagenColor
    ? imagenes.find((i) => i === imagenColor) ?? imagenes[0]
    : imagenes[0];
  const [activa, setActiva] = useState(activaInicial);

  const todas = imagenColor && !imagenes.includes(imagenColor)
    ? [imagenColor, ...imagenes]
    : imagenes;

  return (
    <div className="vidrio panel p-4">
      <div className="rounded-[18px] overflow-hidden bg-humo aspect-[4/3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activa}
          alt={alt}
          className="w-full h-full object-cover animar-entrada"
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
                "size-16 rounded-xl overflow-hidden bg-humo shrink-0 border-[2px] transition-colors",
                activa === img ? "border-verde" : "border-transparent hover:border-verde/30"
              )}
              aria-label={`Ver imagen ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
