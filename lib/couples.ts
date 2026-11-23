import { wedding, type Couple, type CoupleSlug, type HostSlug } from "@/lib/config";

export function isCoupleSlug(value: string): value is CoupleSlug {
  return wedding.couples.some((couple) => couple.slug === value);
}

export function getCoupleBySlug(slug: CoupleSlug): Couple {
  const couple = wedding.couples.find((item) => item.slug === slug);
  if (!couple) {
    throw new Error(`Unknown couple slug: ${slug}`);
  }
  return couple;
}

/** Pareja anfitriona. En `/` usa la primera pareja para regalos y RSVP. */
export function getHostCouple(host: HostSlug = null): Couple {
  if (!host) return wedding.couples[0];
  return getCoupleBySlug(host);
}

/** Orden visual: anfitriona primero; en `/` mantiene el orden de la config. */
export function getOrderedCouples(host: HostSlug = null): [Couple, Couple] {
  const [first, second] = wedding.couples;
  if (!host || host === first.slug) return [first, second];
  return [second, first];
}

export function getPageSeo(host: HostSlug = null) {
  if (!host) return wedding.seo;
  return getCoupleBySlug(host).seo;
}

export function getCanonicalPath(host: HostSlug = null) {
  return host ? `/${host}` : "/";
}
