import { ArrowUpRight, Calendar, Clock, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { wedding } from "@/lib/config";
import { getWeddingDateParts, mapsLinks, placeQuery } from "@/lib/format";
import { Eyebrow } from "@/components/Botanicals";
import { FloralField } from "@/components/FloralField";
import { Reveal } from "@/components/Reveal";
import { TextLink } from "@/components/TextLink";

function Detail({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-1 text-sage" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="font-sans text-[0.62rem] tracking-[0.24em] text-stone uppercase">{label}</dt>
        <dd className="mt-1 font-serif text-2xl leading-snug text-sage-ink">{value}</dd>
      </div>
    </div>
  );
}

function PlaceCard({
  title,
  rows,
  query,
}: {
  title: string;
  rows: { icon: ReactNode; label: string; value: string }[];
  query: string;
}) {
  const maps = mapsLinks(query);

  return (
    <article className="flex flex-col">
      <h3 className="font-serif text-4xl font-light text-sage-ink italic sm:text-5xl">{title}</h3>
      <dl className="mt-8 space-y-6">
        {rows.map((row) => (
          <Detail key={row.label} icon={row.icon} label={row.label} value={row.value} />
        ))}
      </dl>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <TextLink href={maps.directions} external className="w-full sm:w-auto">
          Cómo llegar
          <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
        </TextLink>
        <TextLink href={maps.view} external className="w-full sm:w-auto">
          Ver ubicación
          <ArrowUpRight className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
        </TextLink>
      </div>
    </article>
  );
}

export function EventDetails() {
  const date = getWeddingDateParts();
  const iconProps = { className: "size-4", strokeWidth: 1.25 } as const;

  return (
    <section id="evento" className="relative overflow-clip bg-ivory px-6 py-24 sm:px-10 md:py-36">
      <FloralField src="/gallery/bg-3.png" />
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <Eyebrow>El día</Eyebrow>
          <h2 className="text-center font-serif text-4xl font-light text-sage-ink italic sm:text-5xl">
            Ceremonia y celebración
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 md:mt-20 md:grid-cols-2 md:gap-0">
          <Reveal className="md:pr-14">
            <PlaceCard
              title="Ceremonia"
              query={placeQuery(wedding.ceremony.place, wedding.ceremony.address)}
              rows={[
                { icon: <Calendar {...iconProps} />, label: "Fecha", value: date.long },
                { icon: <Clock {...iconProps} />, label: "Hora", value: date.time },
                { icon: <MapPin {...iconProps} />, label: "Lugar", value: wedding.ceremony.place },
                {
                  icon: <MapPin {...iconProps} />,
                  label: "Dirección",
                  value: wedding.ceremony.address,
                },
              ]}
            />
          </Reveal>
          <Reveal delay={0.12} className="md:border-l md:border-sage/20 md:pl-14">
            <PlaceCard
              title="Celebración"
              query={placeQuery(wedding.celebration.place, wedding.celebration.address)}
              rows={[
                { icon: <Clock {...iconProps} />, label: "Hora", value: wedding.celebration.time },
                { icon: <MapPin {...iconProps} />, label: "Lugar", value: wedding.celebration.place },
                {
                  icon: <MapPin {...iconProps} />,
                  label: "Dirección",
                  value: wedding.celebration.address,
                },
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
