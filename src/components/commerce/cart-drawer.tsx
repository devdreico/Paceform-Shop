"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCarrito, totalDe } from "@/lib/carrito";
import { productoPorSlug } from "@/data/productos";
import { formatCOP } from "@/lib/formato";
import Boton from "@/components/ui/boton";

export default function CartDrawer() {
  const {
    items,
    abierto,
    setAbierto,
    cambiarCantidad,
    quitar,
    subtotal,
    listo,
  } = useCarrito();

  useEffect(() => {
    if (!listo || !abierto) return;
    document.body.classList.add("scroll-bloqueado");
    return () => document.body.classList.remove("scroll-bloqueado");
  }, [abierto, listo]);

  if (!listo || !abierto) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-carbon/40 backdrop-blur-sm"
        onClick={() => setAbierto(false)}
        aria-label="Cerrar carrito"
      />
      <aside className="relative w-full max-w-md bg-fondo h-full flex flex-col animar-drawer">
        <div className="flex items-center justify-between px-5 py-4 vidrio-solido border-b border-vidrio-borde">
          <h2 className="text-base font-extrabold">Tu carrito</h2>
          <button
            type="button"
            onClick={() => setAbierto(false)}
            className="p-2 hover:bg-verde-50 rounded-full"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="size-10 text-ceniza" />
            <p className="mt-4 font-bold">Tu carrito está vacío</p>
            <p className="mt-1 text-sm text-ceniza">
              Explora el catálogo y agrega tu primer producto.
            </p>
            <Boton href="/tienda" onClick={() => setAbierto(false)} className="mt-6">
              Ir a la tienda
            </Boton>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {items.map((item, i) => {
                const prod = productoPorSlug(item.productoSlug);
                if (!prod) return null;
                const key = `${item.productoSlug}-${item.talla}-${item.color}`;
                return (
                  <div key={key} className="vidrio panel p-3 flex gap-3">
                    <Link
                      href={`/tienda/${prod.slug}`}
                      onClick={() => setAbierto(false)}
                      className="relative size-20 rounded-2xl bg-humo shrink-0 overflow-hidden"
                    >
                      <Image
                        src={prod.imagen}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold leading-tight">{prod.nombre}</p>
                      <p className="text-[11px] text-ceniza mt-0.5">
                        Talla {item.talla} · {item.color}
                      </p>
                      <p className="text-sm font-extrabold text-verde mt-1">
                        {formatCOP(prod.precio * item.cantidad)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(i, item.cantidad - 1)}
                          className="size-11 rounded-full bg-white border-[1.5px] border-vidrio-borde flex items-center justify-center"
                          aria-label="Restar"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="text-sm font-bold w-5 text-center">
                          {item.cantidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(i, item.cantidad + 1)}
                          className="size-11 rounded-full bg-white border-[1.5px] border-vidrio-borde flex items-center justify-center"
                          aria-label="Sumar"
                        >
                          <Plus className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => quitar(i)}
                          className="ml-auto size-11 flex items-center justify-center rounded-full text-carbon/50 hover:text-carbon hover:bg-verde-50"
                          aria-label="Quitar"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="px-5 pt-4 safe-area-pb vidrio-solido border-t border-vidrio-borde space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-ceniza font-semibold">Subtotal</span>
                <span className="font-extrabold">{formatCOP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ceniza font-semibold">Envío</span>
                <span className="font-extrabold text-verde">GRATIS</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="font-extrabold">Total</span>
                <span className="font-extrabold text-verde">
                  {formatCOP(totalDe(items))}
                </span>
              </div>
              <p className="text-[11px] text-ceniza">
                Compra contra entrega: pagas al recibir. Envío gratis a todo el
                país.
              </p>
              <div className="grid gap-2">
                <Boton href="/checkout" onClick={() => setAbierto(false)}>
                  Ir a contra entrega
                </Boton>
                <Boton
                  href="/carrito"
                  variant="secundario"
                  onClick={() => setAbierto(false)}
                >
                  Ver carrito
                </Boton>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
