"use client";

import { motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/lib/config";
import { getWeddingDateParts } from "@/lib/format";
import { easeLuxury } from "@/lib/motion";
import { Sprig } from "@/components/Botanicals";
import { FloralField } from "@/components/FloralField";
import { ExpandRule, FadeIn } from "@/components/Reveal";
import { TextLink } from "@/components/TextLink";

function CoupleBlock({
  names,
  delay,
}: {
  names: readonly [string, string];
  delay: number;
}) {
  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-2 text-center sm:max-w-sm">
      <FadeIn delay={delay}>
        <p className="font-serif text-[1.85rem] leading-none font-normal text-sage-ink italic sm:text-5xl lg:text-[3.15rem]">
          {names[0]}
        </p>
      </FadeIn>
      <FadeIn delay={delay + 0.16}>
        <p className="font-serif text-3xl leading-none text-sage italic sm:text-4xl">&</p>
      </FadeIn>
      <FadeIn delay={delay + 0.32}>
        <p className="font-serif text-[1.85rem] leading-none font-normal text-sage-ink italic sm:text-5xl lg:text-[3.15rem]">
          {names[1]}
        </p>
      </FadeIn>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const date = getWeddingDateParts();
  const [first, second] = wedding.couples;

  return (
    <section className="relative overflow-clip bg-ivory">
      <FloralField src="/gallery/bg-1.png" priority />
      <div className="pointer-events-none absolute inset-3 border border-sage/25 md:inset-5" />
      <div className="pointer-events-none absolute inset-[1.15rem] hidden border border-sage/15 md:inset-7 md:block" />

      <p className="absolute top-7 left-8 hidden font-serif text-sm tracking-[0.32em] text-sage italic md:block">
        {first.monogram}
      </p>
      <p className="absolute top-7 right-8 hidden font-serif text-sm tracking-[0.32em] text-sage italic md:block">
        {second.monogram}
      </p>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-6xl flex-col items-center justify-center px-6 py-8 text-center sm:px-10 sm:py-16">
        <FadeIn delay={0.05}>
          <p className="font-sans text-[0.68rem] font-medium tracking-[0.34em] text-sage uppercase">
            {date.long}
          </p>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-4 sm:mt-6">
          <h1 className="font-serif text-[clamp(2.7rem,10vw,7.4rem)] leading-[0.9] font-light tracking-[-0.03em] text-sage-ink italic">
            Nos casamos
          </h1>
        </FadeIn>

        <ExpandRule delay={0.55} className="mt-5 w-24 sm:mt-7 sm:w-36" />

        <div className="mt-6 flex w-full flex-col items-center gap-5 md:mt-12 md:flex-row md:items-center md:justify-center md:gap-0">
          <CoupleBlock names={[first.a, first.b]} delay={0.75} />
          <motion.div
            className="motion-block origin-center text-sage-deep/80"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0 : 1.1, delay: reduce ? 0 : 1.05, ease: easeLuxury }}
          >
            <Sprig className="h-20 w-10 md:mx-10 md:h-48 md:w-14 lg:mx-16" />
          </motion.div>
          <CoupleBlock names={[second.a, second.b]} delay={0.9} />
        </div>

        <ExpandRule delay={1.35} className="mt-8 w-16 sm:mt-10" />

        <FadeIn delay={1.5} className="mt-6 max-w-md">
          <p className="font-serif text-lg leading-relaxed text-stone italic sm:text-2xl">
            {wedding.tagline}
          </p>
        </FadeIn>

        <FadeIn delay={1.7} className="mt-6 md:mt-9">
          <TextLink href="#invitacion" variant="solid">
            Descubrí nuestra invitación
          </TextLink>
        </FadeIn>

        <FadeIn delay={1.9} className="hero-hint mt-8">
          <a href="#invitacion" className="flex flex-col items-center gap-3 text-sage/80">
            <span className="font-sans text-[0.62rem] tracking-[0.32em] uppercase">Deslizá</span>
            <span className="drip-line" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
