import { NextResponse } from "next/server";
import { registrarContraEntregaEnFormspree } from "@/lib/formspree";
import { validarPedidoContraEntrega } from "@/lib/validacion-pedido";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "La solicitud no contiene JSON válido." }, { status: 400 });
  }

  const resultado = validarPedidoContraEntrega(body);
  if (!resultado.ok) {
    return NextResponse.json({ error: resultado.error }, { status: 400 });
  }

  try {
    await registrarContraEntregaEnFormspree(
      resultado.pedido.items,
      resultado.pedido.envio,
      resultado.pedido.id
    );
    return NextResponse.json({ aceptado: true, pedidoId: resultado.pedido.id });
  } catch (error) {
    if (error instanceof Error && error.message === "FORMULARIO_TIMEOUT") {
      return NextResponse.json(
        { error: "FORMULARIO_TIMEOUT" },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: "Formspree no confirmó el pedido." },
      { status: 502 }
    );
  }
}