import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/carrito";
import TopBar from "@/components/layout/top-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CartDrawer from "@/components/commerce/cart-drawer";
import WhatsAppFlotante from "@/components/layout/whatsapp-flotante";
import { SITE_URL, MARCA } from "@/lib/config";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#063D2E",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PACEFORM — Equipamiento para correr en Colombia",
    template: "%s · PACEFORM",
  },
  description:
    "Equipamiento de running seleccionado para Colombia. Adidas Adizero y más. Envío gratis y pago contra entrega.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_URL,
    siteName: MARCA.nombre,
    title: "PACEFORM — Equipamiento para correr en Colombia",
    description:
      "Equipamiento de running seleccionado para Colombia. Envío gratis y pago contra entrega.",
    images: [
      {
        url: `${SITE_URL}/og-paceform.png`,
        width: 1200,
        height: 630,
        alt: "PACEFORM — MEJOR EQUIPAMIENTO. MÁS KILÓMETROS.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PACEFORM — Equipamiento para correr en Colombia",
    description:
      "Equipamiento de running seleccionado para Colombia. Envío gratis contra entrega.",
    images: [`${SITE_URL}/og-paceform.png`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "16x16 32x32 48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-fondo text-carbon">
        <CartProvider>
          <TopBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFlotante />
        </CartProvider>
      </body>
    </html>
  );
}
