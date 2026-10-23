import { municipioPerteneceA } from "./geografia-colombia";
import {
  CANTIDAD_MAXIMA_POR_VARIANTE,
  itemCarritoValido,
} from "./validacion-carrito";
import type { DatosEnvio, ItemCarrito } from "./tipos";

type PedidoValidado = {
  id: string;
  items: ItemCarrito[];
  envio: DatosEnvio;
};

type ResultadoValidacion =
  | { ok: true; pedido: PedidoValidado }
  | { ok: false; error: string };

function esRegistro(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

function texto(valor: unknown, maximo: number) {
  return typeof valor === "string" ? valor.trim().slice(0, maximo) : "";
}

export function validarPedidoContraEntrega(valor: unknown): ResultadoValidacion {
  if (!esRegistro(valor)) return { ok: false, error: "Pedido inválido." };

  const id = texto(valor.pedidoId, 36);
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return { ok: false, error: "La referencia del pedido no es válida." };
  }
  if (
    !Array.isArray(valor.items) ||
    valor.items.length < 1 ||
    valor.items.length > 30 ||
    !valor.items.every(itemCarritoValido)
  ) {
    return { ok: false, error: "Revisa los productos, tallas, colores y cantidades." };
  }
  if (
    valor.items.some(
      (item) => item.cantidad > CANTIDAD_MAXIMA_POR_VARIANTE
    )
  ) {
    return { ok: false, error: "La cantidad máxima por variante es 99." };
  }
  if (!esRegistro(valor.envio)) {
    return { ok: false, error: "Faltan los datos de envío." };
  }

  const envio: DatosEnvio = {
    nombre: texto(valor.envio.nombre, 120),
    telefono: texto(valor.envio.telefono, 10),
    email: texto(valor.envio.email, 254),
    departamento: texto(valor.envio.departamento, 80),
    municipio: texto(valor.envio.municipio, 100),
    direccion: texto(valor.envio.direccion, 250),
    barrio: texto(valor.envio.barrio, 100),
    notas: texto(valor.envio.notas, 500),
  };

  if (!envio.nombre || !envio.direccion || !envio.barrio) {
    return { ok: false, error: "Completa el nombre, barrio y dirección." };
  }
  if (!/^3\d{9}$/.test(envio.telefono)) {
    return { ok: false, error: "El celular debe tener 10 dígitos y comenzar por 3." };
  }
  if (envio.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(envio.email)) {
    return { ok: false, error: "Revisa el correo electrónico." };
  }
  if (!municipioPerteneceA(envio.departamento, envio.municipio)) {
    return { ok: false, error: "Selecciona un departamento y municipio válidos." };
  }

  return {
    ok: true,
    pedido: { id, items: valor.items, envio },
  };
}