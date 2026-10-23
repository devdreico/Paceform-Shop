"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ItemCarrito } from "./tipos";
import { productos, productoPorSlug } from "@/data/productos";
import { totalPedido } from "./calculos-pedido";
import {
  CANTIDAD_MAXIMA_POR_VARIANTE,
  itemCarritoValido,
  normalizarItemsCarrito,
} from "./validacion-carrito";

const CLAVE = "paceform-carrito-v1";

type ContextoCarrito = {
  items: ItemCarrito[];
  agregar: (item: ItemCarrito) => void;
  cambiarCantidad: (index: number, cantidad: number) => void;
  quitar: (index: number) => void;
  vaciar: () => void;
  totalArticulos: number;
  subtotal: number;
  abierto: boolean;
  setAbierto: (v: boolean) => void;
  listo: boolean;
  avisoRestauracion: boolean;
};

const CarritoContext = createContext<ContextoCarrito | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [abierto, setAbierto] = useState(false);
  const [listo, setListo] = useState(false);
  const [avisoRestauracion, setAvisoRestauracion] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const crudo = localStorage.getItem(CLAVE);
        if (crudo) {
          const guardado: unknown = JSON.parse(crudo);
          const normalizados = normalizarItemsCarrito(guardado);
          setItems(normalizados);
          const itemsValidos = Array.isArray(guardado)
            ? guardado.filter(itemCarritoValido)
            : [];
          setAvisoRestauracion(
            !Array.isArray(guardado) ||
              itemsValidos.length !== guardado.length ||
              itemsValidos.reduce((suma, item) => suma + item.cantidad, 0) !==
                normalizados.reduce((suma, item) => suma + item.cantidad, 0)
          );
        }
      } catch {
        setAvisoRestauracion(true);
      }
      setListo(true);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!listo) return;
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [items, listo]);

  const agregar = useCallback((nuevo: ItemCarrito) => {
    if (!itemCarritoValido(nuevo)) return;
    setItems((prev) => {
      const i = prev.findIndex(
        (it) =>
          it.productoSlug === nuevo.productoSlug &&
          it.talla === nuevo.talla &&
          it.color === nuevo.color
      );
      if (i >= 0) {
        const copia = [...prev];
        const cantidad = copia[i].cantidad + nuevo.cantidad;
        if (!Number.isSafeInteger(cantidad) || cantidad > CANTIDAD_MAXIMA_POR_VARIANTE) return prev;
        copia[i] = { ...copia[i], cantidad };
        return copia;
      }
      return [...prev, nuevo];
    });
  }, []);

  const cambiarCantidad = useCallback((index: number, cantidad: number) => {
    setItems((prev) => {
      if (cantidad <= 0) return prev.filter((_, i) => i !== index);
      if (
        !Number.isSafeInteger(cantidad) ||
        cantidad > CANTIDAD_MAXIMA_POR_VARIANTE ||
        index < 0 ||
        index >= prev.length
      ) {
        return prev;
      }
      const copia = [...prev];
      copia[index] = { ...copia[index], cantidad };
      return copia;
    });
  }, []);

  const quitar = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const vaciar = useCallback(() => setItems([]), []);

  const { totalArticulos, subtotal } = useMemo(() => {
    let articulos = 0;
    for (const item of items) {
      const prod = productoPorSlug(item.productoSlug);
      if (!prod) continue;
      articulos += item.cantidad;
    }
    return { totalArticulos: articulos, subtotal: totalPedido(items) };
  }, [items]);

  const valor: ContextoCarrito = {
    items,
    agregar,
    cambiarCantidad,
    quitar,
    vaciar,
    totalArticulos,
    subtotal,
    abierto,
    setAbierto,
    listo,
    avisoRestauracion,
  };

  return (
    <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
  );
}

export function useCarrito() {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de CartProvider");
  return ctx;
}

export function resumenItems(items: ItemCarrito[]) {
  const lineas = items
    .map((item) => {
      const prod = productoPorSlug(item.productoSlug);
      if (!prod) return null;
      return `- ${prod.nombre} · Talla ${item.talla} · ${item.color} · x${item.cantidad} · ${formato(prod.precio * item.cantidad)}`;
    })
    .filter(Boolean)
    .join("\n");
  return lineas;
}

function formato(v: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(v);
}

export function totalDe(items: ItemCarrito[]) {
  return totalPedido(items);
}

export { productos };
