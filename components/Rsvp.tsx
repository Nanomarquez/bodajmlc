"use client";

import { Minus, Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { wedding } from "@/lib/config";
import { buildRsvpMessage, whatsappUrl } from "@/lib/format";
import { Sprig } from "@/components/Botanicals";
import { Reveal } from "@/components/Reveal";
import { buttonClass } from "@/components/TextLink";

export function Rsvp() {
  const [name, setName] = useState("");
  const [count, setCount] = useState<number>(wedding.rsvp.minGuests);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const guest = name.trim().replace(/\s+/g, " ");
    if (guest.length < 2) {
      setError("Escribí tu nombre para que podamos identificarte.");
      return;
    }
    setError("");
    window.open(whatsappUrl(buildRsvpMessage(guest, count)), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="asistencia" className="relative overflow-clip bg-sage-ink px-6 py-24 text-ivory sm:px-10 md:py-32">
      <Sprig className="pointer-events-none absolute -top-6 left-0 h-48 w-16 rotate-12 text-ivory/15" />
      <Sprig className="pointer-events-none absolute right-0 -bottom-8 h-52 w-16 -rotate-12 text-ivory/15 md:scale-x-[-1]" />

      <Reveal className="relative mx-auto max-w-xl text-center">
        <h2 className="font-serif text-4xl font-light tracking-[0.08em] uppercase sm:text-6xl">
          ¿Nos acompañás?
        </h2>
        <p className="mt-6 font-serif text-xl leading-relaxed text-ivory/85 italic sm:text-2xl">
          Queremos compartir este día con vos. Confirmá tu asistencia para que podamos preparar
          todo con mucho cariño.
        </p>

        <form onSubmit={submit} className="mt-10" noValidate>
          <label htmlFor="guest-name" className="font-sans text-[0.66rem] tracking-[0.28em] text-ivory/70 uppercase">
            Tu nombre
          </label>
          <input
            id="guest-name"
            name="name"
            autoComplete="name"
            maxLength={80}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (error) setError("");
            }}
            placeholder="Escribí tu nombre"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "guest-error" : undefined}
            className="mt-3 w-full border-b border-ivory/35 bg-transparent py-3 text-center font-serif text-2xl text-ivory outline-none placeholder:text-ivory/45 focus:border-ivory"
          />

          <div className="mt-8">
            <p id="guest-count-label" className="font-sans text-[0.66rem] tracking-[0.28em] text-ivory/70 uppercase">
              Personas
            </p>
            <div className="mt-3 flex items-center justify-center gap-5" role="group" aria-labelledby="guest-count-label">
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center border border-ivory/40 text-ivory transition hover:bg-ivory hover:text-sage-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory disabled:opacity-40"
                onClick={() => setCount((value) => Math.max(wedding.rsvp.minGuests, value - 1))}
                disabled={count <= wedding.rsvp.minGuests}
                aria-label="Menos personas"
              >
                <Minus className="size-4" strokeWidth={1.5} />
              </button>
              <span className="min-w-10 font-serif text-4xl lining-nums tabular-nums">{count}</span>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center border border-ivory/40 text-ivory transition hover:bg-ivory hover:text-sage-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory disabled:opacity-40"
                onClick={() => setCount((value) => Math.min(wedding.rsvp.maxGuests, value + 1))}
                disabled={count >= wedding.rsvp.maxGuests}
                aria-label="Más personas"
              >
                <Plus className="size-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {error ? (
            <p id="guest-error" className="mt-5 font-serif text-base text-sand italic" role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit" className={`${buttonClass("lightSolid")} mt-9`}>
            Confirmar asistencia
          </button>
        </form>
      </Reveal>
    </section>
  );
}
