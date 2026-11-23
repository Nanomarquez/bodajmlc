import { wedding, type HostSlug } from "@/lib/config";
import { getOrderedCouples } from "@/lib/couples";

export const TIME_ZONE = "America/Argentina/Buenos_Aires";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
};

export function getWeddingDate(iso = wedding.date) {
  return new Date(iso);
}

export function getWeddingDateParts(iso = wedding.date) {
  const date = getWeddingDate(iso);
  const longDate = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(date);

  const time = new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: TIME_ZONE,
  }).format(date);

  return {
    long: longDate.charAt(0).toUpperCase() + longDate.slice(1),
    time: `${time} h`,
  };
}

export function getTimeLeft(iso = wedding.date): TimeLeft {
  const diff = Math.max(0, getWeddingDate(iso).getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff === 0,
  };
}

export function placeQuery(place: string, address: string) {
  return `${place}, ${address}`;
}

export function mapsLinks(query: string) {
  const destination = encodeURIComponent(query);
  return {
    directions: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
    view: `https://www.google.com/maps/search/?api=1&query=${destination}`,
  };
}

function cleanName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function formatCoupleLine(host: HostSlug = null) {
  const [first, second] = getOrderedCouples(host);
  return `${first.short} y ${second.short}`;
}

export function buildRsvpMessage(
  firstName: string,
  lastName: string,
  count: number,
  host: HostSlug = null,
) {
  const nombre = cleanName(firstName);
  const apellido = cleanName(lastName);
  const guests = Math.max(1, count);
  const extras = guests - 1;
  const cantidad = guests === 1 ? "1 persona" : `${guests} personas`;
  const acompanantes =
    extras === 0 ? "" : extras === 1 ? " + 1 persona" : ` + ${extras} personas`;

  return wedding.rsvp.template
    .replaceAll("{nombre}", nombre)
    .replaceAll("{apellido}", apellido)
    .replaceAll("{acompanantes}", acompanantes)
    .replaceAll("{cantidad}", cantidad)
    .replaceAll("{parejas}", formatCoupleLine(host));
}

export function whatsappUrl(message: string, phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
