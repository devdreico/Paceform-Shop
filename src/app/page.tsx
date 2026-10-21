import Link from "next/link";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  MessageCircle,
  RefreshCcw,
  BookOpen,
  Newspaper,
  Users,
  Zap,
  Shirt,
  Droplets,
  Moon,
  HeartPulse,
  Backpack,
} from "lucide-react";
import { categorias, productos, productoPorSlug } from "@/data/productos";
import { kits } from "@/data/kits";
import { wiki } from "@/data/wiki";
import { noticias } from "@/data/noticias";
import { MARCA, WHATSAPP } from "@/lib/config";
import Boton from "@/components/ui/boton";
import GlassPanel from "@/components/ui/glass-panel";
import ProductCard from "@/components/commerce/product-card";
import Badge from "@/components/ui/badge";

const iconos: Record<string, React.ElementType> = {
  zapato: Zap,
  camiseta: Shirt,
  agua: Droplets,
  luz: Moon,
  recuperacion: HeartPulse,
  accesorio: Backpack,
};

export default function HomePage() {
  const destacados = productos;
  const adizero = productoPorSlug("adidas-adizero");
  const recientesWiki = wiki.slice(0, 3);
  const recientesNoticias = noticias.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-verde text-blanco overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" aria-hidden>
          <div className="absolute -top-32 -right-32 size-[520px] rounded-full border-[40px] border-blanco" />
          <div className="absolute bottom-10 -left-20 size-[300px] rounded-full border-[30px] border-blanco" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge tono="claro" className="mb-5">
              {MARCA.tagline}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              MEJOR
              <br />
              EQUIPAMIENTO.
              <br />
              <span className="text-white/70">MÁS KILÓMETROS.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/75 max-w-lg leading-relaxed">
              {MARCA.mensaje}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Boton href="/tienda" variant="claro" className="px-8">
                Explorar equipamiento <ArrowRight className="size-4" />
              </Boton>
              <Boton
                href="/wiki"
                variant="secundario"
                className="px-8 border-white/40 text-blanco hover:bg-white/10"
              >
                Guía de running
              </Boton>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-semibold text-white/60">
              <span className="inline-flex items-center gap-2">
                <Truck className="size-4" /> Envío gratis Colombia
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4" /> Contra entrega
              </span>
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="size-4" /> Soporte WhatsApp
              </span>
            </div>
          </div>

          <div className="relative">
            <GlassPanel oscuro className="p-4 sm:p-6">
              <div className="rounded-[18px] overflow-hidden bg-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/productos/adidas-adizero.svg"
                  alt="Adidas Adizero equipamiento de running"
                  className="w-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-white/50">
                    Destacado
                  </p>
                  <p className="text-lg font-extrabold mt-1">Adidas Adizero</p>
                  <p className="text-xs text-white/60 mt-0.5">
                    Tallas 37–43 · 6 colores
                  </p>
                </div>
                <Link
                  href="/tienda/adidas-adizero"
                  className="shrink-0 bg-blanco text-verde rounded-full px-5 py-2.5 text-sm font-bold hover:bg-verde-50 transition-colors"
                >
                  Ver producto
                </Link>
              </div>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-verde">
              Explora por necesidad
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Encuentra tu siguiente ventaja
            </h2>
          </div>
          <Link
            href="/categorias"
            className="text-sm font-bold text-verde hover:underline underline-offset-4 shrink-0"
          >
            Ver todas
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categorias.map((c) => {
            const Icono = iconos[c.icono] ?? Zap;
            return (
              <Link
                key={c.slug}
                href={`/categorias/${c.slug}`}
                className="vidrio panel p-5 flex flex-col gap-3 hover:border-verde/30 transition-colors group"
              >
                <span className="size-11 rounded-2xl bg-verde text-blanco flex items-center justify-center">
                  <Icono className="size-5" />
                </span>
                <p className="text-sm font-extrabold leading-tight group-hover:text-verde transition-colors">
                  {c.nombre}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-verde">
              Catálogo
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Productos destacados
            </h2>
          </div>
          <Link
            href="/tienda"
            className="text-sm font-bold text-verde hover:underline underline-offset-4 shrink-0"
          >
            Ir a la tienda
          </Link>
        </div>
        {destacados.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {destacados.map((p) => (
              <ProductCard key={p.slug} producto={p} />
            ))}
            <div className="vidrio panel p-6 flex flex-col justify-center items-start gap-3 border-dashed">
              <p className="text-sm font-extrabold">Sumando productos…</p>
              <p className="text-xs text-ceniza leading-relaxed">
                Estamos incorporando más equipamiento de running seleccionado.
                Mira la tienda o escríbenos por WhatsApp si buscas algo
                puntual.
              </p>
              <Boton
                href={`https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(WHATSAPP.mensaje)}`}
                external
                variant="secundario"
                className="mt-1"
              >
                <MessageCircle className="size-4" /> WhatsApp
              </Boton>
            </div>
          </div>
        ) : null}
      </section>

      {/* SELECCIÓN PACEFORM */}
      {adizero && (
        <section className="bg-carbon text-blanco">
          <div className="mx-auto max-w-7xl px-4 py-16 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="vidrio-oscuro panel p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={adizero.imagen}
                alt={adizero.nombre}
                className="w-full rounded-[18px]"
              />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-white/50">
                Selección PACEFORM
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                Por qué elegimos el Adidas Adizero
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed text-sm sm:text-base">
                {adizero.porQueElegimos}
              </p>
              <ul className="mt-6 space-y-2.5">
                {adizero.especificaciones.slice(0, 4).map((e) => (
                  <li
                    key={e.etiqueta}
                    className="flex items-start gap-3 text-sm text-white/80"
                  >
                    <span className="mt-1.5 size-1.5 rounded-full bg-white/60 shrink-0" />
                    <span>
                      <strong className="text-blanco">{e.etiqueta}:</strong>{" "}
                      {e.valor}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Boton href={`/tienda/${adizero.slug}`} variant="claro">
                  Ver ficha del producto <ArrowRight className="size-4" />
                </Boton>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* KITS */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-verde">
              Combina y ahorra tiempo
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Kits de entrenamiento
            </h2>
          </div>
          <Link
            href="/kits"
            className="text-sm font-bold text-verde hover:underline underline-offset-4 shrink-0"
          >
            Ver kits
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kits.map((k) => (
            <GlassPanel key={k.slug} className="p-5 flex flex-col gap-3 h-full">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold">{k.nombre}</h3>
                {k.estado === "disponible" ? (
                  <Badge>Disponible</Badge>
                ) : (
                  <Badge tono="claro">En armación</Badge>
                )}
              </div>
              <p className="text-xs text-ceniza leading-relaxed flex-1">
                {k.descripcion}
              </p>
              {k.estado === "disponible" && k.productos.length > 0 ? (
                <Link
                  href={`/tienda/${k.productos[0]}`}
                  className="text-sm font-bold text-verde hover:underline underline-offset-4"
                >
                  Ver kit →
                </Link>
              ) : (
                <span className="text-xs font-semibold text-ceniza">
                  Próximamente
                </span>
              )}
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* CONTENIDO ÚTIL */}
      <section className="mx-auto max-w-7xl px-4 pb-16 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-verde inline-flex items-center gap-1.5">
                <BookOpen className="size-3.5" /> Wiki
              </p>
              <h2 className="text-2xl font-extrabold mt-1">Aprende a correr mejor</h2>
            </div>
            <Link
              href="/wiki"
              className="text-sm font-bold text-verde hover:underline underline-offset-4 shrink-0"
            >
              Ver wiki
            </Link>
          </div>
          <div className="space-y-3">
            {recientesWiki.map((a) => (
              <Link
                key={a.slug}
                href={`/wiki/${a.slug}`}
                className="vidrio panel p-5 flex items-start gap-4 hover:border-verde/30 transition-colors"
              >
                <span className="size-10 rounded-2xl bg-verde-50 text-verde flex items-center justify-center shrink-0">
                  <BookOpen className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-extrabold leading-tight">{a.titulo}</p>
                  <p className="text-xs text-ceniza mt-1 line-clamp-2">
                    {a.resumen}
                  </p>
                  <p className="text-[11px] font-semibold text-verde mt-2">
                    {a.tiempoLectura} min de lectura · {a.seccion}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-verde inline-flex items-center gap-1.5">
                <Newspaper className="size-3.5" /> Noticias
              </p>
              <h2 className="text-2xl font-extrabold mt-1">En el mundo del running</h2>
            </div>
            <Link
              href="/noticias"
              className="text-sm font-bold text-verde hover:underline underline-offset-4 shrink-0"
            >
              Ver noticias
            </Link>
          </div>
          <div className="space-y-3">
            {recientesNoticias.map((n) => (
              <Link
                key={n.slug}
                href={`/noticias/${n.slug}`}
                className="vidrio panel p-5 flex items-start gap-4 hover:border-verde/30 transition-colors"
              >
                <span className="size-10 rounded-2xl bg-verde-50 text-verde flex items-center justify-center shrink-0">
                  <Newspaper className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-extrabold leading-tight">{n.titulo}</p>
                  <p className="text-xs text-ceniza mt-1 line-clamp-2">
                    {n.resumen}
                  </p>
                  <p className="text-[11px] font-semibold text-verde mt-2">
                    {n.categoria}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMUNIDAD + CONFIANZA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 grid gap-4 lg:grid-cols-3">
        <Link
          href="/comunidad"
          className="vidrio panel p-6 flex flex-col gap-3 hover:border-verde/30 transition-colors"
        >
          <span className="size-11 rounded-2xl bg-verde text-blanco flex items-center justify-center">
            <Users className="size-5" />
          </span>
          <h3 className="text-base font-extrabold">Comunidad PACEFORM</h3>
          <p className="text-xs text-ceniza leading-relaxed">
            Conversaciones sobre entrenamiento, ciudades y equipamiento. Comparte
            tu experiencia con otros corredores del país.
          </p>
          <span className="text-sm font-bold text-verde mt-auto">
            Entrar a la comunidad →
          </span>
        </Link>

        <GlassPanel className="p-6 flex flex-col gap-3">
          <span className="size-11 rounded-2xl bg-verde text-blanco flex items-center justify-center">
            <Truck className="size-5" />
          </span>
          <h3 className="text-base font-extrabold">Envío gratis a todo Colombia</h3>
          <p className="text-xs text-ceniza leading-relaxed">
            Ciudades principales 1 a 2 días hábiles. Resto del país 3 a 4 días
            hábiles. Sin costo de envío, siempre.
          </p>
          <Link
            href="/envios-cambios"
            className="text-sm font-bold text-verde hover:underline underline-offset-4 mt-auto"
          >
            Ver tiempos →
          </Link>
        </GlassPanel>

        <GlassPanel className="p-6 flex flex-col gap-3">
          <span className="size-11 rounded-2xl bg-verde text-blanco flex items-center justify-center">
            <RefreshCcw className="size-5" />
          </span>
          <h3 className="text-base font-extrabold">Compra segura y transparente</h3>
          <p className="text-xs text-ceniza leading-relaxed">
            Contra entrega o Mercado Pago. Precio final visible, cambios y
            devoluciones con condiciones claras desde el primer clic.
          </p>
          <Link
            href="/faq"
            className="text-sm font-bold text-verde hover:underline underline-offset-4 mt-auto"
          >
            Ver preguntas frecuentes →
          </Link>
        </GlassPanel>
      </section>
    </>
  );
}
