"use client";

import { useId } from "react";
import { MapPin } from "lucide-react";
import { CIUDADES, diasEstimados } from "@/lib/config";

export default function CampoCiudad({
  valor,
  onChange,
  requerido = true,
  idProp,
}: {
  valor: string;
  onChange: (v: string) => void;
  requerido?: boolean;
  idProp?: string;
}) {
  const id = useId();
  const inputId = idProp ?? id;
  const listId = `${inputId}-lista`;
  const dias = diasEstimados(valor);

  return (
    <label className="block">
      <span className="text-xs font-bold text-ceniza">
        Ciudad{requerido ? "" : " (opcional)"}
      </span>
      <div className="relative">
        <input
          id={inputId}
          list={listId}
          required={requerido}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ej: Bogotá, Medellín, Pasto…"
          autoComplete="address-level2"
          name="ciudad"
          enterKeyHint="next"
          className="mt-1 w-full h-12 pl-11 pr-4 rounded-2xl bg-white border-[1.5px] border-vidrio-borde text-base sm:text-sm font-medium outline-none focus:border-verde"
        />
        <MapPin
          className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-ceniza pointer-events-none"
          aria-hidden
        />
        <datalist id={listId}>
          {CIUDADES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>
      {dias && (
        <p className="mt-1.5 text-[11px] font-semibold text-verde">
          Entrega estimada: {dias}
        </p>
      )}
    </label>
  );
}
