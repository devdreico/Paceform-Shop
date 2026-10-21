"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, ShoppingBag, Menu, X, ExternalLink, Newspaper, BookOpen, Users } from "lucide-react";
import { useCarrito } from "@/lib/carrito";
import { TIENDAS_FILIALES } from "@/lib/config";
import { cn } from "@/lib/cn";
import Buscador from "@/components/commerce/buscador";

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
            className="lg:hidden p-2 -ml-2 text-carbon"
            onClick={() => setMenuMovil((v) => !v)}
            aria-label={menuMovil ? "Cerrar menú" : "Abrir menú"}
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

          <div className="hidden xl:flex items-center gap-1 shrink-0">
            {TIENDAS_FILIALES.map((t) => (
              <a
                key={t.nombre}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-verde bg-verde-50 hover:bg-verde-100 transition-colors whitespace-nowrap"
                title={t.descripcion}
              >
                {t.nombre}
                <ExternalLink className="size-3" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
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
          <div className="lg:hidden border-t border-vidrio-borde px-4 py-3 animar-entrada">
            <nav className="flex flex-col gap-1">
              {enlaces.map((e) => (
                <Link
                  key={e.href}
                  href={e.href}
                  className={cn(
                    "px-4 py-3 rounded-2xl text-sm font-semibold",
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
                className="px-4 py-3 rounded-2xl text-sm font-semibold text-carbon hover:bg-verde-50"
              >
                Finalizar compra
              </Link>
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {TIENDAS_FILIALES.map((t) => (
                <a
                  key={t.nombre}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vidrio panel flex flex-col items-center gap-1 py-3 text-[11px] font-semibold text-carbon"
                >
                  <ExternalLink className="size-4 text-verde" />
                  {t.nombre}
                </a>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                { icon: Newspaper, label: "Noticias", href: "/noticias" },
                { icon: BookOpen, label: "Wiki", href: "/wiki" },
                { icon: Users, label: "Comunidad", href: "/comunidad" },
              ].map(({ icon: Icon, label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="vidrio panel flex flex-col items-center gap-1 py-3 text-[11px] font-semibold text-carbon"
                >
                  <Icon className="size-4 text-verde" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {busquedaAbierta && <Buscador onCerrar={() => setBusquedaAbierta(false)} />}
    </>
  );
}
