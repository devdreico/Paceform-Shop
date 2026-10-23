"use client";

import { useId } from "react";
import { MapPin } from "lucide-react";
import { diasEstimados } from "@/lib/config";
import { DEPARTAMENTOS_COLOMBIA } from "@/lib/geografia-colombia";

export default function CampoCiudad({
  departamento,
  municipio,
  onDepartamentoChange,
  onMunicipioChange,
  requerido = true,
}: {
  departamento: string;
  municipio: string;
  onDepartamentoChange: (valor: string) => void;
  onMunicipioChange: (valor: string) => void;
  requerido?: boolean;
}) {
  const id = useId();
  const departamentoId = `${id}-departamento`;
  const municipioId = `${id}-municipio`;
  const departamentos = DEPARTAMENTOS_COLOMBIA;
  const municipios =
    departamentos.find((opcion) => opcion.nombre === departamento)?.municipios ??
    [];
  const dias = diasEstimados(municipio);

  return (
    <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
      <label className="block">
        <span className="text-xs font-bold text-ceniza">Departamento *</span>
        <select
          id={departamentoId}
          required={requerido}
          value={departamento}
          onChange={(e) => onDepartamentoChange(e.target.value)}
          name="departamento"
          autoComplete="address-level1"
          className="mt-1 w-full h-12 px-4 rounded-2xl bg-white border-[1.5px] border-vidrio-borde text-base sm:text-sm font-medium outline-none focus:border-verde"
        >
          <option value="">Selecciona un departamento</option>
          {departamentos.map((opcion) => (
            <option key={opcion.nombre} value={opcion.nombre}>
              {opcion.nombre}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-xs font-bold text-ceniza">Municipio *</span>
        <div className="relative">
          <select
            id={municipioId}
            required={requerido}
            disabled={!departamento}
            value={municipio}
            onChange={(e) => onMunicipioChange(e.target.value)}
            name="municipio"
            autoComplete="address-level2"
            className="mt-1 w-full h-12 pl-11 pr-4 rounded-2xl bg-white border-[1.5px] border-vidrio-borde text-base sm:text-sm font-medium outline-none focus:border-verde disabled:bg-humo disabled:text-ceniza"
          >
            <option value="">
              {departamento ? "Selecciona un municipio" : "Elige primero el departamento"}
            </option>
            {municipios.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
          <MapPin
            className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-ceniza pointer-events-none"
            aria-hidden
          />
        </div>
        {dias && (
          <p className="mt-1.5 text-[11px] font-semibold text-verde">
            Entrega estimada: {dias}
          </p>
        )}
      </label>
    </div>
  );
}
