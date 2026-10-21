"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, Menu, X, ExternalLink, Leaf, Bike } from "lucide-react";
import { useCarrito } from "@/lib/carrito";
import { TIENDAS_FILIALES, INSTAGRAM } from "@/lib/config";
import { cn } from "@/lib/cn";
import Buscador from "@/components/commerce/buscador";
import IconoInstagram from "@/components/ui/icono-instagram";

const iconosFiliales = { natural: Leaf, ciclismo: Bike } as const;

const enlaces = [
  { href: "/tienda", label: "Tienda" },
  { href: "/categorias", label: "Categorías" },
  { href: "/kits", label: "Kits" },
  { href: "/wiki", label: "Wiki" },
  { href: "/noticias", label: "Noticias" },
  { href: "/comunidad", label: "Comunidad" },
];

export default function Header() {
  const pathname = usePathname();
  const { totalArticulos, setAbierto } = useCarrito();
  const [busquedaAbierta, setBusquedaAbierta] = useState(false);
  const [menuMovil, setMenuMovil] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMenuMovil(false);
      setBusquedaAbierta(false);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 vidrio-solido sin-reflejos">
        <div className="mx-auto max-w-7xl px-4 h-16 flex items-center gap-3">
          <button
            type="button"
            className="lg:hidden p-3 -ml-3 text-carbon"
            onClick={() => setMenuMovil((v) => !v)}
            aria-label={menuMovil ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuMovil}
            aria-controls="menu-movil"
          >
            {menuMovil ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link href="/" className="flex items-center shrink-0" aria-label="PACEFORM inicio">
            <Image
              src="/logo-paceform.png"
              alt="PACEFORM"
              width={160}
              height={54}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1 mx-4 flex-1">
            {enlaces.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className={cn(
                  "px-3 py-2 rounded-full text-sm font-semibold transition-colors",
                  pathname === e.href || pathname.startsWith(e.href + "/")
                    ? "bg-verde text-blanco"
                    : "text-carbon hover:bg-verde-50"
                )}
              >
                {e.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1 lg:hidden" />

          <div className="hidden lg:flex items-center gap-1 shrink-0">
            {TIENDAS_FILIALES.map((t) => {
              const Icono = iconosFiliales[t.tipo] ?? ExternalLink;
              return (
                <a
                  key={t.nombre}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-verde bg-verde-50 hover:bg-verde-100 transition-colors whitespace-nowrap"
                  title={t.descripcion}
                >
                  <Icono className="size-3.5" />
                  {t.nombre}
                  <span className="hidden xl:inline text-verde/60 font-semibold">
                    · {t.etiqueta}
                  </span>
                  <ExternalLink className="size-3 opacity-50" />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            <a
              href={INSTAGRAM.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex p-2.5 text-carbon hover:bg-verde-50 rounded-full transition-colors"
              aria-label={`Instagram ${INSTAGRAM.usuario}`}
              title={`@${INSTAGRAM.usuario}`}
            >
              <IconoInstagram className="size-5" />
            </a>
            <button
              type="button"
              onClick={() => setBusquedaAbierta(true)}
              className="p-2.5 text-carbon hover:bg-verde-50 rounded-full transition-colors"
              aria-label="Buscar"
            >
              <Search className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => setAbierto(true)}
              className="relative p-2.5 text-carbon hover:bg-verde-50 rounded-full transition-colors"
              aria-label={`Carrito, ${totalArticulos} artículos`}
            >
              <ShoppingBag className="size-5" />
              {totalArticulos > 0 && (
                <span className="absolute -top-0.5 -right-0.5 size-5 rounded-full bg-verde text-blanco text-[10px] font-bold flex items-center justify-center">
                  {totalArticulos}
                </span>
              )}
            </button>
          </div>
        </div>

        {menuMovil && (
          <div
            id="menu-movil"
            className="lg:hidden border-t border-vidrio-borde px-4 py-3 max-h-[calc(100dvh-64px)] overflow-y-auto animar-entrada"
          >
            <nav className="flex flex-col gap-1">
              {enlaces.map((e) => (
                <Link
                  key={e.href}
                  href={e.href}
                  className={cn(
                    "px-4 py-3 rounded-2xl text-sm font-semibold min-h-11 flex items-center",
                    pathname === e.href
                      ? "bg-verde text-blanco"
                      : "text-carbon hover:bg-verde-50"
                  )}
                >
                  {e.label}
                </Link>
              ))}
              <Link
                href="/checkout"
                className="px-4 py-3 rounded-2xl text-sm font-semibold text-carbon hover:bg-verde-50 min-h-11 flex items-center"
              >
                Finalizar compra
              </Link>
            </nav>

            <p className="mt-4 mb-2 px-1 text-[10px] font-bold uppercase tracking-wide text-ceniza">
              Nuestras tiendas
            </p>
            <div className="grid grid-cols-2 gap-2">
              {TIENDAS_FILIALES.map((t) => {
                const Icono = iconosFiliales[t.tipo] ?? ExternalLink;
                return (
                  <a
                    key={t.nombre}
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vidrio panel flex flex-col gap-1 py-3 px-3 text-carbon min-h-11"
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold">
                      <Icono className="size-4 text-verde" />
                      {t.nombre}
                    </span>
                    <span className="text-[10px] text-ceniza leading-tight">
                      {t.etiqueta}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-2">
              <a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                className="vidrio panel flex items-center gap-2 py-3 px-3 text-carbon min-h-11 text-xs font-extrabold"
              >
                <IconoInstagram className="size-4 text-verde" />
                @{INSTAGRAM.usuario}
              </a>
            </div>
          </div>
        )}
      </header>

      {busquedaAbierta && <Buscador onCerrar={() => setBusquedaAbierta(false)} />}
    </>
  );
}
