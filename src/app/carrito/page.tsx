"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Truck } from "lucide-react";
import { useCarrito, totalDe } from "@/lib/carrito";
import { productoPorSlug } from "@/data/productos";
import { formatCOP } from "@/lib/formato";
import Boton from "@/components/ui/boton";
import GlassPanel from "@/components/ui/glass-panel";

export default function CarritoPage() {
  const { items, cambiarCantidad, quitar, subtotal, listo } = useCarrito();

  if (!listo) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-sm text-ceniza">Cargando carrito…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <ShoppingBag className="size-12 text-ceniza mx-auto" />
        <h1 className="mt-5 text-2xl font-extrabold">Tu carrito está vacío</h1>
        <p className="mt-2 text-sm text-ceniza">
          Explora el catálogo y agrega tu primer producto de running.
        </p>
        <Boton href="/tienda" className="mt-6">
          Ir a la tienda
        </Boton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-extrabold">Tu carrito</h1>
      <p className="mt-1 text-sm text-ceniza">
        Compra contra entrega: pagas al recibir. Envío gratis a todo Colombia.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="space-y-3">
          {items.map((item, i) => {
            const prod = productoPorSlug(item.productoSlug);
            if (!prod) return null;
            return (
              <GlassPanel key={`${item.productoSlug}-${item.talla}-${item.color}-${i}`} className="p-4 flex gap-4">
                <Link
                  href={`/tienda/${prod.slug}`}
                  className="relative size-24 rounded-2xl bg-humo shrink-0 overflow-hidden"
                >
                  <Image
                    src={prod.imagen}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/tienda/${prod.slug}`}
                        className="text-sm font-extrabold hover:text-verde"
                      >
                        {prod.nombre}
                      </Link>
                      <p className="text-xs text-ceniza mt-0.5">
                        Talla {item.talla} · {item.color}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => quitar(i)}
                      className="p-3 min-w-11 min-h-11 size-11 rounded-full flex items-center justify-center text-carbon/50 hover:text-carbon hover:bg-humo transition-colors"
                      aria-label="Quitar producto"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(i, item.cantidad - 1)}
                        className="p-3 min-w-11 min-h-11 size-11 rounded-full bg-white border-[1.5px] border-vidrio-borde flex items-center justify-center hover:bg-verde-50 transition-colors"
                        aria-label="Restar"
                      >
                        <Minus className="size-4" />
                      </button>
                      <span className="text-sm font-bold w-6 text-center">
                        {item.cantidad}
                      </span>
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(i, item.cantidad + 1)}
                        className="p-3 min-w-11 min-h-11 size-11 rounded-full bg-white border-[1.5px] border-vidrio-borde flex items-center justify-center hover:bg-verde-50 transition-colors"
                        aria-label="Sumar"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                    <p className="text-sm font-extrabold text-verde">
                      {formatCOP(prod.precio * item.cantidad)}
                    </p>
                  </div>
                </div>
              </GlassPanel>
            );
          })}
        </div>

        <GlassPanel solido className="p-6 lg:sticky lg:top-20">
          <h2 className="text-base font-extrabold">Resumen</h2>
          <div className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-ceniza font-semibold">Subtotal</span>
              <span className="font-bold">{formatCOP(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ceniza font-semibold inline-flex items-center gap-1.5">
                <Truck className="size-4 text-verde" /> Envío
              </span>
              <span className="font-extrabold text-verde">GRATIS</span>
            </div>
            <div className="pt-3 mt-1 border-t border-verde/10 flex justify-between text-base">
              <span className="font-extrabold">Total</span>
              <span className="font-extrabold text-verde">
                {formatCOP(totalDe(items))}
              </span>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-ceniza">
            Pagas contra entrega al recibirla. Te confirmamos el pedido por
            WhatsApp y el envío sale en 1–4 días hábiles según tu ciudad.
          </p>
          <Boton href="/checkout" className="mt-5 w-full py-4">
            Continuar con contra entrega
          </Boton>
          <Boton href="/tienda" variant="secundario" className="mt-2 w-full">
            Seguir comprando
          </Boton>
        </GlassPanel>
      </div>
    </div>
  );
}
