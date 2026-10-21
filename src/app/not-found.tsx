import Link from "next/link";
import { ArrowRight, Home, Store } from "lucide-react";
import GlassPanel from "@/components/ui/glass-panel";
import Boton from "@/components/ui/boton";

export const metadata = {
  title: "Página no encontrada",
  description: "Esta página no existe en PACEFORM.",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <GlassPanel solido className="p-8 sm:p-10 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-paceform.png"
          alt="PACEFORM"
          className="h-10 w-auto mx-auto"
        />
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-verde">
          Error 404
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold">
          Esta página no existe
        </h1>
        <p className="mt-3 text-sm text-ceniza leading-relaxed max-w-sm mx-auto">
          Puede que el enlace esté desactualizado o que el producto o artículo
          ya no esté disponible. Volvamos a lo importante: tu próximo kilómetro.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Boton href="/" className="px-7">
            <Home className="size-4" /> Ir al inicio
          </Boton>
          <Link
            href="/tienda"
            className="btn-secundario px-7 py-3.5 text-sm inline-flex items-center justify-center gap-2"
          >
            <Store className="size-4" /> Ver tienda{" "}
            <ArrowRight className="size-3.5 flecha-slide" />
          </Link>
        </div>
      </GlassPanel>
    </div>
  );
}
