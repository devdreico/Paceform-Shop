# PACEFORM — E-commerce de running (Colombia)

Tienda de equipamiento para correr con contenido editorial (Wiki, Noticias y Comunidad). Next.js + TypeScript + Tailwind CSS v4.

## Arranque

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de producción
npm run lint    # eslint
```

## Configuración (.env)

Copia `.env.example` a `.env.local` y ajusta si es necesario. Valores actuales:

| Variable | Uso |
|---|---|
| `NEXT_PUBLIC_FORMSPREE_CONTRAENTREGA` | Pedidos contra entrega (carrito/checkout) |
| `NEXT_PUBLIC_FORMSPREE_MERCADOPAGO` | Datos de envío de compras con Mercado Pago (pago confirmado manualmente) |
| `NEXT_PUBLIC_MP_LINK` | Link genérico de pago Mercado Pago |

## Flujos de venta

1. **Contra entrega** (carrito → `/checkout`): se registra el pedido en Formspree con productos, variantes, totales y datos de envío. El cliente paga en efectivo al recibir.
2. **Mercado Pago** (ficha de producto): el cliente elige talla/color, registra su envío (va a Formspree MP como *pendiente de confirmación manual*) y se abre el link oficial de Mercado Pago. Se confirma el pago manualmente y se despacha.

Envío **gratis** a todo Colombia: ciudades principales 1–2 días hábiles, resto 3–4 días.

## Agregar productos

Edita `src/data/productos.ts`:

- `productos[]`: cada producto con `slug` único (URL `/tienda/[slug]`), precio en COP, tallas, colores, specs y `mercadopagoUrl` opcional (por defecto usa el link genérico).
- `categorias[]`: categorías por necesidad de entrenamiento.
- Imagen en `public/productos/` y referencia en `imagen`.

Kits en `src/data/kits.ts`, Wiki en `src/data/wiki.ts`, Noticias en `src/data/noticias.ts`, Comunidad en `src/data/comunidad.ts`.

## Identidad visual

- Verde bosque `#063D2E`, carbón `#111111`, blanco `#FFFFFF`, fondo claro `#F3F5F4`.
- Montserrat (400–800). Header siempre claro; logo verde oscuro.
- Glassmorphism mate estilo iOS: paneles translúcidos con borde, **sin sombras ni reflejos**.

## Estructura

```
src/
  app/          páginas (App Router)
  components/   layout, ui, commerce
  data/         catálogo y contenido
  lib/          carrito, formspree, config, formato, tipos
public/
  logo-paceform.png
  productos/    imágenes de producto
```
