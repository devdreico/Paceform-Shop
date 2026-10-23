import { getDepartamentos } from "colombia-territorial";

function normalizarNombre(nombre: string) {
  return nombre
    .trim()
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export const DEPARTAMENTOS_COLOMBIA = getDepartamentos()
  .map((departamento) => ({
    nombre: departamento.nombre,
    municipios: departamento.municipios
      .map((municipio) => municipio.nombre)
      .sort((a, b) => a.localeCompare(b, "es")),
  }))
  .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

export function departamentoParaMunicipio(municipio: string) {
  const buscado = normalizarNombre(municipio);
  if (!buscado) return "";

  const coincidencias = DEPARTAMENTOS_COLOMBIA.filter((departamento) =>
    departamento.municipios.some(
      (nombre) => normalizarNombre(nombre) === buscado
    )
  );

  return coincidencias.length === 1 ? coincidencias[0].nombre : "";
}

export function municipioPerteneceA(departamento: string, municipio: string) {
  const seleccionado = DEPARTAMENTOS_COLOMBIA.find(
    (opcion) => opcion.nombre === departamento
  );
  const buscado = normalizarNombre(municipio);

  return Boolean(
    seleccionado &&
      seleccionado.municipios.some(
        (nombre) => normalizarNombre(nombre) === buscado
      )
  );
}