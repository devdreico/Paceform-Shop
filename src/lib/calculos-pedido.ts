import type { ItemCarrito } from "./tipos";
import { productoPorSlug } from "@/data/productos";

export function totalPedido(items: ItemCarrito[]) {
  return items.reduce((total, item) => {
    const producto = productoPorSlug(item.productoSlug);
    return total + (producto ? producto.precio * item.cantidad : 0);
  }, 0);
}