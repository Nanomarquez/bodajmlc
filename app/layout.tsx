import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { wedding } from "@/lib/config";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(wedding.siteUrl),
  title: wedding.seo.title,
  description: wedding.seo.description,
  applicationName: "Nos casamos",
  alternates: { canonical: "/" },
  openGraph: {
    title: wedding.seo.title,
    description: wedding.seo.description,
    locale: "es_AR",
    type: "website",
    siteName: "Analia & Javier · Lorena & Claudio",
  },
  twitter: {
    card: "summary_large_image",
    title: wedding.seo.title,
    description: wedding.seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es" className={`${serif.variable} ${sans.variable}`}>
      <body className="bg-ivory font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
