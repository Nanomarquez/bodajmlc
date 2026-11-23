import type { Metadata } from "next";
import { wedding, type HostSlug } from "@/lib/config";
import { getCanonicalPath, getPageSeo } from "@/lib/couples";

const ogImage = {
  url: "/og.jpg",
  width: 625,
  height: 350,
  alt: "Alianzas de oro entre flores blancas",
  type: "image/jpeg",
} as const;

export function buildPageMetadata(host: HostSlug = null): Metadata {
  const seo = getPageSeo(host);
  const path = getCanonicalPath(host);
  const [first, second] = wedding.couples;
  const siteName = host
    ? getPageSeo(host).title.replace(" — Nos casamos", "")
    : `${first.short} · ${second.short}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: path },
    openGraph: {
      title: seo.title,
      description: seo.description,
      locale: "es_AR",
      type: "website",
      url: path,
      siteName,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [ogImage.url],
    },
  };
}
