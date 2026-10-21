export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://paceform.presentto.online";

export const MARCA = {
  nombre: "PACEFORM",
  tagline: "RUNNING EQUIPMENT",
  eslogan: "MEJOR EQUIPAMIENTO. MÁS KILÓMETROS.",
  mensaje:
    "Encuentra el equipo que acompaña cada entrenamiento, cada ruta y cada nuevo objetivo.",
};

export const TIENDAS_FILIALES = [
  {
    nombre: "Botané",
    descripcion: "Productos naturistas y de salud",
    url: "https://botane.presentto.online",
    etiqueta: "Nutrición natural",
  },
  {
    nombre: "Vexna Bike",
    descripcion: "Tienda de bike & running",
    url: "https://vexna.presentto.online",
    etiqueta: "Ciclismo y running",
  },
];

export const MERCADO_PAGO = {
  linkGenerico:
    process.env.NEXT_PUBLIC_MP_LINK ??
    "https://link.mercadopago.com.co/swholesales",
  instrucciones: [
    "Verifica el monto exacto del producto antes de pagar.",
    "En el concepto o referencia escribe: PACEFORM + nombre del producto.",
    "Envíanos el comprobante de pago por WhatsApp para confirmar tu pedido.",
  ],
};

export const FORMSPREE = {
  contraEntrega: process.env.NEXT_PUBLIC_FORMSPREE_CONTRAENTREGA ?? "https://formspree.io/f/xnpjkgpa",
  mercadoPago: process.env.NEXT_PUBLIC_FORMSPREE_MERCADOPAGO ?? "https://formspree.io/f/xrpewyew",
};

export const WHATSAPP = {
  numero: "573144572008",
  visible: "314 457 2008",
  mensaje:
    "Hola PACEFORM, necesito ayuda con un producto o mi pedido.",
};

export const INSTAGRAM = {
  usuario: "paceform.shop",
  url: "https://instagram.com/paceform.shop",
};

export const ENVIO = {
  gratis: true,
  principales: {
    ciudades: [
      "Bogotá",
      "Medellín",
      "Cali",
      "Barranquilla",
      "Bucaramanga",
      "Cartagena",
      "Santa Marta",
      "Pereira",
      "Manizales",
      "Ibagué",
      "Neiva",
      "Villavicencio",
      "Valledupar",
      "Montería",
      "Sincelejo",
    ],
    dias: "1 a 2 días hábiles",
  },
  resto: {
    dias: "3 a 4 días hábiles",
  },
};

export function diasEstimados(ciudad: string): string {
  const normalizada = ciudad.trim().toLowerCase();
  const esPrincipal = ENVIO.principales.ciudades.some(
    (c) => c.toLowerCase() === normalizada
  );
  return esPrincipal ? ENVIO.principales.dias : ENVIO.resto.dias;
}
