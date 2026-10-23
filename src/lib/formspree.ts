import "server-only";
import type { DatosEnvio, ItemCarrito } from "./tipos";
import { FORMSPREE } from "./config";
import { productoPorSlug } from "@/data/productos";
import { formatCOP } from "./formato";
import { totalPedido } from "./calculos-pedido";

function construirPayload(
  items: ItemCarrito[],
  envio: DatosEnvio,
  pedidoId: string
) {
  const total = totalPedido(items);

  const detalle = items
    .map((item) => {
      const prod = productoPorSlug(item.productoSlug);
      if (!prod) return "";
      return `${prod.nombre} | Talla ${item.talla} | ${item.color} | x${item.cantidad} | ${formatCOP(prod.precio * item.cantidad)}`;
    })
    .filter(Boolean)
    .join("\n");

  return {
    _subject: `PACEFORM - Pedido contra entrega - ${envio.nombre}`,
    referencia_pedido: pedidoId,
    metodo_pago: "Contra entrega en efectivo",
    nombre: envio.nombre,
    telefono: `+57 ${envio.telefono}`,
    email: envio.email || "—",
    departamento: envio.departamento,
    municipio: envio.municipio,
    ciudad: envio.municipio,
    direccion: envio.direccion,
    barrio: envio.barrio,
    notas: envio.notas || "—",
    productos: detalle,
    total_articulos: String(items.reduce((a, i) => a + i.cantidad, 0)),
    subtotal: formatCOP(total),
    envio: "GRATIS",
    total: formatCOP(total),
  };
}

export async function registrarContraEntregaEnFormspree(
  items: ItemCarrito[],
  envio: DatosEnvio,
  pedidoId: string
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(FORMSPREE.contraEntrega, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(construirPayload(items, envio, pedidoId)),
      signal: controller.signal,
    });
    const respuesta: unknown = await res.json().catch(() => null);
    const tieneErrores =
      typeof respuesta === "object" &&
      respuesta !== null &&
      "errors" in respuesta &&
      Array.isArray(respuesta.errors) &&
      respuesta.errors.length > 0;
    if (!res.ok || tieneErrores) {
      throw new Error("FORMSPREE_RECHAZADO");
    }
    return res;
  } catch (error) {
    if (controller.signal.aborted) throw new Error("FORMULARIO_TIMEOUT");
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
