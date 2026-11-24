"use client";

import { Minus, Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { wedding } from "@/lib/config";
import { buildRsvpMessage, whatsappUrl } from "@/lib/format";
import { Sprig } from "@/components/Botanicals";
import { useHost, useHostCouple } from "@/components/HostContext";
import { Reveal } from "@/components/Reveal";
import { buttonClass } from "@/components/TextLink";

const fieldClass =
  "mt-3 w-full border-b border-ivory/35 bg-transparent py-3 text-center font-serif text-2xl text-ivory outline-none placeholder:text-ivory/45 focus:border-ivory";

export function Rsvp() {
  const hostSlug = useHost();
  const host = useHostCouple();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [count, setCount] = useState<number>(wedding.rsvp.minGuests);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nombre = firstName.trim().replace(/\s+/g, " ");
    const apellido = lastName.trim().replace(/\s+/g, " ");

    if (nombre.length < 2) {
      setError("Escribí tu nombre.");
      return;
    }
    if (apellido.length < 2) {
      setError("Escribí tu apellido.");
      return;
    }

    setError("");
    window.open(
      whatsappUrl(buildRsvpMessage(nombre, apellido, count, hostSlug), host.rsvpPhone),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section id="asistencia" className="relative overflow-clip bg-sage-ink px-6 py-24 text-ivory sm:px-10 md:py-32">
      <div className="leaf-sway pointer-events-none absolute -top-6 left-0">
        <Sprig className="h-48 w-16 rotate-12 text-ivory/15" />
      </div>
      <div className="leaf-sway pointer-events-none absolute right-0 -bottom-8 [animation-duration:9s]">
        <Sprig className="h-52 w-16 -rotate-12 text-ivory/15 md:scale-x-[-1]" />
      </div>

      <Reveal className="relative mx-auto max-w-xl text-center">
        <h2 className="font-serif text-4xl font-light tracking-[0.08em] uppercase sm:text-6xl">
          ¿Nos acompañás?
        </h2>
        <p className="mt-6 font-serif text-xl leading-relaxed text-ivory/85 italic sm:text-2xl">
          Queremos compartir este día con vos. Confirmá tu asistencia para que podamos preparar
          todo con mucho cariño.
        </p>

        <form onSubmit={submit} className="mt-10" noValidate>
          <div>
            <label htmlFor="guest-first-name" className="font-sans text-[0.66rem] tracking-[0.28em] text-ivory/70 uppercase">
              Nombre
            </label>
            <input
              id="guest-first-name"
              name="firstName"
              autoComplete="given-name"
              required
              maxLength={60}
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
                if (error) setError("");
              }}
              placeholder="Tu nombre"
              aria-invalid={error.toLowerCase().includes("nombre") ? true : undefined}
              className={fieldClass}
            />
          </div>

          <div className="mt-8">
            <label htmlFor="guest-last-name" className="font-sans text-[0.66rem] tracking-[0.28em] text-ivory/70 uppercase">
              Apellido
            </label>
            <input
              id="guest-last-name"
              name="lastName"
              autoComplete="family-name"
              required
              maxLength={60}
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
                if (error) setError("");
              }}
              placeholder="Tu apellido"
              aria-invalid={error.toLowerCase().includes("apellido") ? true : undefined}
              className={fieldClass}
            />
          </div>

          <div className="mt-10">
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
            {count > 1 ? (
              <p className="mt-3 font-serif text-base text-ivory/70 italic">
                Vos + {count - 1} {count - 1 === 1 ? "persona" : "personas"}
              </p>
            ) : null}
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
