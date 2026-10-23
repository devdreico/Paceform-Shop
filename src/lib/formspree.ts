import type { DatosEnvio, ItemCarrito } from "./tipos";
import { FORMSPREE } from "./config";
import { productoPorSlug } from "@/data/productos";
import { formatCOP } from "./formato";
import { totalPedido } from "./calculos-pedido";
import { municipioPerteneceA } from "./geografia-colombia";

function construirPayload(
  items: ItemCarrito[],
  envio: DatosEnvio
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

export async function enviarContraEntrega(
  items: ItemCarrito[],
  envio: DatosEnvio
) {
  if (items.length === 0) throw new Error("El carrito está vacío");
  if (!envio.nombre.trim() || !envio.barrio.trim() || !envio.direccion.trim()) {
    throw new Error("Completa el nombre, barrio y dirección de envío");
  }
  if (!/^3\d{9}$/.test(envio.telefono)) {
    throw new Error("El teléfono debe tener 10 dígitos y comenzar por 3");
  }
  if (!municipioPerteneceA(envio.departamento, envio.municipio)) {
    throw new Error("Selecciona el departamento y municipio de envío");
  }
  if (envio.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(envio.email)) {
    throw new Error("Revisa el correo electrónico");
  }
  for (const item of items) {
    const producto = productoPorSlug(item.productoSlug);
    if (!producto || !Number.isInteger(item.cantidad) || item.cantidad < 1) {
      throw new Error("El carrito contiene un producto o una cantidad inválida");
    }
    if (
      (producto.tallas.length > 0 && !producto.tallas.includes(item.talla)) ||
      !producto.colores.some((color) => color.nombre === item.color)
    ) {
      throw new Error("Revisa la talla y el color de los productos del carrito");
    }
  }
  const payload = construirPayload(items, envio);
  const res = await fetch(FORMSPREE.contraEntrega, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("No fue posible registrar el pedido");
  return res;
}
