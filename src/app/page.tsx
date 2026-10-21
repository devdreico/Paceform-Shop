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
  Timer,
} from "lucide-react";
import { categorias, productos, productoPorSlug } from "@/data/productos";
import { kits } from "@/data/kits";
import { wiki } from "@/data/wiki";
import { noticias } from "@/data/noticias";
import { WHATSAPP, INSTAGRAM } from "@/lib/config";
import Boton from "@/components/ui/boton";
import GlassPanel from "@/components/ui/glass-panel";
import ProductCard from "@/components/commerce/product-card";
import Badge from "@/components/ui/badge";
import HeroAnimado, { RevealSeccion } from "@/components/sections/hero-animado";
import IconoInstagram from "@/components/ui/icono-instagram";

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
      <HeroAnimado />

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
                className="vidrio panel tarjeta-hover p-5 flex flex-col gap-3 group"
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
            className="text-sm font-bold text-verde hover:underline underline-offset-4 shrink-0 inline-flex items-center gap-1"
          >
            Ir a la tienda <ArrowRight className="size-3.5 flecha-slide" />
          </Link>
        </div>
        {destacados.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {destacados.map((p) => (
              <ProductCard key={p.slug} producto={p} />
            ))}
            <div className="vidrio panel p-6 flex flex-col justify-center items-start gap-3 border-dashed">
              <p className="text-sm font-extrabold">Sumando productos…</p>
              <p className="text-xs text-ceniza leading-relaxed">
                Estamos incorporando más equipamiento de running seleccionado.
                Escríbenos por WhatsApp si buscas algo puntual.
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
        <RevealSeccion className="bg-carbon text-blanco">
          <div className="mx-auto max-w-7xl px-4 py-16 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="vidrio-oscuro panel p-4 float-suave">
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
                {adizero.beneficios?.slice(0, 4).map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm text-white/80"
                  >
                    <span className="mt-1.5 size-1.5 rounded-full bg-white/60 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/60">
                <span className="inline-flex items-center gap-1.5">
                  <Timer className="size-4" /> Despacho 24 h
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="size-4" /> Stock real
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Boton href={`/tienda/${adizero.slug}`} variant="claro">
                  Ver ficha del producto <ArrowRight className="size-4 flecha-slide" />
                </Boton>
              </div>
            </div>
          </div>
        </RevealSeccion>
      )}

      {/* LIFESTYLE / COMUNIDAD */}
      <RevealSeccion className="bg-carbon text-blanco border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/50 inline-flex items-center gap-1.5">
              <Users className="size-3.5" /> Comunidad
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Corre a tu ritmo
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed text-sm sm:text-base max-w-md">
              Rutas de ciudad, salidas al amanecer y entrenamientos que sí
              caben en la semana. El equipamiento correcto acompaña tu ritmo,
              no lo dicta.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/comunidad"
                className="text-sm font-bold text-blanco bg-verde-700 hover:bg-verde-800 rounded-full px-5 py-2.5 inline-flex items-center gap-1 transition-colors"
              >
                Conocer la comunidad{" "}
                <ArrowRight className="size-3.5 flecha-slide" />
              </Link>
              <Link
                href="/tienda"
                className="text-sm font-bold text-blanco border border-white/30 hover:bg-white/10 rounded-full px-5 py-2.5 inline-flex items-center gap-1 transition-colors"
              >
                Ver equipamiento
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[22px] overflow-hidden border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/lifestyle/corredor-4.jpg"
                alt="Corredor entrenando en la ciudad"
                loading="lazy"
                className="w-full h-full aspect-[3/4] object-cover"
              />
            </div>
            <div className="rounded-[22px] overflow-hidden border border-white/10 mt-6 sm:mt-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/lifestyle/corredor-5.jpg"
                alt="Corredora en su ritmo de entrenamiento"
                loading="lazy"
                className="w-full h-full aspect-[3/4] object-cover"
              />
            </div>
          </div>
        </div>
      </RevealSeccion>

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
            <GlassPanel key={k.slug} className="p-5 flex flex-col gap-3 h-full tarjeta-hover">
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
                  className="text-sm font-bold text-verde hover:underline underline-offset-4 inline-flex items-center gap-1"
                >
                  Ver kit <ArrowRight className="size-3.5 flecha-slide" />
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
                className="vidrio panel tarjeta-hover p-5 flex items-start gap-4"
              >
                <span className="size-10 rounded-2xl bg-verde-50 text-verde flex items-center justify-center shrink-0">
                  <BookOpen className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-extrabold leading-tight">{a.titulo}</p>
                  <p className="text-xs text-ceniza mt-1 line-clamp-2">{a.resumen}</p>
                  <p className="text-[11px] font-semibold text-verde mt-2">
                    {a.tiempoLectura} min · {a.seccion}
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
                className="vidrio panel tarjeta-hover p-5 flex items-start gap-4"
              >
                <span className="size-10 rounded-2xl bg-verde-50 text-verde flex items-center justify-center shrink-0">
                  <Newspaper className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-extrabold leading-tight">{n.titulo}</p>
                  <p className="text-xs text-ceniza mt-1 line-clamp-2">{n.resumen}</p>
                  <p className="text-[11px] font-semibold text-verde mt-2">
                    {n.categoria}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMUNIDAD + IG + CONFIANZA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 grid gap-4 lg:grid-cols-3">
        <Link
          href="/comunidad"
          className="vidrio panel tarjeta-hover p-6 flex flex-col gap-3"
        >
          <span className="size-11 rounded-2xl bg-verde text-blanco flex items-center justify-center">
            <Users className="size-5" />
          </span>
          <h3 className="text-base font-extrabold">Comunidad PACEFORM</h3>
          <p className="text-xs text-ceniza leading-relaxed">
            Conversaciones sobre entrenamiento, ciudades y equipamiento. Comparte
            tu experiencia con otros corredores del país.
          </p>
          <span className="text-sm font-bold text-verde mt-auto inline-flex items-center gap-1">
            Entrar <ArrowRight className="size-3.5 flecha-slide" />
          </span>
        </Link>

        <a
          href={INSTAGRAM.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-verde text-blanco panel tarjeta-hover p-6 flex flex-col gap-3"
        >
          <span className="size-11 rounded-2xl bg-white/15 flex items-center justify-center">
            <IconoInstagram className="size-5" />
          </span>
          <h3 className="text-base font-extrabold">@{INSTAGRAM.usuario}</h3>
          <p className="text-xs text-white/70 leading-relaxed">
            Síguenos en Instagram para lanzamientos, tips de entrenamiento y
            contenido de la comunidad.
          </p>
          <span className="text-sm font-bold mt-auto inline-flex items-center gap-1">
            Seguir en Instagram <ArrowRight className="size-3.5 flecha-slide" />
          </span>
        </a>

        <GlassPanel className="p-6 flex flex-col gap-3 tarjeta-hover">
          <span className="size-11 rounded-2xl bg-verde text-blanco flex items-center justify-center">
            <RefreshCcw className="size-5" />
          </span>
          <h3 className="text-base font-extrabold">Compra segura y transparente</h3>
          <p className="text-xs text-ceniza leading-relaxed">
            Contra entrega o Mercado Pago. Envío gratis, precio final visible y
            cambios con condiciones claras desde el primer clic.
          </p>
          <Link
            href="/envios-cambios"
            className="text-sm font-bold text-verde hover:underline underline-offset-4 mt-auto inline-flex items-center gap-1"
          >
            Ver condiciones <ArrowRight className="size-3.5 flecha-slide" />
          </Link>
        </GlassPanel>
      </section>

      {/* Franja cierre */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="vidrio panel p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-lg sm:text-xl font-extrabold">
              ¿Listo para tu próximo kilómetro?
            </p>
            <p className="text-sm text-ceniza mt-1">
              Envío gratis a todo Colombia · Contra entrega disponible
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Boton href="/tienda" className="px-7">
              Ver tienda <ArrowRight className="size-4 flecha-slide" />
            </Boton>
            <Boton
              href={`https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(WHATSAPP.mensaje)}`}
              external
              variant="secundario"
              className="px-7"
            >
              <MessageCircle className="size-4" /> WhatsApp
            </Boton>
          </div>
        </div>
      </section>

      {/* Confianza rápida */}
      <section className="mx-auto max-w-7xl px-4 pb-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Truck, t: "Envío gratis", d: "Todo Colombia" },
          { icon: ShieldCheck, t: "Pago seguro", d: "MP o contra entrega" },
          { icon: RefreshCcw, t: "Cambios 5 días", d: "Por falla o error" },
          { icon: MessageCircle, t: "Soporte real", d: `WhatsApp ${WHATSAPP.visible}` },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="vidrio panel p-4 flex items-start gap-3">
            <Icon className="size-5 text-verde shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-extrabold">{t}</p>
              <p className="text-[11px] text-ceniza mt-0.5">{d}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
