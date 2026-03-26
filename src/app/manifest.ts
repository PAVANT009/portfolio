import type { MetadataRoute } from "next";

const siteName = "Pavan Teja Kumar Portfolio";
const shortName = "Pavan Teja";
const description =
  "Portfolio of Pavan Teja Kumar, a full stack developer building modern web apps with React, Next.js, and Node.js.";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: shortName,
    description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0b0f",
    theme_color: "#0b0b0f",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
