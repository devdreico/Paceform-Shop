import type { DatosEnvio, ItemCarrito } from "./tipos";

export async function enviarContraEntrega(
  items: ItemCarrito[],
  envio: DatosEnvio,
  pedidoId: string
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch("/api/pedidos/contra-entrega", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ items, envio, pedidoId }),
      signal: controller.signal,
    });
    const resultado: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      if (response.status >= 500) throw new Error("FORMULARIO_TIMEOUT");
      const mensaje =
        typeof resultado === "object" &&
        resultado !== null &&
        "error" in resultado &&
        typeof resultado.error === "string"
          ? resultado.error
          : "No fue posible registrar el pedido.";
      throw new Error(mensaje);
    }
    return response;
  } catch (error) {
    if (controller.signal.aborted) throw new Error("FORMULARIO_TIMEOUT");
    if (error instanceof TypeError) throw new Error("FORMULARIO_TIMEOUT");
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}