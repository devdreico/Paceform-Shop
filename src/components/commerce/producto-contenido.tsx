"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  ChevronRight,
  Package,
  MessageCircle,
  RotateCcw,
  Info,
  Check,
} from "lucide-react";
import {
  productos,
  productoPorSlug,
  categoriaPorSlug,
} from "@/data/productos";
import { formatCOP } from "@/lib/formato";
import { ENVIO, WHATSAPP, MERCADO_PAGO } from "@/lib/config";
import SelectorProducto, {
  EstadoStock,
} from "@/components/commerce/selector-producto";
import GaleriaProducto from "@/components/commerce/galeria-producto";
import ProductCard from "@/components/commerce/product-card";
import GlassPanel from "@/components/ui/glass-panel";

export default function ProductoContenido({ slug }: { slug: string }) {
  const [imagenColor, setImagenColor] = useState<string | undefined>(undefined);
  const onColorChange = useCallback((img?: string) => setImagenColor(img), []);

  const producto = productoPorSlug(slug);
  if (!producto) return null;

  const categoria = categoriaPorSlug(producto.categoriaSlug);
  const complementarios = producto.complementarios
    .map(productoPorSlug)
    .filter(Boolean);
  const relacionados = productos
    .filter(
      (p) =>
        p.slug !== producto.slug &&
        (p.categoriaSlug === producto.categoriaSlug ||
          producto.complementarios.includes(p.slug))
    )
    .slice(0, 4);

  return (
    <>
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-ceniza mb-6 flex-wrap">
        <Link href="/" className="hover:text-verde">
          Inicio
        </Link>
        <ChevronRight className="size-3" />
        <Link href="/tienda" className="hover:text-verde">
          Tienda
        </Link>
        {categoria && (
          <>
            <ChevronRight className="size-3" />
            <Link
              href={`/categorias/${categoria.slug}`}
              className="hover:text-verde"
            >
              {categoria.nombre}
            </Link>
          </>
        )}
        <ChevronRight className="size-3" />
        <span className="text-carbon">{producto.nombre}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24 self-start">
          <GaleriaProducto
            principal={producto.imagen}
            galeria={producto.galeria}
            alt={producto.nombre}
            imagenColor={imagenColor}
          />
        </div>

        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <EstadoStock estado={producto.disponibilidad} />
            {producto.etiqueta && (
              <span className="px-3 py-1 rounded-full bg-verde text-blanco text-[11px] font-bold uppercase tracking-wide">
                {producto.etiqueta}
              </span>
            )}
            {categoria && (
              <span className="text-xs font-bold uppercase tracking-wide text-ceniza">
                {categoria.nombre}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-tight">
            {producto.nombre}
          </h1>
          <p className="mt-2 text-sm text-ceniza">{producto.descripcionCorta}</p>

          <div className="mt-5 flex items-end gap-3 flex-wrap">
            <p className="text-3xl font-extrabold text-verde">
              {formatCOP(producto.precio)}
            </p>
            {producto.precioAntes && (
              <p className="text-lg font-bold text-ceniza line-through">
                {formatCOP(producto.precioAntes)}
              </p>
            )}
          </div>
          <p className="text-xs text-ceniza mt-1">
            Precio final · envío gratis · impuestos incluidos
          </p>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-carbon">
            <span className="inline-flex items-center gap-1.5">
              <Truck className="size-4 text-verde" /> Envío gratis
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-verde" /> Contra entrega
              disponible
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Package className="size-4 text-verde" /> Entrega 1–4 días según
              ciudad
            </span>
          </div>

          <div className="mt-8">
            <SelectorProducto
              producto={producto}
              onColorChange={onColorChange}
            />
          </div>

          {producto.notaCompra && (
            <p className="mt-4 text-xs font-semibold text-carbon bg-verde-50 rounded-2xl px-4 py-3 border-[1.5px] border-verde/15">
              {producto.notaCompra}
            </p>
          )}

          <GlassPanel className="mt-8 p-5">
            <h2 className="text-sm font-extrabold inline-flex items-center gap-2">
              <Truck className="size-4 text-verde" /> Envío y entrega
            </h2>
            <ul className="mt-3 space-y-2 text-xs text-ceniza">
              <li>
                <strong className="text-carbon">Envío gratis</strong> a todo
                Colombia, sin monto mínimo.
              </li>
              <li>
                <strong className="text-carbon">Ciudades principales</strong>{" "}
                {ENVIO.principales.dias}.
              </li>
              <li>
                <strong className="text-carbon">Resto del país:</strong>{" "}
                {ENVIO.resto.dias}.
              </li>
              <li>
                Pagas contra entrega al recibirla, o con Mercado Pago. Confirmamos
                el pago de MP manualmente y despachamos.
              </li>
            </ul>
          </GlassPanel>

          {producto.beneficios && producto.beneficios.length > 0 && (
            <div className="mt-8">
              <h2 className="text-base font-extrabold">Beneficios</h2>
              <ul className="mt-3 space-y-2">
                {producto.beneficios.map((b) => (
                  <li
                    key={b}
                    className="text-sm text-carbon/85 flex items-start gap-2.5"
                  >
                    <Check className="size-4 text-verde shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-base font-extrabold">Especificaciones</h2>
            <dl className="mt-3 vidrio panel divide-y divide-verde/10">
              {producto.especificaciones.map((e) => (
                <div
                  key={e.etiqueta}
                  className="flex items-start justify-between gap-4 px-5 py-3.5"
                >
                  <dt className="text-xs font-semibold text-ceniza">
                    {e.etiqueta}
                  </dt>
                  <dd className="text-xs font-bold text-right">{e.valor}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8">
            <h2 className="text-base font-extrabold">Contenido del paquete</h2>
            <ul className="mt-3 space-y-2">
              {producto.contenidoPaquete.map((c) => (
                <li
                  key={c}
                  className="text-sm text-carbon flex items-start gap-2"
                >
                  <span className="mt-1.5 size-1.5 rounded-full bg-verde shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <GlassPanel className="mt-8 p-5">
            <h2 className="text-sm font-extrabold inline-flex items-center gap-2">
              <Info className="size-4 text-verde" /> Cómo pagar con Mercado Pago
            </h2>
            <ol className="mt-3 space-y-2 text-xs text-ceniza list-decimal list-inside">
              <li>Elige talla y color, y pulsa «Pagar con Mercado Pago».</li>
              <li>Registra tus datos de envío (llegan a nuestro pedido).</li>
              <li>Se abre el link oficial de Mercado Pago.</li>
              <li>
                Paga el monto exacto con la referencia{" "}
                <strong className="text-carbon">
                  PACEFORM {producto.nombre}
                </strong>
                .
              </li>
              <li>Envíanos el comprobante por WhatsApp y confirmamos.</li>
            </ol>
            <p className="mt-3 text-[11px] text-ceniza">
              Link de pago: {MERCADO_PAGO.linkGenerico}
            </p>
          </GlassPanel>

          <GlassPanel className="mt-4 p-5">
            <h2 className="text-sm font-extrabold inline-flex items-center gap-2">
              <RotateCcw className="size-4 text-verde" /> Cambios y devoluciones
            </h2>
            <p className="mt-2 text-xs text-ceniza leading-relaxed">
              Tienes 5 días calendario desde la recepción para solicitar cambio o
              devolución si el producto presenta fallas de fábrica o no corresponde
              a lo pedido. El producto debe conservar empaque y etiquetas. Consulta
              condiciones completas en{" "}
              <Link
                href="/envios-cambios"
                className="font-bold text-verde underline underline-offset-2"
              >
                Envíos y devoluciones
              </Link>
              .
            </p>
          </GlassPanel>

          <a
            href={`https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(
              `Hola PACEFORM, tengo una pregunta sobre ${producto.nombre}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-verde hover:underline underline-offset-4"
          >
            <MessageCircle className="size-4" /> ¿Dudas de talla o compatibilidad?
            Escríbenos
          </a>
        </div>
      </div>

      <section className="mt-16 bg-verde text-blanco">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12">
          <p className="text-xs font-bold uppercase tracking-wide text-white/60">
            Selección PACEFORM
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Por qué este producto
          </h2>
          <p className="mt-4 text-white/80 max-w-2xl leading-relaxed text-sm sm:text-base">
            {producto.porQueElegimos}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 mt-16">
        <h2 className="text-xl font-extrabold">Descripción</h2>
        <p className="mt-4 text-sm text-carbon/80 leading-relaxed">
          {producto.descripcion}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {producto.uso.map((u) => (
            <span
              key={u}
              className="px-4 py-2 rounded-full bg-white border-[1.5px] border-vidrio-borde text-xs font-bold capitalize"
            >
              {u}
            </span>
          ))}
        </div>
      </section>

      {complementarios.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 mt-16">
          <h2 className="text-xl font-extrabold mb-6">
            Productos complementarios
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {complementarios.map(
              (p) => p && <ProductCard key={p.slug} producto={p} />
            )}
          </div>
        </section>
      )}

      {relacionados.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 mt-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-xl font-extrabold">Sigue explorando</h2>
            <Link
              href="/tienda"
              className="text-sm font-bold text-verde hover:underline underline-offset-4"
            >
              Ver toda la tienda →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {relacionados.map((p) => (
              <ProductCard key={p.slug} producto={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
