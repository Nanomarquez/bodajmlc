"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { wedding } from "@/lib/config";
import { getTimeLeft, getWeddingDateParts, type TimeLeft } from "@/lib/format";
import { easeLuxury } from "@/lib/motion";
import { Eyebrow } from "@/components/Botanicals";
import { Reveal } from "@/components/Reveal";

const units = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Minutos" },
  { key: "seconds", label: "Segundos" },
] as const;

function Unit({ value, label }: { value: number; label: string }) {
  const reduce = useReducedMotion();
  const text = String(value).padStart(2, "0");

  return (
    <div className="flex min-w-0 flex-col items-center px-1">
      <div className="font-serif text-[clamp(2.15rem,8vw,4.75rem)] leading-none font-light text-sage-ink lining-nums tabular-nums">
        <motion.span
          key={text}
          suppressHydrationWarning
          className="motion-block block"
          initial={reduce ? false : { opacity: 0.25, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.28, ease: easeLuxury }}
        >
          {text}
        </motion.span>
      </div>
      <span className="mt-3 max-w-full text-center font-sans text-[clamp(0.48rem,2.4vw,0.72rem)] leading-tight tracking-[0.16em] text-sage-deep uppercase sm:tracking-[0.28em]">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const date = getWeddingDateParts();
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTime(getTimeLeft(wedding.date));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const shown = time ?? { days: 0, hours: 0, minutes: 0, seconds: 0, done: false };

  return (
    <section className="bg-mist px-4 py-24 sm:px-10 md:py-32" aria-labelledby="cuenta-titulo">
      <Reveal className="mx-auto max-w-4xl text-center">
        <Eyebrow>Cuenta regresiva</Eyebrow>
        <h2
          id="cuenta-titulo"
          className="font-serif text-3xl font-light text-sage-ink italic sm:text-5xl"
        >
          {date.long}
        </h2>

        {shown.done ? (
          <p className="mt-12 font-serif text-3xl text-sage-deep italic">Hoy es el día.</p>
        ) : (
          <div
            role="timer"
            aria-label="Cuenta regresiva para la ceremonia"
            className="mt-12 grid grid-cols-4 divide-x divide-sage/25"
          >
            {units.map((unit) => (
              <Unit key={unit.key} value={shown[unit.key]} label={unit.label} />
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}
