#!/usr/bin/env python3
"""Normaliza imágenes de producto a 4:3 y lifestyle a 3:4 (vertical).

- Recorta exceso de fondo al bbox del contenido.
- Reescala para que el producto ocupe ~85% del lado corto.
- Centra en lienzo 4:3 (producto) o recorta a 3:4 (lifestyle vertical).
- Exporta WebP q85. Elimina el archivo original si el nombre cambia.
"""
import os
from PIL import Image, ImageChops

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTOS = os.path.join(ROOT, "public", "productos")
LIFESTYLE = os.path.join(ROOT, "public", "lifestyle")
BG = (243, 245, 244)  # #F3F5F4 fondo de página
RATIO_PROD = 4 / 3
RATIO_VERT = 3 / 4
FILL = 0.85
MAX_W = 1400


def bbox_contenido(im, tol=18):
    """Bounding box del contenido que difiere del color de esquina."""
    rgb = im.convert("RGB")
    esquina = rgb.getpixel((2, 2))
    fondo = Image.new("RGB", rgb.size, esquina)
    diff = ImageChops.difference(rgb, fondo)
    diff = diff.point(lambda p: 255 if p > tol else 0)
    return diff.getbbox()


def a_lienzo(im, ratio, fill=FILL, bg=BG):
    """Recorta al bbox y centra en lienzo del ratio dado."""
    bbox = bbox_contenido(im)
    if bbox:
        im = im.crop(bbox)
    w, h = im.size
    # lienzo con el ratio deseado, lado corto = max del contenido escalado
    contenido_max = max(w, h)
    lado = int(contenido_max / fill)
    if lado % 2:
        lado += 1
    if ratio >= 1:
        cw = lado
        ch = int(lado / ratio)
    else:
        ch = lado
        cw = int(lado * ratio)
    # escala el contenido para que quepa en el lienzo con fill
    escala = min((cw * fill) / w, (ch * fill) / h)
    nw, nh = max(1, int(w * escala)), max(1, int(h * escala))
    im = im.resize((nw, nh), Image.LANCZOS)
    lienzo = Image.new("RGB", (cw, ch), bg)
    lienzo.paste(im, ((cw - nw) // 2, (ch - nh) // 2))
    if cw > MAX_W:
        nh2 = int(ch * MAX_W / cw)
        lienzo = lienzo.resize((MAX_W, nh2), Image.LANCZOS)
    return lienzo


def recortar_vertical(im, ratio=RATIO_VERT):
    """Center-crop a ratio vertical (para fotos lifestyle apaisadas)."""
    w, h = im.size
    if w / h > ratio:
        nw = int(h * ratio)
        x = (w - nw) // 2
        im = im.crop((x, 0, x + nw, h))
    else:
        nh = int(w / ratio)
        y = (h - nh) // 2
        im = im.crop((0, y, w, y + nh))
    if im.width > MAX_W:
        nh = int(im.height * MAX_W / im.width)
        im = im.resize((MAX_W, nh), Image.LANCZOS)
    return im


def procesar_productos():
    carpetas = sorted(
        d for d in os.listdir(PRODUCTOS)
        if os.path.isdir(os.path.join(PRODUCTOS, d))
    )
    total = 0
    for carpeta in carpetas:
        dirp = os.path.join(PRODUCTOS, carpeta)
        for nombre in sorted(os.listdir(dirp)):
            ruta = os.path.join(dirp, nombre)
            if not os.path.isfile(ruta):
                continue
            ext = os.path.splitext(nombre)[1].lower()
            if ext not in (".jpg", ".jpeg", ".png", ".webp"):
                continue
            try:
                im = Image.open(ruta)
                im.load()
            except Exception as e:
                print(f"  SKIP {carpeta}/{nombre}: {e}")
                continue
            out = a_lienzo(im, RATIO_PROD)
            base = os.path.splitext(nombre)[0]
            nueva = os.path.join(dirp, base + ".webp")
            out.save(nueva, "WEBP", quality=85, method=4)
            if nueva != ruta:
                os.remove(ruta)
            total += 1
            print(f"  {carpeta}/{nombre} -> {base}.webp {out.size}")
    print(f"Productos: {total} imágenes")


def procesar_lifestyle():
    verticales = ["corredor-4.jpg", "corredor-5.jpg"]
    total = 0
    for nombre in os.listdir(LIFESTYLE):
        ruta = os.path.join(LIFESTYLE, nombre)
        if not os.path.isfile(ruta):
            continue
        if os.path.splitext(nombre)[1].lower() not in (".jpg", ".jpeg", ".png", ".webp"):
            continue
        try:
            im = Image.open(ruta)
            im.load()
        except Exception as e:
            print(f"  SKIP {nombre}: {e}")
            continue
        if nombre in verticales:
            out = recortar_vertical(im, RATIO_VERT)
        else:
            out = im
            if out.width > MAX_W:
                nh = int(out.height * MAX_W / out.width)
                out = out.resize((MAX_W, nh), Image.LANCZOS)
        base = os.path.splitext(nombre)[0]
        nueva = os.path.join(LIFESTYLE, base + ".webp")
        out.save(nueva, "WEBP", quality=85, method=4)
        if nueva != ruta:
            os.remove(ruta)
        total += 1
        print(f"  lifestyle/{nombre} -> {base}.webp {out.size}")
    print(f"Lifestyle: {total} imágenes")


if __name__ == "__main__":
    print("== Productos ==")
    procesar_productos()
    print("== Lifestyle ==")
    procesar_lifestyle()
    print("Listo.")
