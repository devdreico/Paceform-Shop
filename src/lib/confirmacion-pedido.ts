"use client";

const CLAVE = "paceform-pedido-confirmado";
const VIGENCIA_MS = 24 * 60 * 60 * 1000;
const EVENTO_CONFIRMACION = "paceform:pedido-confirmado";

let ultimoPedidoAceptado: string | null = null;

export function registrarPedidoAceptado(id: string) {
  ultimoPedidoAceptado = id;
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify({ id, creado: Date.now() }));
  } catch {
    /* La confirmación en memoria mantiene el flujo en la sesión actual. */
  }
  window.dispatchEvent(new Event(EVENTO_CONFIRMACION));
}

export function pedidoFueAceptado(id: string) {
  if (!id) return false;
  if (ultimoPedidoAceptado === id) return true;

  try {
    const guardado: unknown = JSON.parse(sessionStorage.getItem(CLAVE) ?? "null");
    if (
      typeof guardado === "object" &&
      guardado !== null &&
      "id" in guardado &&
      "creado" in guardado &&
      guardado.id === id &&
      typeof guardado.creado === "number" &&
      Date.now() - guardado.creado <= VIGENCIA_MS
    ) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export function suscribirConfirmacionPedido(callback: () => void) {
  window.addEventListener(EVENTO_CONFIRMACION, callback);
  window.addEventListener("pageshow", callback);
  return () => {
    window.removeEventListener(EVENTO_CONFIRMACION, callback);
    window.removeEventListener("pageshow", callback);
  };
}