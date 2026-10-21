import type { Kit } from "@/lib/tipos";

export const kits: Kit[] = [
  {
    slug: "kit-arranque",
    nombre: "Kit Arranque",
    descripcion:
      "Lo mínimo con criterio para empezar a correr esta semana: calzado versátil y la base de un plan simple. Ampliaremos el kit a medida que sumemos accesorios al catálogo.",
    productos: ["adidas-adizero"],
    estado: "disponible",
  },
  {
    slug: "kit-trail",
    nombre: "Kit Trail y montaña",
    descripcion:
      "Chaleco de hidratación, flask y visibilidad para rutas fuera del asfalto. En armación: se activa cuando entren los productos de hidratación y nocturno.",
    productos: [],
    estado: "en-armacion",
  },
  {
    slug: "kit-nocturno",
    nombre: "Kit Running nocturno",
    descripcion:
      "Luces delanteras y traseras más elementos reflectivos para entrenar de noche con la misma confianza que de día.",
    productos: [],
    estado: "en-armacion",
  },
  {
    slug: "kit-recuperacion",
    nombre: "Kit Recuperación",
    descripcion:
      "Movilidad y descanso activo para sostener la constancia semanal sin lesionarse por acumular kilómetros.",
    productos: [],
    estado: "en-armacion",
  },
];
