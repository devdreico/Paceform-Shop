import { Suspense } from "react";
import GlassPanel from "@/components/ui/glass-panel";
import PedidoExitoCliente from "./pedido-exito-cliente";

export const metadata = {
  title: "Pedido registrado",
};

async function ContenidoExito({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const sp = await searchParams;

  return (
    <PedidoExitoCliente pedidoId={sp.id ?? ""} />
  );
}

export default function ExitoPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <Suspense
        fallback={
          <GlassPanel solido className="p-8 text-center">
            <p className="text-sm text-ceniza">Verificando el pedido…</p>
          </GlassPanel>
        }
      >
        <ContenidoExito searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
