import { Truck, ShieldCheck, MapPin } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-verde text-blanco text-[11px] sm:text-xs font-semibold">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center gap-4 sm:gap-8 overflow-x-auto scroll-oculto">
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <Truck className="size-3.5 shrink-0" aria-hidden />
          Envío gratis en todo Colombia
        </span>
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap opacity-90">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          Ciudades principales 1–2 días · Resto 3–4 días
        </span>
        <span className="hidden md:inline-flex items-center gap-1.5 whitespace-nowrap opacity-90">
          <ShieldCheck className="size-3.5 shrink-0" aria-hidden />
          Contra entrega o Mercado Pago
        </span>
      </div>
    </div>
  );
}
