import Link from "next/link";
import Image from "next/image";
import { Camera, MessageCircle, Mail } from "lucide-react";
import { WHATSAPP } from "@/lib/config";

const columnas = [
  {
    titulo: "Tienda",
    enlaces: [
      { label: "Todo el catálogo", href: "/tienda" },
      { label: "Categorías", href: "/categorias" },
      { label: "Kits de entrenamiento", href: "/kits" },
      { label: "Carrito", href: "/carrito" },
    ],
  },
  {
    titulo: "Contenido",
    enlaces: [
      { label: "Wiki de running", href: "/wiki" },
      { label: "Noticias", href: "/noticias" },
      { label: "Comunidad", href: "/comunidad" },
    ],
  },
  {
    titulo: "Ayuda",
    enlaces: [
      { label: "Envíos y tiempos", href: "/envios-cambios" },
      { label: "Cambios y devoluciones", href: "/envios-cambios" },
      { label: "Preguntas frecuentes", href: "/faq" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-carbon text-blanco mt-16">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="bg-blanco rounded-2xl inline-flex px-4 py-3">
            <Image
              src="/logo-paceform.png"
              alt="PACEFORM"
              width={150}
              height={50}
              className="h-8 w-auto"
            />
          </div>
          <p className="mt-4 text-sm text-white/70 max-w-sm leading-relaxed">
            Equipamiento de running seleccionado para Colombia. Envío gratis a
            todo el país, contra entrega o pago seguro con Mercado Pago.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP.numero}?text=${encodeURIComponent(WHATSAPP.mensaje)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="vidrio-oscuro panel size-11 flex items-center justify-center text-blanco hover:bg-white/15 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="size-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="vidrio-oscuro panel size-11 flex items-center justify-center text-blanco hover:bg-white/15 transition-colors"
              aria-label="Instagram"
            >
              <Camera className="size-5" />
            </a>
            <a
              href="mailto:hola@paceform.co"
              className="vidrio-oscuro panel size-11 flex items-center justify-center text-blanco hover:bg-white/15 transition-colors"
              aria-label="Email"
            >
              <Mail className="size-5" />
            </a>
          </div>
        </div>

        {columnas.map((col) => (
          <div key={col.titulo}>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-blanco">
              {col.titulo}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.enlaces.map((e) => (
                <li key={e.label + e.href}>
                  <Link
                    href={e.href}
                    className="text-sm text-white/65 hover:text-blanco transition-colors"
                  >
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© 2026 PACEFORM · Equipamiento para correr</p>
          <p>Información previa a la compra según Ley 1480 de 2011 (Colombia)</p>
        </div>
      </div>
    </footer>
  );
}
