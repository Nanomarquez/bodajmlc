/**
 * Toda la información editable de la invitación vive en este archivo.
 *
 * - `date` mueve la cuenta regresiva, la fecha visible y la hora de la ceremonia.
 * - Lugares, alias, WhatsApp y fotos se cambian acá.
 * - Las imágenes están en `public/gallery`. Reemplazá el archivo y actualizá el texto alternativo.
 */

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const wedding = {
  siteUrl,

  /** Fecha y hora de la ceremonia. Usá horario de Argentina, con -03:00. */
  date: "2027-01-23T20:00:00-03:00",

  couples: [
    {
      a: "Analia Marquez",
      b: "Javier Montes",
      short: "Analia & Javier",
      monogram: "A & J",
    },
    {
      a: "Lorena Marquez",
      b: "Claudio Chavez",
      short: "Lorena & Claudio",
      monogram: "L & C",
    },
  ],

  tagline: "Dos historias, un mismo día, una celebración inolvidable.",

  invitation: [
    "Hay momentos que merecen ser compartidos y celebrados. Hoy queremos reunir a las personas que más queremos para vivir juntos uno de los días más especiales de nuestras vidas.",
    "Nos encantaría que formes parte de esta celebración tan especial.",
  ],

  ceremony: {
    place: "Nombre del lugar",
    address: "Dirección de la ceremonia",
  },

  celebration: {
    time: "21:30 h",
    place: "Nombre del salón",
    address: "Dirección de la celebración",
  },

  gift: {
    alias: "alias.mercadopago",
    holder: "Nombre del titular",
  },

  rsvp: {
    /** Número con código de país, sin + ni espacios. Ejemplo: 5491112345678 */
    phone: "5491112345678",
    minGuests: 1,
    maxGuests: 8,
    template:
      "Hola, soy {nombre}. Confirmo mi asistencia ({cantidad}) a la boda de Analia & Javier y Lorena & Claudio.",
  },

  gallery: [
    {
      src: "/gallery/01.jpg",
      alt: "Pareja de novios bajo un velo movido por el viento",
      focus: "center 58%",
    },
    {
      src: "/gallery/02.jpg",
      alt: "Ramo de novia con flores blancas, rosas y follaje",
      focus: "76% 58%",
    },
    {
      src: "/gallery/03.jpg",
      alt: "Pareja de novios junto al mar",
      focus: "center 42%",
    },
    {
      src: "/gallery/04.jpg",
      alt: "Mesa de celebración con velas, cristalería y eucalipto",
      focus: "center bottom",
    },
    {
      src: "/gallery/05.jpg",
      alt: "Manos de los novios entrelazadas en un jardín",
      focus: "center center",
    },
    {
      src: "/gallery/06.jpg",
      alt: "Alianzas de oro sobre lino",
      focus: "center center",
    },
  ],

  closing: "¡Los esperamos para celebrar juntos!",

  seo: {
    title: "Analia & Javier · Lorena & Claudio — Nos casamos",
    description:
      "Dos historias, un mismo día, una celebración inolvidable. Invitación a la boda de Analia Marquez y Javier Montes, y de Lorena Marquez y Claudio Chavez.",
  },
} as const;

export type Couple = (typeof wedding.couples)[number];
export type GalleryImage = (typeof wedding.gallery)[number];
