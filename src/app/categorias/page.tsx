import Link from "next/link";
import { categorias } from "@/data/productos";
import { Zap, Shirt, Droplets, Moon, HeartPulse, Backpack } from "lucide-react";

const iconos: Record<string, React.ElementType> = {
  zapato: Zap,
  camiseta: Shirt,
  agua: Droplets,
  luz: Moon,
  recuperacion: HeartPulse,
  accesorio: Backpack,
};

export const metadata = {
  title: "Categorías",
  description: "Equipamiento de running organizado por necesidad de entrenamiento.",
};

export default function CategoriasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-wide text-verde">
        Organizado por necesidad
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">Categorías</h1>
      <p className="mt-2 text-sm text-ceniza max-w-xl">
        Cada zona del catálogo responde a un tipo de entrenamiento. Elige por
        cómo corres, no solo por el nombre del producto.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorias.map((c) => {
          const Icono = iconos[c.icono] ?? Zap;
          return (
            <Link
              key={c.slug}
              href={`/categorias/${c.slug}`}
              className="vidrio panel p-6 flex flex-col gap-4 hover:border-verde/30 transition-colors group"
            >
              <span className="size-12 rounded-2xl bg-verde text-blanco flex items-center justify-center">
                <Icono className="size-5" />
              </span>
              <div>
                <h2 className="text-lg font-extrabold group-hover:text-verde transition-colors">
                  {c.nombre}
                </h2>
                <p className="mt-1.5 text-xs text-ceniza leading-relaxed">
                  {c.descripcion}
                </p>
              </div>
              <span className="text-sm font-bold text-verde mt-auto">
                Explorar →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
