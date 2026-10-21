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
  Check,
  Timer,
} from "lucide-react";
import {
  productos,
  productoPorSlug,
  categoriaPorSlug,
} from "@/data/productos";
import { formatCOP } from "@/lib/formato";
import { ENVIO, WHATSAPP } from "@/lib/config";
import SelectorProducto, {
  EstadoStock,
} from "@/components/commerce/selector-producto";
import GaleriaProducto from "@/components/commerce/galeria-producto";
import BarraCompraMovil from "@/components/commerce/barra-compra-movil";
import ProductCard from "@/components/commerce/product-card";
import GlassPanel from "@/components/ui/glass-panel";
import Badge from "@/components/ui/badge";

export default function ProductoContenido({ slug }: { slug: string }) {
  const [imagenColor, setImagenColor] = useState<string | undefined>(undefined);
  const [variante, setVariante] = useState<{
    talla: string | null;
    color: string | null;
  }>({ talla: null, color: null });
  const onColorChange = useCallback((img?: string) => setImagenColor(img), []);
  const onVariantChange = useCallback(
    (seleccion: { talla: string | null; color: string | null }) =>
      setVariante(seleccion),
    []
  );
  const irAlSelector = useCallback(() => {
    document
      .getElementById("selector-compra")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const producto = productoPorSlug(slug);
  if (!producto) return null;

  const confianza = [
    { icon: Truck, t: "Envío gratis" },
    { icon: ShieldCheck, t: "Contra entrega" },
    { icon: Package, t: "1–4 días según ciudad" },
    { icon: RotateCcw, t: "Cambios 5 días" },
    ...(producto.notaCompra?.includes("24")
      ? [{ icon: Timer, t: "Despacho 24 h" }]
      : []),
  ];

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
      <nav className="mb-6 flex min-w-0 flex-wrap items-center gap-1.5 text-xs font-semibold text-ceniza">
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
        <span className="min-w-0 break-words text-carbon">{producto.nombre}</span>
      </nav>

      <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <div className="min-w-0 self-start lg:sticky lg:top-20">
          <GaleriaProducto
            principal={producto.imagen}
            galeria={producto.galeria}
            alt={producto.nombre}
            imagenColor={imagenColor}
          />
        </div>

        <div className="min-w-0">
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

          <h1 className="mt-3 break-words text-2xl font-extrabold tracking-tight sm:text-3xl">
            {producto.nombre}
          </h1>
          <p className="mt-2 text-sm text-ceniza">{producto.descripcionCorta}</p>

          <div className="mt-5 flex items-end gap-3 flex-wrap">
            <p className="block text-3xl sm:text-4xl font-extrabold text-verde">
              {formatCOP(producto.precio)}
            </p>
            {producto.precioAntes && (
              <p className="text-base sm:text-lg font-bold text-ceniza line-through">
                {formatCOP(producto.precioAntes)}
              </p>
            )}
            {producto.precioAntes && producto.precioAntes > producto.precio && (
              <Badge tono="amarillo">
                -{Math.round((1 - producto.precio / producto.precioAntes) * 100)}
                %
              </Badge>
            )}
          </div>
          <p className="text-xs text-ceniza mt-1">
            Precio final · envío gratis · impuestos incluidos
          </p>

          <div className="mt-4 vidrio panel px-4 py-3 flex flex-wrap gap-x-4 gap-y-2">
            {confianza.map(({ icon: Icon, t }) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-carbon"
              >
                <Icon className="size-3.5 text-verde" /> {t}
              </span>
            ))}
          </div>

          <div className="mt-8" id="selector-compra">
            <SelectorProducto
              producto={producto}
              onColorChange={onColorChange}
              onVariantChange={onVariantChange}
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
                Pagas en efectivo cuando recibas tu pedido. Te contactamos para
                coordinar la entrega.
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

      <BarraCompraMovil
        producto={producto}
        talla={variante.talla}
        color={variante.color}
        onIntentar={irAlSelector}
      />
    </>
  );
}
