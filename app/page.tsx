import { Closing } from "@/components/Closing";
import { Countdown } from "@/components/Countdown";
import { EventDetails } from "@/components/EventDetails";
import { Gallery } from "@/components/Gallery";
import { Gifts } from "@/components/Gifts";
import { Grain } from "@/components/Grain";
import { Hero } from "@/components/Hero";
import { Message } from "@/components/Message";
import { Rsvp } from "@/components/Rsvp";
import { ScrollProgress } from "@/components/ScrollProgress";
import { wedding } from "@/lib/config";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Boda de Analia & Javier y Lorena & Claudio",
  description: wedding.seo.description,
  startDate: wedding.date,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: wedding.ceremony.place,
    address: wedding.ceremony.address,
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Grain />
      <main>
        <Hero />
        <Message />
        <Countdown />
        <EventDetails />
        <Gallery />
        <Gifts />
        <Rsvp />
        <Closing />
      </main>
    </>
  );
}
