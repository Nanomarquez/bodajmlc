/**
 * Toda la información editable de la invitación vive en este archivo.
 *
 * - `date` mueve la cuenta regresiva, la fecha visible y la hora de la ceremonia.
 * - Cada pareja tiene su slug de enlace (`/aj`, `/lc`), Mercado Pago y WhatsApp.
 * - Lugares y fotos se cambian acá.
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
      slug: "aj",
      a: "Analía Márquez",
      b: "Javier Montes",
      short: "Analía & Javier",
      monogram: "A & J",
      gift: {
        alias: "anayloremarquez.80",
        holder: "Diana Lorena Márquez",
      },
      /** Número con código de país, sin + ni espacios. Ejemplo: 5491112345678 */
      rsvpPhone: "5491140977144",
      seo: {
        title: "Analía & Javier — Nos casamos",
        description:
          "Analía Márquez y Javier Montes se casan junto a Lorena Márquez y Claudio Chavez. Dos historias, un mismo día.",
      },
    },
    {
      slug: "lc",
      a: "Lorena Márquez",
      b: "Claudio Chavez",
      short: "Lorena & Claudio",
      monogram: "L & C",
      gift: {
        alias: "anayloremarquez.80",
        holder: "Diana Lorena Márquez",
      },
      rsvpPhone: "5491140977144",
      seo: {
        title: "Lorena & Claudio — Nos casamos",
        description:
          "Lorena Márquez y Claudio Chavez se casan junto a Analía Márquez y Javier Montes. Dos historias, un mismo día.",
      },
    },
  ],

  tagline: "Dos historias, un mismo día, una celebración inolvidable.",

  invitation: [
    "Hay momentos que merecen ser compartidos y celebrados. Hoy queremos reunir a las personas que más queremos para vivir juntos uno de los días más especiales de nuestras vidas.",
    "Nos encantaría que formes parte de esta celebración tan especial.",
  ],

  ceremony: {
    place: "La Casona Los Jazmines",
    address: "La Casona Los Jazmines",
    mapsUrl:
      "https://www.google.com/maps/search/La%20Casona%20Los%20Jazmines/@-34.46242338,-58.79593417,17z?hl=es",
  },

  celebration: {
    time: "21:30 h",
    place: "La Casona Los Jazmines",
    address: "La Casona Los Jazmines",
    mapsUrl:
      "https://www.google.com/maps/search/La%20Casona%20Los%20Jazmines/@-34.46242338,-58.79593417,17z?hl=es",
  },

  rsvp: {
    minGuests: 1,
    maxGuests: 8,
    /**
     * Placeholders:
     * - {nombre} / {apellido} → del invitado principal
     * - {acompanantes} → "" o " + 3 personas"
     * - {cantidad} → "1 persona" / "4 personas"
     * - {parejas} → pareja anfitriona primero (según /aj o /lc)
     */
    template:
      "Hola, soy {nombre} {apellido}{acompanantes}. Confirmo mi asistencia ({cantidad}) a la boda de {parejas}.",
  },

  /**
   * Si reemplazás una foto y sigue la anterior, subí `galleryVersion`
   * (ej. de 2 a 3) y recargá con Ctrl+Shift+R.
   */
  galleryVersion: 2,
  gallery: [
    {
      src: "/gallery/01.jpg",
      alt: "Las dos parejas con el niño en la celebración nocturna",
      focus: "center 35%",
    },
    {
      src: "/gallery/02.jpg",
      alt: "Las dos parejas con el niño bajo una pérgola de madera",
      focus: "center 30%",
    },
    {
      src: "/gallery/03.jpg",
      alt: "Las dos parejas con el niño vestidos de jean",
      focus: "center 30%",
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
    title: "Analía & Javier · Lorena & Claudio — Nos casamos",
    description:
      "Dos historias, un mismo día, una celebración inolvidable. Invitación a la boda de Analía Márquez y Javier Montes, y de Lorena Márquez y Claudio Chavez.",
  },
} as const;

export type CoupleSlug = (typeof wedding.couples)[number]["slug"];
export type Couple = (typeof wedding.couples)[number];
export type GalleryImage = (typeof wedding.gallery)[number];
/** `null` = vista equilibrada en `/`; gift/RSVP usan la primera pareja por defecto. */
export type HostSlug = CoupleSlug | null;
