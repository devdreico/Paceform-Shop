import { productoPorSlug } from "@/data/productos";
import type { ItemCarrito } from "./tipos";

export const CANTIDAD_MAXIMA_POR_VARIANTE = 99;

function esRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

export function itemCarritoValido(valor: unknown): valor is ItemCarrito {
  if (!esRegistro(valor)) return false;
  const { productoSlug, talla, color, cantidad } = valor;
  if (
    typeof productoSlug !== "string" ||
    typeof talla !== "string" ||
    typeof color !== "string" ||
    !Number.isSafeInteger(cantidad) ||
    Number(cantidad) < 1 ||
    Number(cantidad) > CANTIDAD_MAXIMA_POR_VARIANTE
  ) {
    return false;
  }

  const producto = productoPorSlug(productoSlug);
  return Boolean(
    producto &&
      (producto.tallas.length
        ? producto.tallas.includes(talla)
        : talla === "Única") &&
      producto.colores.some((opcion) => opcion.nombre === color)
  );
}

export function normalizarItemsCarrito(valor: unknown): ItemCarrito[] {
  if (!Array.isArray(valor)) return [];

  const items: ItemCarrito[] = [];
  for (const candidato of valor) {
    if (!itemCarritoValido(candidato)) continue;
    const existente = items.find(
      (item) =>
        item.productoSlug === candidato.productoSlug &&
        item.talla === candidato.talla &&
        item.color === candidato.color
    );
    if (existente) {
      const cantidad = existente.cantidad + candidato.cantidad;
      if (cantidad <= CANTIDAD_MAXIMA_POR_VARIANTE) existente.cantidad = cantidad;
    }
    else items.push({ ...candidato });
  }
  return items;
}