declare module "colombia-territorial" {
  export type MunicipioColombia = {
    nombre: string;
    codigo_dane: string;
  };

  export type DepartamentoColombia = {
    nombre: string;
    codigo_dane: string;
    capital: string;
    municipios: MunicipioColombia[];
  };

  export function getDepartamentos(): DepartamentoColombia[];
}