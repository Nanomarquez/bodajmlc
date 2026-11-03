import { wedding } from "@/lib/config";

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

export function buildRsvpMessage(name: string, count: number) {
  const cantidad = count === 1 ? "1 persona" : `${count} personas`;
  return wedding.rsvp.template
    .replaceAll("{nombre}", name.trim())
    .replaceAll("{cantidad}", cantidad);
}

export function whatsappUrl(message: string) {
  const phone = wedding.rsvp.phone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
