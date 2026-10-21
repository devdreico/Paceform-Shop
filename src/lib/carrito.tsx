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
};

const CarritoContext = createContext<ContextoCarrito | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);
  const [abierto, setAbierto] = useState(false);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        const crudo = localStorage.getItem(CLAVE);
        if (crudo) setItems(JSON.parse(crudo));
      } catch {
        /* almacenamiento no disponible */
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
    setItems((prev) => {
      const i = prev.findIndex(
        (it) =>
          it.productoSlug === nuevo.productoSlug &&
          it.talla === nuevo.talla &&
          it.color === nuevo.color
      );
      if (i >= 0) {
        const copia = [...prev];
        copia[i] = { ...copia[i], cantidad: copia[i].cantidad + nuevo.cantidad };
        return copia;
      }
      return [...prev, nuevo];
    });
    setAbierto(true);
  }, []);

  const cambiarCantidad = useCallback((index: number, cantidad: number) => {
    setItems((prev) => {
      if (cantidad <= 0) return prev.filter((_, i) => i !== index);
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
    let suma = 0;
    for (const item of items) {
      const prod = productoPorSlug(item.productoSlug);
      if (!prod) continue;
      articulos += item.cantidad;
      suma += prod.precio * item.cantidad;
    }
    return { totalArticulos: articulos, subtotal: suma };
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
  return items.reduce((acc, item) => {
    const prod = productoPorSlug(item.productoSlug);
    return acc + (prod ? prod.precio * item.cantidad : 0);
  }, 0);
}

export { productos };
