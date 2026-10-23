export type Variante = {
  id: string;
  nombre: string;
  tipo: "talla" | "color";
};

export type Producto = {
  slug: string;
  nombre: string;
  categoriaSlug: string;
  uso: string[];
  precio: number;
  precioAntes?: number;
  descripcion: string;
  descripcionCorta: string;
  especificaciones: { etiqueta: string; valor: string }[];
  contenidoPaquete: string[];
  beneficios?: string[];
  porQueElegimos: string;
  complementarios: string[];
  tallas: string[];
  colores: { nombre: string; hex: string; imagen?: string }[];
  disponibilidad: "en-stock" | "pocas-unidades" | "proximamente";
  imagen: string;
  galeria?: string[];
  etiqueta?: string;
  notaCompra?: string;
};

export type Categoria = {
  slug: string;
  nombre: string;
  descripcion: string;
  icono: string;
};

export type Kit = {
  slug: string;
  nombre: string;
  descripcion: string;
  productos: string[];
  estado: "disponible" | "en-armacion";
};

export type ArtículoWiki = {
  slug: string;
  titulo: string;
  resumen: string;
  tiempoLectura: number;
  seccion: string;
  contenido: string[];
};

export type Noticia = {
  slug: string;
  titulo: string;
  resumen: string;
  fecha: string;
  categoria: string;
  contenido: string[];
};

export type HiloComunidad = {
  id: string;
  titulo: string;
  autor: string;
  categoria: string;
  fecha: string;
  respuestas: number;
  mensajes: { autor: string; fecha: string; texto: string }[];
};

export type ItemCarrito = {
  productoSlug: string;
  talla: string;
  color: string;
  cantidad: number;
};

export type DatosEnvio = {
  nombre: string;
  telefono: string;
  email: string;
  departamento: string;
  municipio: string;
  direccion: string;
  barrio: string;
  notas: string;
};
