import type { HiloComunidad } from "@/lib/tipos";

export const hilos: HiloComunidad[] = [
  {
    id: "hilo-1",
    titulo: "¿Cuántos kilómetros semanales llevan en este mes?",
    autor: "Camila R.",
    categoria: "Entrenamiento",
    fecha: "2026-10-18",
    respuestas: 3,
    mensajes: [
      {
        autor: "Camila R.",
        fecha: "2026-10-18",
        texto:
          "Yo voy en 28 km semanales, mezclando martes y jueves de 8K con salida larga de 14 el domingo. ¿Cómo van ustedes?",
      },
      {
        autor: "Andrés M.",
        fecha: "2026-10-18",
        texto:
          "25 km por acá. La clave fue bajar el ritmo de las salidas largas, ahora llego sin quedarme tirado.",
      },
      {
        autor: "Juliana P.",
        fecha: "2026-10-19",
        texto:
          "20 km y súper contenta con la constancia. Antes corría solo cuando tenía motivación y no pasaba de 8.",
      },
    ],
  },
  {
    id: "hilo-2",
    titulo: "Primer 10K: ¿cuánto tiempo de preparación?",
    autor: "Diego S.",
    categoria: "Principiantes",
    fecha: "2026-10-12",
    respuestas: 4,
    mensajes: [
      {
        autor: "Diego S.",
        fecha: "2026-10-12",
        texto:
          "Vengo de 5K en 32 minutos y quiero mi primer 10K en diciembre. ¿Estoy a tiempo con un plan de 8 semanas?",
      },
      {
        autor: "Laura G.",
        fecha: "2026-10-12",
        texto:
          "Sí, con constancia. Yo lo logré en 10 semanas corriendo 3 veces por semana, sin subir distancia muy rápido.",
      },
      {
        autor: "Mateo L.",
        fecha: "2026-10-13",
        texto:
          "Acuerdate de la salida larga semanal lenta. Ese hábito es el que más cambia el rendimiento en 10K.",
      },
      {
        autor: "Diego S.",
        fecha: "2026-10-13",
        texto: "Perfecto, empiezo este lunes. ¡Gracias!",
      },
    ],
  },
  {
    id: "hilo-3",
    titulo: "Correr en Bogotá con ese frío de la mañana: tips",
    autor: "Sofía V.",
    categoria: "Ciudades",
    fecha: "2026-10-05",
    respuestas: 2,
    mensajes: [
      {
        autor: "Sofía V.",
        fecha: "2026-10-05",
        texto:
          "Salgo a las 6 a.m. y el frío me mata el ánimo. ¿Qué capas usan para no pasar frío pero tampoco sobrecalentarse?",
      },
      {
        autor: "Nicolás H.",
        fecha: "2026-10-05",
        texto:
          "Camiseta térmica ligera + una cortaviento fina. Después de 10 minutos ya no la necesito y la llevo en la cintura.",
      },
      {
        autor: "Camila R.",
        fecha: "2026-10-06",
        texto:
          "Guantes cortados y gorra marcan diferencia. Y arranca suave: el cuerpo se calienta en el km 2.",
      },
    ],
  },
  {
    id: "hilo-4",
    titulo: "Zapatilla versátil para correr y caminar: ¿qué buscan?",
    autor: "Andrés M.",
    categoria: "Equipamiento",
    fecha: "2026-09-29",
    respuestas: 3,
    mensajes: [
      {
        autor: "Andrés M.",
        fecha: "2026-09-29",
        texto:
          "Busco una que sirva para correr 3 veces por semana y también para caminar los días de recuperación. ¿Qué priorizan?",
      },
      {
        autor: "Juliana P.",
        fecha: "2026-09-29",
        texto:
          "Amortiguación media y peso ligero. Si es muy minimalista, caminar se siente duro después de un largo.",
      },
      {
        autor: "Laura G.",
        fecha: "2026-09-30",
        texto:
          "Yo priorizo que el upper sea ancho. La comodidad diaria importa más que los últimos gramos.",
      },
    ],
  },
];
