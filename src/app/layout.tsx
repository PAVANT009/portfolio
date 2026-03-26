import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";

const instagramSans = localFont({
  variable: "--font-instagram-sans",
  src: [
    { path: "../../public/instagram-sans-2/Instagram Sans Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/instagram-sans-2/Instagram Sans.ttf", weight: "400", style: "normal" },
    { path: "../../public/instagram-sans-2/Instagram Sans Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/instagram-sans-2/Instagram Sans Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/instagram-sans-2/Instagram Sans Headline.otf", weight: "800", style: "normal" },
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://thispavan.dev");

const siteName = "Pavan Teja Kumar";
const siteTitle = "Pavan Teja Kumar | Portfolio";
const siteDescription =
  "Portfolio of Pavan Teja Kumar, a full stack developer building modern web apps with React, Next.js, and Node.js.";
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  jobTitle: "Full Stack Developer",
  sameAs: [
    "https://www.linkedin.com/in/pavan-teja-kumar-65261035b/",
    "https://github.com/PAVANT009",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: `${siteName} Portfolio`,
  keywords: [
    "Pavan Teja Kumar",
    "Pavan Teja",
    "Pavan Kumar",
    "Pavan Teja Kumar portfolio",
    "Full stack developer",
    "MERN stack developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "JavaScript",
    "TypeScript",
    "Web developer",
    "Software engineer",
    "Portfolio",
  ],
  authors: [{ name: siteName, url: "https://www.linkedin.com/in/pavan-teja-kumar-65261035b/" }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "Technology",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0f" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instagramSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var e="theme",t=localStorage.getItem(e)||"dark";if(t==="system"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t}catch(n){}})();`,
          }}
        />
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
