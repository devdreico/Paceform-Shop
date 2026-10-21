const formateador = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatCOP(valor: number): string {
  return formateador.format(valor);
}

export function fechaLegible(iso: string): string {
  const fecha = new Date(iso + "T12:00:00");
  return fecha.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
