import { Closing } from "@/components/Closing";
import { Countdown } from "@/components/Countdown";
import { EventDetails } from "@/components/EventDetails";
import { Gallery } from "@/components/Gallery";
import { Gifts } from "@/components/Gifts";
import { Grain } from "@/components/Grain";
import { Hero } from "@/components/Hero";
import { Cinema } from "@/components/Cinema";
import { HostProvider } from "@/components/HostContext";
import { Message } from "@/components/Message";
import { Rsvp } from "@/components/Rsvp";
import { ScrollProgress } from "@/components/ScrollProgress";
import { wedding, type HostSlug } from "@/lib/config";
import { getOrderedCouples } from "@/lib/couples";

export function Invitation({ host = null }: { host?: HostSlug }) {
  const [first, second] = getOrderedCouples(host);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Boda de ${first.short} y ${second.short}`,
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

  return (
    <HostProvider host={host}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Cinema>
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
      </Cinema>
    </HostProvider>
  );
}
