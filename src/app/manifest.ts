import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PACEFORM | Equipamiento para correr",
    short_name: "PACEFORM",
    description: "Equipamiento de running para Colombia.",
    start_url: "/",
    display: "standalone",
    background_color: "#063D2E",
    theme_color: "#063D2E",
    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}