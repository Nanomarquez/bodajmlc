"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { wedding } from "@/lib/config";
import { easeLuxury } from "@/lib/motion";
import { Eyebrow } from "@/components/Botanicals";
import { FloralField } from "@/components/FloralField";
import { Reveal } from "@/components/Reveal";
import { buttonClass } from "@/components/TextLink";

export function Gifts() {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  async function copyAlias() {
    const value = wedding.gift.alias;
    setFailed(false);

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      try {
        const area = document.createElement("textarea");
        area.value = value;
        area.setAttribute("readonly", "");
        area.style.position = "fixed";
        area.style.left = "-9999px";
        document.body.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(area);
        if (!ok) throw new Error("copy failed");
        setCopied(true);
      } catch {
        setCopied(false);
        setFailed(true);
        return;
      }
    }

    window.setTimeout(() => setCopied(false), 2400);
  }

  return (
    <section id="regalos" className="relative overflow-clip bg-ivory px-6 py-24 sm:px-10 md:py-32">
      <FloralField src="/gallery/bg-2.png" />
      <Reveal className="relative mx-auto max-w-xl text-center">
        <Eyebrow>Regalos</Eyebrow>
        <h2 className="text-balance font-serif text-[1.65rem] leading-snug font-light tracking-[0.08em] text-sage-ink uppercase sm:text-3xl">
          El mejor regalo es compartir este momento con vos.
        </h2>
        <p className="mt-6 font-serif text-xl leading-relaxed text-stone italic sm:text-2xl">
          Pero si además querés hacernos un regalo, podés colaborar con nuestra nueva historia.
        </p>

        <div className="mt-10 border border-sage/25 p-2 sm:p-3">
          <div className="border border-sage/15 bg-paper px-5 py-8 sm:px-8">
            <Image
              src="/gallery/mp-logo.png"
              alt="Mercado Pago"
              width={1875}
              height={489}
              className="mx-auto w-auto h-6"
            />
            <p className="mt-7 font-sans text-[0.62rem] tracking-[0.28em] text-stone uppercase">
              Alias
            </p>
            <p className="mt-2 font-serif text-3xl break-all text-sage-ink select-all sm:text-4xl">
              {wedding.gift.alias}
            </p>
            <p className="mt-5 font-sans text-[0.62rem] tracking-[0.28em] text-stone uppercase">
              Titular
            </p>
            <p className="mt-2 font-serif text-2xl text-sage-ink">{wedding.gift.holder}</p>

            <button type="button" onClick={copyAlias} className={`${buttonClass("solid")} mt-8`}>
              {copied ? <Check className="size-3.5" strokeWidth={1.75} aria-hidden="true" /> : <Copy className="size-3.5" strokeWidth={1.5} aria-hidden="true" />}
              Copiar alias
            </button>

            <div className="mt-4 min-h-7" aria-live="polite">
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.p
                    key="copied"
                    className="motion-block font-serif text-lg text-sage-deep italic"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.35, ease: easeLuxury }}
                  >
                    ¡Alias copiado!
                  </motion.p>
                ) : null}
                {failed ? (
                  <motion.p
                    key="failed"
                    className="font-serif text-base text-stone italic"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    No se pudo copiar. Seleccioná el alias para copiarlo a mano.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
