import type { DatosEnvio, ItemCarrito } from "./tipos";
import { FORMSPREE } from "./config";
import { productoPorSlug } from "@/data/productos";
import { formatCOP } from "./formato";

function construirPayload(
  items: ItemCarrito[],
  envio: DatosEnvio
) {
  const total = items.reduce((acc, item) => {
    const prod = productoPorSlug(item.productoSlug);
    return acc + (prod ? prod.precio * item.cantidad : 0);
  }, 0);

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
    metodo_pago: "Contra entrega en efectivo",
    nombre: envio.nombre,
    telefono: envio.telefono,
    email: envio.email || "—",
    ciudad: envio.ciudad,
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

export async function enviarContraEntrega(
  items: ItemCarrito[],
  envio: DatosEnvio
) {
  if (items.length === 0) throw new Error("El carrito está vacío");
  const payload = construirPayload(items, envio);
  const res = await fetch(FORMSPREE.contraEntrega, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("No fue posible registrar el pedido");
  return res;
}
