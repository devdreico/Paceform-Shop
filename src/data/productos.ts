import type { Categoria, Producto } from "@/lib/tipos";

export const categorias: Categoria[] = [
  {
    slug: "calzado",
    nombre: "Calzado de running",
    descripcion:
      "Zapatillas para correr, caminar y entrenar. Amortiguación y soporte para cada kilómetro.",
    icono: "zapato",
  },
  {
    slug: "indumentaria",
    nombre: "Indumentaria técnica",
    descripcion:
      "Camisetas, shorts y medias diseñadas para moverse contigo sin rozaduras ni peso extra.",
    icono: "camiseta",
  },
  {
    slug: "accesorios",
    nombre: "Accesorios diarios",
    descripcion:
      "Riñoneras, bolsos, cámaras de acción y complementos que resuelven la salida y el regreso.",
    icono: "accesorio",
  },
  {
    slug: "recuperacion",
    nombre: "Recuperación y soporte",
    descripcion:
      "Soportes, movilidad y cuidado muscular para sostener la constancia semanal.",
    icono: "recuperacion",
  },
  {
    slug: "nutricion",
    nombre: "Nutrición deportiva",
    descripcion:
      "Proteínas, creatina y snacks para acompañar el entrenamiento y la recuperación.",
    icono: "agua",
  },
  {
    slug: "hidratacion",
    nombre: "Hidratación",
    descripcion:
      "Flasks, cinturones y chalecos para no perder ritmo en rutas largas o clima caliente.",
    icono: "agua",
  },
  {
    slug: "nocturno",
    nombre: "Running nocturno",
    descripcion:
      "Luces, reflectivos y accesorios de visibilidad para entrenar seguro al amanecer o anochecer.",
    icono: "luz",
  },
];

