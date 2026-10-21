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
    tipo: "natural" as const,
    descripcion: "Cuidado natural y nutrición",
    url: "https://botane.presentto.online",
    etiqueta: "Cuidado natural",
  },
  {
    nombre: "Vexna Bike",
    tipo: "ciclismo" as const,
    descripcion: "Ciclismo y running",
    url: "https://vexna.presentto.online",
    etiqueta: "Ciclismo",
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

export function normalizarCiudad(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export const CIUDADES_PRINCIPALES = ENVIO.principales.ciudades;

export const CIUDADES_EXTRA = [
  "Tunja",
  "Cúcuta",
  "Popayán",
  "Armenia",
  "Florencia",
  "Valledupar",
  "Riohacha",
  "Quibdó",
  "Yopal",
  "Leticia",
  "San Andrés",
  "Barrancabermeja",
  "Floridablanca",
  "Girón",
  "Piedecuesta",
  "Duitama",
  "Sogamoso",
  "Tuluá",
  "Buenaventura",
  "Zipaquirá",
];

export const CIUDADES = [...CIUDADES_PRINCIPALES, ...CIUDADES_EXTRA];

export function diasEstimados(ciudad: string): string {
  if (!ciudad || ciudad.trim().length < 2) return "";
  const n = normalizarCiudad(ciudad);
  const esPrincipal = ENVIO.principales.ciudades.some(
    (c) => normalizarCiudad(c) === n
  );
  return esPrincipal ? ENVIO.principales.dias : ENVIO.resto.dias;
}