export const productos: Producto[] = [
  {
    slug: "adidas-adizero",
    nombre: "Adidas Adizero",
    categoriaSlug: "calzado",
    uso: ["correr", "caminar", "entrenar", "deporte en general"],
    precio: 145000,
    etiqueta: "Más vendido",
    descripcionCorta:
      "Zapatilla Adidas Adizero unisex para running, caminata y entrenamiento. Ligera, versátil y con stock real en todas las tallas 37–43.",
    descripcion:
      "El Adidas Adizero está pensado para quien entrena en serio y también para quien empieza: responde igual en la salida del domingo, en la caminata de la semana o en el gimnasio. Upper en textil importado con interior acolchonado, suela de goma suave y terminación vulcanizada. Ajuste con cordones y plantilla fija. Disponible en 3 presentaciones con foto real, todas las tallas al mismo precio, con stock real.",
    especificaciones: [
      { etiqueta: "Género", valor: "Unisex" },
      { etiqueta: "Tallas", valor: "37 a 43" },
      { etiqueta: "Material", valor: "Textil importado" },
      { etiqueta: "Interior", valor: "Acolchonado" },
      { etiqueta: "Suela", valor: "Goma suave" },
      { etiqueta: "Plantilla", valor: "Fija" },
      { etiqueta: "Ajuste", valor: "Cordones" },
      { etiqueta: "Terminación", valor: "Vulcanizada" },
      { etiqueta: "Garantía", valor: "Por defectos de fabricación" },
      { etiqueta: "Despacho", valor: "Máximo 24 h después de la orden" },
    ],
    beneficios: [
      "Ligera y versátil para correr, caminar o entrenar",
      "Interior acolchonado para comodidad en cada paso",
      "Suela de goma suave con agarre en asfalto y superficies mixtas",
      "Ajuste seguro con cordones",
      "Stock real y despacho rápido",
    ],
    contenidoPaquete: ["1 par Adidas Adizero", "Empaque original"],
    porQueElegimos:
      "Es el punto de entrada más honesto al running: una zapatilla de marca reconocida, precio claro y una sola tarifa para todas las tallas y colores, sin sorpresas al pagar.",
    complementarios: ["rinonera-on-cloud", "soporte-tobillo-elastico"],
    tallas: ["37", "38", "39", "40", "41", "42", "43"],
    colores: [
      { nombre: "Gris con negro", hex: "#6B7280", imagen: "/productos/adidas-adizero/gris-negro.webp" },
      { nombre: "Blanco", hex: "#F5F5F5", imagen: "/productos/adidas-adizero/blanco.webp" },
      { nombre: "Blanco tricolor", hex: "#E8E8E8", imagen: "/productos/adidas-adizero/blanco-tricolor.webp" },
    ],
    mercadopagoUrl: "https://mpago.li/2NDp5uf",
    disponibilidad: "en-stock",
    imagen: "/productos/adidas-adizero/gris-negro.webp",
    galeria: [
      "/productos/adidas-adizero/gris-negro.webp",
      "/productos/adidas-adizero/blanco.webp",
      "/productos/adidas-adizero/blanco-tricolor.webp",
    ],
    notaCompra: "145.000 COP por par en cualquier presentación.",
  },
  {
    slug: "on-running-cloudnova",
    nombre: "On Running Cloudnova Void Eclipse",
    categoriaSlug: "calzado",
    uso: ["correr", "caminar", "entrenar", "uso diario"],
    precio: 70000,
    etiqueta: "Hecho en Colombia",
    descripcionCorta:
      "Tenis On Running Cloudnova: diseño colombiano, tecnología CloudTec y suela importada. Para deporte, caminatas o el día a día.",
    descripcion:
      "El On Running Cloudnova combina diseño colombiano con tecnología internacional. Malla transpirable y detalles sintéticos dan frescura, ligereza y resistencia. Suela importada con tecnología CloudTec en PVC espanso: estructura segmentada que mejora amortiguación, flexibilidad y estabilidad. Plantilla anatómica acolchada y cierre con cordones modernos. Alto rendimiento con look urbano versátil.",
    especificaciones: [
      { etiqueta: "Origen", valor: "Hecho en Colombia" },
      { etiqueta: "Material", valor: "Malla transpirable + detalles sintéticos" },
      { etiqueta: "Suela", valor: "Importada CloudTec en PVC espanso" },
      { etiqueta: "Plantilla", valor: "Anatómica acolchada" },
      { etiqueta: "Cierre", valor: "Cordones ajustables" },
      { etiqueta: "Uso", valor: "Deporte, caminata y uso diario" },
    ],
    beneficios: [
      "Fabricación nacional con materiales de alta calidad",
      "Amortiguación y estabilidad gracias a la estructura segmentada",
      "Comodidad para largas caminatas y entrenamiento",
      "Look urbano versátil para cualquier ocasión",
    ],
    contenidoPaquete: ["1 par On Running Cloudnova", "Empaque original"],
    porQueElegimos:
      "Una opción hecha en Colombia con tecnología de amortiguación seria, a un precio de entrada muy competitivo para el rendimiento que ofrece.",
    complementarios: ["bolso-fitness-multifuncional", "rinonera-on-cloud"],
    tallas: [],
    colores: [
      { nombre: "Void Eclipse Undyed White", hex: "#E8E6E1" },
    ],
    mercadopagoUrl: "https://mpago.li/1ZDXkai",
    disponibilidad: "en-stock",
    imagen: "/productos/on-running-cloudnova/main.webp",
    galeria: [
      "/productos/on-running-cloudnova/main.webp",
      "/productos/on-running-cloudnova/gallery-1.webp",
      "/productos/on-running-cloudnova/gallery-2.webp",
      "/productos/on-running-cloudnova/gallery-3.webp",
      "/productos/on-running-cloudnova/gallery-4.webp",
      "/productos/on-running-cloudnova/gallery-5.webp",
      "/productos/on-running-cloudnova/gallery-6.webp",
      "/productos/on-running-cloudnova/gallery-7.webp",
    ],
  },
  {
    slug: "rinonera-on-cloud",
    nombre: "Riñonera On Cloud",
    categoriaSlug: "accesorios",
    uso: ["correr", "caminar", "uso diario", "viajes"],
    precio: 60000,
    etiqueta: "Nuevo lanzamiento",
    descripcionCorta:
      "Riñonera On Cloud con 4 compartimientos, hebillas fastex y correa ajustable. Llévala en cintura, pecho u hombro.",
    descripcion:
      "On Cloud se ha convertido en una de las marcas de mayor rotación en nuestra comunidad, y esta riñonera es el complemento perfecto para ampliar la experiencia. Práctica, urbana y versátil: 4 compartimientos, correa ajustable para distintas formas de uso, hebillas de liberación rápida tipo fastex y diseño funcional para el día a día. Una riñonera, diferentes formas de llevarla.",
    especificaciones: [
      { etiqueta: "Compartimientos", valor: "4" },
      { etiqueta: "Correa", valor: "Ajustable" },
      { etiqueta: "Hebillas", valor: "Liberación rápida tipo fastex" },
      { etiqueta: "Uso", valor: "Cintura, pecho u hombro" },
      { etiqueta: "Estilo", valor: "Urbano / deportivo" },
    ],
    beneficios: [
      "Cuatro compartimientos para organizar lo esencial",
      "Se usa de tres formas: cintura, pecho u hombro",
      "Hebillas fastex para poner y quitar sin complicaciones",
      "Ideal como venta cruzada con el calzado",
    ],
    contenidoPaquete: ["1 riñonera On Cloud", "Caja del producto"],
    porQueElegimos:
      "La marca On Cloud ya es referente en la comunidad; esta riñonera lleva esa experiencia al día a día con un diseño versátil y precio accesible.",
    complementarios: ["adidas-adizero", "on-running-cloudnova", "rinonera-impermeable-celular"],
    tallas: [],
    colores: [{ nombre: "Negro", hex: "#111111" }],
    mercadopagoUrl: "https://mpago.li/2PWTKip",
    disponibilidad: "en-stock",
    imagen: "/productos/rinonera-on-cloud/main.webp",
    galeria: [
      "/productos/rinonera-on-cloud/main.webp",
      "/productos/rinonera-on-cloud/gallery-1.webp",
      "/productos/rinonera-on-cloud/gallery-2.webp",
    ],
  },
  {
    slug: "rinonera-impermeable-celular",
    nombre: "Riñonera Impermeable para Celular",
    categoriaSlug: "accesorios",
    uso: ["correr", "caminar", "gimnasio", "senderismo"],
    precio: 38000,
    descripcionCorta:
      "Riñonera deportiva impermeable con compartimento transparente táctil: usa tu celular sin sacarlo mientras corres.",
    descripcion:
      "Diseñada para llevar el celular y objetos personales de forma segura mientras corres, caminas o haces ejercicio. El compartimento frontal transparente permite usar la pantalla táctil y ver notificaciones sin sacar el teléfono. Material impermeable que protege contra sudor y salpicaduras. Correa ajustable, salida para audífonos y bolsillo adicional para llaves o dinero.",
    especificaciones: [
      { etiqueta: "Largo total con correa", valor: "70 cm" },
      { etiqueta: "Compartimento frontal", valor: "22 cm" },
      { etiqueta: "Área para celular", valor: "16 cm" },
      { etiqueta: "Altura del bolsillo", valor: "7 cm" },
      { etiqueta: "Salida para audífonos", valor: "3.5 mm" },
      { etiqueta: "Material", valor: "Impermeable" },
    ],
    beneficios: [
      "Usa el celular sin sacarlo del bolsillo",
      "Protección impermeable contra sudor y salpicaduras",
      "Ligera y cómoda para actividad deportiva",
      "Correa ajustable para distintas cinturas",
      "Compartimento adicional para objetos pequeños",
    ],
    contenidoPaquete: ["1 riñonera canguro impermeable con correa ajustable"],
    porQueElegimos:
      "Resuelve el problema real de los corredores con móvil: llevar el teléfono a la vista y protegido sin estorbar el paso.",
    complementarios: ["adidas-adizero", "rinonera-on-cloud", "soporte-tobillo-elastico"],
    tallas: [],
    colores: [{ nombre: "Negro", hex: "#111111" }],
    mercadopagoUrl: "https://mpago.li/1PMo4xs",
    disponibilidad: "en-stock",
    imagen: "/productos/rinonera-impermeable/main.webp",
    galeria: [
      "/productos/rinonera-impermeable/main.webp",
      "/productos/rinonera-impermeable/gallery-1.webp",
      "/productos/rinonera-impermeable/gallery-2.webp",
      "/productos/rinonera-impermeable/gallery-3.webp",
      "/productos/rinonera-impermeable/gallery-4.webp",
      "/productos/rinonera-impermeable/gallery-5.webp",
    ],
  },
  {
    slug: "bolso-fitness-multifuncional",
    nombre: "Bolso deportivo FITNESS",
    categoriaSlug: "accesorios",
    uso: ["gimnasio", "viajes", "deporte diario"],
    precio: 79000,
    etiqueta: "Unisex",
    descripcionCorta:
      "Bolso deportivo FITNESS impermeable de 35 L para gimnasio o viajes. Lona de nylon resistente, soporta 15–20 kg. Unisex.",
    descripcion:
      "Bolso deportivo FITNESS impermeable para gimnasio y viajes unisex, con 35 litros de capacidad y dimensiones 31 × 53,5 × 31 cm. Fabricada en lona de nylon resistente al uso diario; soporta entre 15 y 20 kg (no recomendada para herramientas). Diseño moderno versátil para el gimnasio, escapadas de fin de semana o como bolsa diaria. Tu equipo, seco y protegido en cualquier clima.",
    especificaciones: [
      { etiqueta: "Capacidad", valor: "35 litros" },
      { etiqueta: "Dimensiones", valor: "31 × 53,5 × 31 cm" },
      { etiqueta: "Material", valor: "Lona de nylon impermeable" },
      { etiqueta: "Peso soportado", valor: "15 a 20 kg" },
      { etiqueta: "Género", valor: "Unisex" },
      { etiqueta: "Uso", valor: "Gimnasio, viajes, uso diario" },
    ],
    beneficios: [
      "Amplia capacidad para ropa, toallas y accesorios",
      "Resistente y duradera en condiciones exigentes",
      "Impermeable: protege contra lluvia y humedad",
      "Ligera pero fuerte",
      "Diseño unisex versátil",
    ],
    contenidoPaquete: ["1 maleta fitness impermeable 35 L"],
    porQueElegimos:
      "Complemento natural del corredor que además entrena en gimnasio o se va de fin de semana: capacidad real, material impermeable y un precio justo.",
    complementarios: ["on-running-cloudnova", "smart-bar-protein", "shilajit-whey-protein-900"],
    tallas: [],
    colores: [
      { nombre: "Rojo", hex: "#B91C1C" },
      { nombre: "Rosado", hex: "#DB2777" },
      { nombre: "Negro", hex: "#111111" },
    ],
    mercadopagoUrl: "https://mpago.li/2PWTKip",
    disponibilidad: "en-stock",
    imagen: "/productos/bolso-fitness/main.webp",
    galeria: [
      "/productos/bolso-fitness/main.webp",
      "/productos/bolso-fitness/gallery-1.webp",
      "/productos/bolso-fitness/gallery-2.webp",
      "/productos/bolso-fitness/gallery-3.webp",
      "/productos/bolso-fitness/gallery-4.webp",
      "/productos/bolso-fitness/gallery-5.webp",
      "/productos/bolso-fitness/gallery-6.webp",
      "/productos/bolso-fitness/gallery-7.webp",
    ],
  },
  {
    slug: "camara-action-4k",
    nombre: "Cámara Action Cam 4K WiFi + Accesorios",
    categoriaSlug: "accesorios",
    uso: ["running", "ciclismo", "deportes acuáticos", "aventura"],
    precio: 89000,
    etiqueta: "Alto movimiento",
    descripcionCorta:
      "Cámara de deportes 4K Ultra HD con WiFi, pantalla 2\", lente 170° y carcasa impermeable hasta 30 m. Con accesorios.",
    descripcion:
      "Cámara de acción para deportes de alto movimiento: vídeo 4K Ultra HD, fotos de 16 MP, pantalla LCD LTPS de 2 pulgadas y lente gran angular de 170°. WiFi integrado, carcasa impermeable hasta 30 metros y tarjeta Micro SD hasta 64 GB (no incluida). Batería de 900 mAh con ~80 min de grabación a 1080P. Multiidioma incluido español. El color depende de la disponibilidad en bodega (negro, dorado, plateado, amarillo, azul); consultar con anterioridad.",
    especificaciones: [
      { etiqueta: "Pantalla", valor: "LCD LTPS 2.0 pulgadas" },
      { etiqueta: "Lente", valor: "170° gran angular HD" },
      { etiqueta: "Vídeo", valor: "4K (3840×2160) 24fps · 1080P 30fps · 720P 30fps" },
      { etiqueta: "Fotos", valor: "16M (4640×3480) y múltiples resoluciones" },
      { etiqueta: "Impermeable", valor: "Carcasa hasta 30 m" },
      { etiqueta: "Conectividad", valor: "WiFi · USB 2.0" },
      { etiqueta: "Almacenamiento", valor: "Micro SDHC Clase 10 16–64 GB (no incluida)" },
      { etiqueta: "Batería", valor: "900 mAh · ~80 min a 1080P" },
      { etiqueta: "Carga", valor: "~2 horas" },
      { etiqueta: "Formato vídeo", valor: "MOV · H.264" },
    ],
    beneficios: [
      "Graba en 4K y fotos de 16 MP con lente de 170°",
      "Carcasa impermeable para deportes acuáticos",
      "WiFi para compartir desde el celular",
      "Disparador automático y disparo continuo",
      "Incluye accesorios de montaje",
    ],
    contenidoPaquete: [
      "1 cámara action 4K",
      "Carcasa impermeable",
      "Kit de accesorios de montaje",
      "Cable USB",
    ],
    porQueElegimos:
      "Para el corredor, ciclista o aventurero que quiere documentar entrenamientos y rutas sin invertir en una cámara de gama alta. Resolución real y accesorios incluidos.",
    complementarios: ["bolso-fitness-multifuncional", "on-running-cloudnova"],
    tallas: [],
    colores: [
      { nombre: "Color sujeto a disponibilidad", hex: "#374151" },
    ],
    mercadopagoUrl: "https://mpago.li/32LG2TC",
    disponibilidad: "en-stock",
    imagen: "/productos/camara-action-4k/main.webp",
    galeria: [
      "/productos/camara-action-4k/main.webp",
      "/productos/camara-action-4k/gallery-1.webp",
      "/productos/camara-action-4k/gallery-2.webp",
      "/productos/camara-action-4k/gallery-3.webp",
      "/productos/camara-action-4k/gallery-4.webp",
      "/productos/camara-action-4k/gallery-5.webp",
    ],
    notaCompra: "El color depende de la disponibilidad en bodega; preguntar con anterioridad.",
  },
  {
    slug: "soporte-tobillo-elastico",
    nombre: "Soporte de Tobillo Elástico Transpirable",
    categoriaSlug: "recuperacion",
    uso: ["correr", "rehabilitación", "uso diario", "deporte"],
    precio: 40000,
    descripcionCorta:
      "Soporte de tobillo elástico y transpirable con compresión moderada. Fácil de colocar, ajuste unisex, ideal para deporte o uso diario.",
    descripcion:
      "Soporte de tobillo elástico transpirable diseñado para brindar comodidad y seguridad en cada paso. Su tejido flexible y resistente se adapta a cualquier tamaño de tobillo y ofrece compresión moderada que ayuda a reducir molestias y prevenir lesiones. Fácil de colocar, ajuste universal para hombres y mujeres, material que mantiene la piel fresca. Ideal para deporte, rehabilitación o uso diario.",
    especificaciones: [
      { etiqueta: "Ajuste", valor: "Universal (hombres y mujeres)" },
      { etiqueta: "Material", valor: "Elástico transpirable" },
      { etiqueta: "Compresión", valor: "Moderada" },
      { etiqueta: "Uso", valor: "Deporte, rehabilitación o diario" },
    ],
    beneficios: [
      "Fácil de colocar, sin complicaciones",
      "Ajuste universal para hombres y mujeres",
      "Material transpirable que mantiene la piel fresca",
      "Ayuda a reducir molestias y prevenir lesiones",
      "Estabilidad y confianza en el movimiento",
    ],
    contenidoPaquete: ["1 soporte de tobillo elástico transpirable"],
    porQueElegimos:
      "Un accesorio barato que puede salvar un mes de entrenamiento: compresión moderada y transpirabilidad para quienes empiezan o vuelven de una molestia.",
    complementarios: ["adidas-adizero", "creatina-zamia-nutra-300"],
    tallas: [],
    colores: [{ nombre: "Negro", hex: "#111111" }],
    mercadopagoUrl: "https://mpago.li/1NUfv7k",
    disponibilidad: "en-stock",
    imagen: "/productos/soporte-tobillo/main.webp",
    galeria: [
      "/productos/soporte-tobillo/main.webp",
      "/productos/soporte-tobillo/gallery-1.webp",
      "/productos/soporte-tobillo/gallery-2.webp",
      "/productos/soporte-tobillo/gallery-3.webp",
      "/productos/soporte-tobillo/gallery-4.webp",
    ],
  },
  {
    slug: "smart-bar-protein",
    nombre: "SmartBar Protein · 12 unidades",
    categoriaSlug: "nutricion",
    uso: ["snack", "post-entrenamiento", "nutrición diaria"],
    precio: 49000,
    etiqueta: "Sin azúcar añadida",
    descripcionCorta:
      "Barra de proteína de suero con 21 g por porción, sin azúcar añadida y libre de gluten. Sabor a vainilla, fresa o chocolate.",
    descripcion:
      "SMARTBAR PROTEIN es una barra práctica y sabrosa con 21 g de proteína por porción, hecha con proteína de suero de leche. No contiene azúcar añadida y es libre de gluten, ideal para quienes cuidan cada detalle de su alimentación. Sabores vainilla, fresa y chocolate con textura agradable, para disfrutar como snack o parte de tus preparaciones en cualquier momento del día.",
    especificaciones: [
      { etiqueta: "Presentación", valor: "Caja de 12 unidades" },
      { etiqueta: "Proteína", valor: "21 g por porción" },
      { etiqueta: "Tipo", valor: "Proteína de suero de leche" },
      { etiqueta: "Azúcar", valor: "Sin azúcar añadida" },
      { etiqueta: "Gluten", valor: "Libre de gluten" },
      { etiqueta: "Sabores", valor: "Vainilla, fresa y chocolate" },
    ],
    beneficios: [
      "21 g de proteína por porción",
      "Sin azúcar añadida",
      "Libre de gluten",
      "Práctica para llevar al entrenamiento o al trabajo",
      "Tres sabores para no aburrirte",
    ],
    contenidoPaquete: ["1 caja con 12 barras SmartBar Protein"],
    porQueElegimos:
      "Snack proteico honesto: buen aporte, sin azúcar añadida y a un precio por unidad muy competitivo para el diario del corredor.",
    complementarios: ["shilajit-whey-protein-900", "mass-evolution-1900"],
    tallas: [],
    colores: [
      { nombre: "Vainilla / Fresa / Chocolate (sujeto a stock)", hex: "#F5F5F5" },
    ],
    mercadopagoUrl: "https://mpago.li/1W3tAQC",
    disponibilidad: "en-stock",
    imagen: "/productos/smart-bar-protein/main.webp",
    galeria: [
      "/productos/smart-bar-protein/main.webp",
      "/productos/smart-bar-protein/gallery-1.webp",
      "/productos/smart-bar-protein/gallery-2.webp",
      "/productos/smart-bar-protein/gallery-3.webp",
      "/productos/smart-bar-protein/gallery-4.webp",
      "/productos/smart-bar-protein/gallery-5.webp",
    ],
  },
  {
    slug: "mass-evolution-1900",
    nombre: "Mass Evolution 1.900 g · Cookies n Cream",
    categoriaSlug: "nutricion",
    uso: ["volumen", "ganancia de peso", "suplementación"],
    precio: 80000,
    etiqueta: "Alta demanda calórica",
    descripcionCorta:
      "Ganador de peso Cookies n Cream: 569 kcal y 41 g de proteína por porción. Maltodextrina, whey, soya, creatina y vitaminas.",
    descripcion:
      "Mass Evolution es una mezcla en polvo sabor Cookies n Cream para etapas de volumen o para complementar la alimentación con alto aporte calórico y proteico. Combina maltodextrina, proteína concentrada de suero, aislado de soya y creatina monohidratada, enriquecida con vitaminas y minerales esenciales. Textura cremosa, excelente solubilidad y sabor delicioso. Cada porción aporta 569 kcal y 41 g de proteína.",
    especificaciones: [
      { etiqueta: "Presentación", valor: "1.900 g" },
      { etiqueta: "Sabor", valor: "Cookies n Cream" },
      { etiqueta: "Por porción", valor: "569 kcal · 41 g de proteína" },
      { etiqueta: "Fórmula", valor: "Maltodextrina, whey, aislado de soya, creatina monohidratada" },
      { etiqueta: "Extras", valor: "Vitaminas y minerales esenciales" },
      { etiqueta: "Textura", valor: "Cremosa, excelente solubilidad" },
    ],
    beneficios: [
      "Alto aporte calórico para etapas de volumen",
      "41 g de proteína por porción",
      "Incluye creatina monohidratada",
      "Sabor Cookies n Cream cremoso",
      "Enriquecido con vitaminas y minerales",
    ],
    contenidoPaquete: ["1 envase Mass Evolution 1.900 g"],
    porQueElegimos:
      "Fórmula completa para quien necesita subir de peso con calidad: proteína, carbohidratos, creatina y micronutrientes en un solo producto.",
    complementarios: ["mass-evolution-3200", "creatina-elite-micronizada-300", "smart-bar-protein"],
    tallas: [],
    colores: [{ nombre: "Cookies n Cream", hex: "#3F3F46" }],
    mercadopagoUrl: "https://mpago.li/2GqLCNE",
    disponibilidad: "en-stock",
    imagen: "/productos/mass-evolution/main.webp",
    galeria: [
      "/productos/mass-evolution/main.webp",
      "/productos/mass-evolution/gallery-1.webp",
      "/productos/mass-evolution/gallery-2.webp",
    ],
  },
  {
    slug: "mass-evolution-3200",
    nombre: "Mass Evolution 3.200 g · Cookies n Cream",
    categoriaSlug: "nutricion",
    uso: ["volumen", "ganancia de peso", "suplementación"],
    precio: 110000,
    etiqueta: "Mejor relación gramos",
    descripcionCorta:
      "La versión grande de Mass Evolution (3,2 kg): mismas especificaciones Cookies n Cream, más rendimiento por peso.",
    descripcion:
      "La presentación de 3.200 g de Mass Evolution reúne las mismas características de la versión de 1.900 g: mezcla Cookies n Cream con maltodextrina, proteína concentrada de suero, aislado de soya y creatina monohidratada, enriquecida con vitaminas y minerales. 569 kcal y 41 g de proteína por porción. Ideal para ciclos de volumen largos sin reordenar compras cada semana.",
    especificaciones: [
      { etiqueta: "Presentación", valor: "3.200 g" },
      { etiqueta: "Sabor", valor: "Cookies n Cream" },
      { etiqueta: "Por porción", valor: "569 kcal · 41 g de proteína" },
      { etiqueta: "Fórmula", valor: "Maltodextrina, whey, aislado de soya, creatina monohidratada" },
      { etiqueta: "Extras", valor: "Vitaminas y minerales esenciales" },
    ],
    beneficios: [
      "Más gramos al mismo costo por porción",
      "Ideal para ciclos de volumen prolongados",
      "Misma fórmula y sabor que la versión 1.900 g",
    ],
    contenidoPaquete: ["1 envase Mass Evolution 3.200 g"],
    porQueElegimos:
      "Si ya estás en un ciclo de volumen, el formato grande baja el costo por porción y evita reordener cada semana.",
    complementarios: ["mass-evolution-1900", "creatina-elite-micronizada-300"],
    tallas: [],
    colores: [{ nombre: "Cookies n Cream", hex: "#3F3F46" }],
    mercadopagoUrl: "https://mpago.li/1XeuMgZ",
    disponibilidad: "en-stock",
    imagen: "/productos/mass-evolution/main.webp",
    galeria: [
      "/productos/mass-evolution/gallery-1.webp",
      "/productos/mass-evolution/gallery-2.webp",
      "/productos/mass-evolution/main.webp",
    ],
  },
  {
    slug: "creatina-zamia-nutra-300",
    nombre: "Creatina Monohidratada Zamia Nutra 300 g",
    categoriaSlug: "nutricion",
    uso: ["fuerza", "rendimiento", "recuperación"],
    precio: 28000,
    etiqueta: "100% pura",
    descripcionCorta:
      "Creatina monohidratada 100% pura Zamia Nutra 300 g. Sin rellenos ni aditivos innecesarios: fuerza, potencia y recuperación en polvo de rápida disolución.",
    descripcion:
      "La Creatina Monohidratada Zamia Nutra es creatina 100% pura, sin mezclas ni rellenos. Un suplemento deportivo de alta pureza para mejorar el rendimiento físico, aumentar la fuerza y optimizar la recuperación muscular. Fórmula premium con excelente solubilidad y rápida absorción. Mezclar una porción en agua o bebida de preferencia antes o después del entrenamiento, según tu rutina.",
    especificaciones: [
      { etiqueta: "Contenido neto", valor: "300 g" },
      { etiqueta: "Formato", valor: "Polvo de rápida disolución" },
      { etiqueta: "Tipo", valor: "Creatina monohidratada" },
      { etiqueta: "Pureza", valor: "100% pura · sin rellenos" },
      { etiqueta: "Uso", valor: "Suplemento deportivo de uso diario" },
    ],
    beneficios: [
      "100% creatina pura, sin aditivos innecesarios",
      "Aumenta la fuerza y potencia muscular",
      "Mejora el rendimiento deportivo",
      "Favorece el crecimiento de masa muscular",
      "Reduce la fatiga y acelera la recuperación",
    ],
    contenidoPaquete: ["1 envase Creatina Monohidratada Zamia Nutra 300 g"],
    porQueElegimos:
      "Creatina monohidratada 100% pura a un precio de entrada: el suplemento con más evidencia científica, sin pagar de más por rellenos ni marketing.",
    complementarios: ["creatina-elite-micronizada-300", "mass-evolution-1900"],
    tallas: [],
    colores: [{ nombre: "Neutro", hex: "#E5E7EB" }],
    mercadopagoUrl: "https://mpago.li/1Psb9Wu",
    disponibilidad: "en-stock",
    imagen: "/productos/creatina-zamia/main.webp",
  },
  {
    slug: "creatina-elite-micronizada-300",
    nombre: "Creatina Monohidratada Elite 300 g",
    categoriaSlug: "nutricion",
    uso: ["fuerza", "rendimiento", "recuperación"],
    precio: 50000,
    etiqueta: "Micronizada premium",
    descripcionCorta:
      "Creatina monohidratada micronizada Elite 300 g: alta pureza, excelente biodisponibilidad y disolución instantánea.",
    descripcion:
      "La Creatina Monohidratada Elite es un suplemento premium con textura micronizada —partículas más finas para absorción superior y disolución instantánea, sin grumos—. Potencia el rendimiento físico, aumenta la fuerza y mejora la recuperación. Fórmula de alta pureza ideal para deportistas que buscan maximizar su desempeño en cada entrenamiento.",
    especificaciones: [
      { etiqueta: "Contenido neto", valor: "300 g" },
      { etiqueta: "Formato", valor: "Polvo micronizado de rápida disolución" },
      { etiqueta: "Tipo", valor: "Creatina monohidratada grado premium" },
      { etiqueta: "Textura", valor: "Micronizada · partículas ultrafinas" },
      { etiqueta: "Biodisponibilidad", valor: "Alta" },
      { etiqueta: "Uso", valor: "Suplemento deportivo de uso diario" },
    ],
    beneficios: [
      "Micronizada para absorción y disolución superiores",
      "Incrementa la fuerza y potencia muscular",
      "Mejora el rendimiento en entrenamientos de alta intensidad",
      "Acelera la recuperación muscular",
      "Favorece el aumento de masa muscular",
    ],
    contenidoPaquete: ["1 envase Creatina Monohidratada Elite 300 g"],
    porQueElegimos:
      "Calidad micronizada real: partículas ultrafinas que se disuelven sin grumos y se absorben mejor que la creatina estándar.",
    complementarios: ["creatina-zamia-nutra-300", "mass-evolution-3200", "shilajit-whey-protein-900"],
    tallas: [],
    colores: [{ nombre: "Premium", hex: "#1F2937" }],
    mercadopagoUrl: "https://mpago.li/1KanoC9",
    disponibilidad: "en-stock",
    imagen: "/productos/creatina-elite/main.webp",
  },
  {
    slug: "shilajit-whey-protein-900",
    nombre: "Shilajit Whey Protein Isolate 90% · 900 g",
    categoriaSlug: "nutricion",
    uso: ["recuperación", "masa magra", "suplementación"],
    precio: 69000,
    etiqueta: "Proteína premium",
    descripcionCorta:
      "Whey Isolate 90% con sabor vainilla natural: absorción ultra rápida, baja en lactosa. ~29 porciones. Registro INVIMA.",
    descripcion:
      "Shilajit Whey Protein Isolate 90% es una proteína aislada de suero de leche de alta pureza y absorción ultra rápida, diseñada para maximizar la recuperación muscular, acelerar el crecimiento de masa magra y mejorar la definición. Sabor vainilla natural, suave y fácil de consumir. Rica en BCAAs, baja en carbohidratos, grasas y lactosa. Registro INVIMA y fabricada bajo estándares GMP.",
    especificaciones: [
      { etiqueta: "Contenido", valor: "900 g (~29 porciones)" },
      { etiqueta: "Tipo", valor: "Whey Protein Isolate 90%" },
      { etiqueta: "Sabor", valor: "Vainilla natural" },
      { etiqueta: "BCAAs", valor: "Rica en aminoácidos esenciales" },
      { etiqueta: "Lactosa", valor: "Baja · digestión ligera" },
      { etiqueta: "Registro", valor: "INVIMA · estándares GMP" },
      { etiqueta: "Uso sugerido", valor: "1 porción (30 g) con 250–300 ml" },
    ],
    beneficios: [
      "Favorece el crecimiento y la recuperación muscular",
      "Absorción rápida post-entrenamiento",
      "Apoya la definición y la masa magra",
      "Baja en lactosa, sin pesadez",
      "Alto valor biológico y registro INVIMA",
    ],
    contenidoPaquete: ["1 envase Shilajit Whey Protein Isolate 90% · 900 g"],
    porQueElegimos:
      "Whey isolate real con registro INVIMA: lo que necesitas post-entrenamiento sin el exceso de carbohidratos de un concentrate.",
    complementarios: ["shilajit-whey-protein-x2", "creatina-elite-micronizada-300", "smart-bar-protein"],
    tallas: [],
    colores: [{ nombre: "Vainilla natural", hex: "#FDE68A" }],
    mercadopagoUrl: "https://mpago.li/17ifNgd",
    disponibilidad: "en-stock",
    imagen: "/productos/shilajit-whey/main.webp",
  },
  {
    slug: "shilajit-whey-protein-x2",
    nombre: "Shilajit Whey Protein · Pack x2 900 g",
    categoriaSlug: "nutricion",
    uso: ["recuperación", "masa magra", "suplementación"],
    precio: 118000,
    precioAntes: 138000,
    etiqueta: "Promo · Super Elite",
    descripcionCorta:
      "Pack de 2 unidades de Shilajit Whey Protein Isolate 90% (2 × 900 g). Mismas características, mejor precio por unidad.",
    descripcion:
      "Pack promocional Super Elite: dos envases de 900 g de Shilajit Whey Protein Isolate 90%, vainilla natural, con las mismas características del formato individual. Aprovecha el mejor precio por porción y ten casi dos meses de suplementación sin reordenar cada semana.",
    especificaciones: [
      { etiqueta: "Contenido", valor: "2 × 900 g" },
      { etiqueta: "Tipo", valor: "Whey Protein Isolate 90%" },
      { etiqueta: "Sabor", valor: "Vainilla natural" },
      { etiqueta: "Ahorro", valor: "20.000 COP frente a comprar por separado" },
      { etiqueta: "Registro", valor: "INVIMA · estándares GMP" },
    ],
    beneficios: [
      "Dos envases al precio promocional",
      "Misma fórmula premium isolate 90%",
      "Casi el doble de duración sin reordenar",
    ],
    contenidoPaquete: [
      "2 envases Shilajit Whey Protein Isolate 90% · 900 g",
    ],
    porQueElegimos:
      "Si ya sabes que vas a usar whey, el pack x2 baja el costo por porción y te deja concentrado en entrenar, no en comprar.",
    complementarios: ["shilajit-whey-protein-900", "creatina-elite-micronizada-300"],
    tallas: [],
    colores: [{ nombre: "Vainilla natural", hex: "#FDE68A" }],
    mercadopagoUrl: "https://mpago.li/2xkWRdK",
    disponibilidad: "en-stock",
    imagen: "/productos/shilajit-whey-x2/main.webp",
  },
];

export function productoPorSlug(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}

export function productosPorCategoria(slug: string): Producto[] {
  return productos.filter((p) => p.categoriaSlug === slug);
}

export function buscarProductos(consulta: string): Producto[] {
  const q = consulta.trim().toLowerCase();
  if (!q) return [];
  return productos.filter((p) => {
    const categoria = categorias.find((c) => c.slug === p.categoriaSlug);
    const texto = [
      p.nombre,
      p.descripcionCorta,
      categoria?.nombre ?? "",
      ...p.uso,
      ...p.tallas,
      ...p.colores.map((c) => c.nombre),
    ]
      .join(" ")
      .toLowerCase();
    return texto.includes(q);
  });
}

export function categoriaPorSlug(slug: string): Categoria | undefined {
  return categorias.find((c) => c.slug === slug);
}
