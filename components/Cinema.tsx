"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useHost, useOrderedCouples } from "@/components/HostContext";
import { preloadMusic, setAmbienceMuted, startAmbience } from "@/lib/ambience";

type CinemaValue = {
  ready: boolean;
};

const CinemaContext = createContext<CinemaValue>({ ready: true });

export function useSceneReady() {
  const reduce = useReducedMotion();
  const { ready } = useContext(CinemaContext);
  return Boolean(reduce) || ready;
}

const petals = [
  { left: "6%", delay: "0s", duration: "15s", size: 14, drift: "28px" },
  { left: "16%", delay: "-5s", duration: "19s", size: 11, drift: "-22px" },
  { left: "28%", delay: "-9s", duration: "17s", size: 16, drift: "16px" },
  { left: "41%", delay: "-2s", duration: "21s", size: 12, drift: "-12px" },
  { left: "54%", delay: "-12s", duration: "16s", size: 15, drift: "24px" },
  { left: "67%", delay: "-7s", duration: "20s", size: 11, drift: "-18px" },
  { left: "79%", delay: "-14s", duration: "18s", size: 16, drift: "14px" },
  { left: "91%", delay: "-4s", duration: "22s", size: 12, drift: "-20px" },
];

function PetalField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[35] overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.left}
          className="petal"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.4,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            ["--drift" as string]: petal.drift,
          }}
        />
      ))}
    </div>
  );
}

const paperEase = [0.45, 0.05, 0.2, 1] as const;

const fold = "#9a7d5c";

function EnvelopeAlign({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-5 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="relative w-[min(86vw,26.5rem)]">
        <div className="relative aspect-[3/4.15] w-full">{children}</div>
        {footer}
      </div>
    </div>
  );
}

function EnvelopeBody({ opening }: { opening: boolean }) {
  return (
    <EnvelopeAlign
      footer={
        <motion.p
          className="pointer-events-none absolute -bottom-10 left-0 w-full text-center font-sans text-[0.62rem] tracking-[0.32em] text-[#6d6458] uppercase"
          initial={false}
          animate={{ opacity: opening ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          Tocá el sello
        </motion.p>
      }
    >
      <svg
        className="absolute inset-0 h-full w-full drop-shadow-[0_18px_36px_rgba(48,36,20,0.12)]"
        viewBox="0 0 300 415"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill="#ffffff" fillRule="evenodd" d="M0,0 H300 V415 H0 Z M0,0 L150,274 L300,0 Z" />
        <polyline
          points="0,415 150,322 300,415"
          fill="none"
          stroke={fold}
          strokeWidth="1.75"
          vectorEffect="non-scaling-stroke"
        />
        <line x1="1" y1="1" x2="1" y2="414" stroke={fold} strokeWidth="1.75" vectorEffect="non-scaling-stroke" />
        <line x1="299" y1="1" x2="299" y2="414" stroke={fold} strokeWidth="1.75" vectorEffect="non-scaling-stroke" />
        <line x1="1" y1="414" x2="299" y2="414" stroke={fold} strokeWidth="1.75" vectorEffect="non-scaling-stroke" />
      </svg>
    </EnvelopeAlign>
  );
}

function EnvelopeFlap({
  opening,
  seals,
  onOpen,
}: {
  opening: boolean;
  seals: readonly { src: string }[];
  onOpen: () => void;
}) {
  const sealSize = seals.length > 1 ? "h-[7.6rem] w-[7.6rem]" : "h-[9.25rem] w-[9.25rem]";

  return (
    <EnvelopeAlign>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 300 415"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polyline
          points="0,0 150,274 300,0"
          fill="none"
          stroke={fold}
          strokeWidth="2.25"
          vectorEffect="non-scaling-stroke"
        />
        <line x1="1" y1="1" x2="299" y2="1" stroke={fold} strokeWidth="1.75" vectorEffect="non-scaling-stroke" />
      </svg>
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[70%] origin-top"
        initial={false}
        animate={{ scaleY: opening ? -1 : 1 }}
        transition={{ duration: 0.75, delay: 0.28, ease: paperEase }}
      >
        <svg viewBox="0 0 300 290" className="h-full w-full overflow-visible" preserveAspectRatio="none">
          <polygon
            points="1.2,1.2 298.8,1.2 150,287.5"
            fill="#ffffff"
            stroke={fold}
            strokeWidth="2.25"
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </motion.div>
      <motion.button
        type="button"
        onClick={onOpen}
        disabled={opening}
        aria-label="Abrir la carta"
        className="pointer-events-auto absolute top-[69%] left-1/2 z-10 flex touch-manipulation items-center justify-center"
        initial={false}
        whileTap={opening ? undefined : { scale: 0.9, x: "-50%", y: "-50%" }}
        animate={
          opening
            ? {
                opacity: [1, 1, 1, 0],
                scale: [1, 0.9, 1.05, 1.14],
                rotate: [0, -3, 7, 16],
                x: "-50%",
                y: ["-50%", "-50%", "-64%", "-84%"],
              }
            : { opacity: 1, scale: 1, rotate: 0, x: "-50%", y: "-50%" }
        }
        transition={
          opening
            ? { duration: 0.92, delay: 0.02, times: [0, 0.2, 0.48, 1], ease: paperEase }
            : { duration: 0.2 }
        }
      >
        {seals.map((seal) => (
          <img
            key={seal.src}
            src={seal.src}
            alt=""
            draggable={false}
            className={`pointer-events-none drop-shadow-[0_16px_16px_rgba(36,48,28,0.32)] ${sealSize}`}
          />
        ))}
      </motion.button>
    </EnvelopeAlign>
  );
}

function SoundToggle({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={!muted}
      aria-label={muted ? "Activar música" : "Silenciar música"}
      className="fixed top-4 right-4 z-[45] border border-sage/30 bg-ivory/80 px-3 py-2 font-sans text-[0.58rem] tracking-[0.22em] text-sage-deep uppercase backdrop-blur-sm transition hover:bg-ivory"
    >
      {muted ? "Sonido" : "Silenciar"}
    </button>
  );
}

export function Cinema({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const host = useHost();
  const ordered = useOrderedCouples();
  const seals = (host ? [ordered[0]] : ordered).map((couple) => ({
    src: `/seals/${couple.slug}.png`,
  }));
  const [phase, setPhase] = useState<"closed" | "opening" | "opened">("closed");
  const [flapUp, setFlapUp] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [emerging, setEmerging] = useState(false);
  const [ready, setReady] = useState(true);
  const [muted, setMuted] = useState(false);
  const timers = useRef<number[]>([]);
  const value = useMemo(() => ({ ready }), [ready]);

  useEffect(() => {
    if (reduce) {
      setPhase("opened");
      setReady(true);
      return;
    }
    preloadMusic();
  }, [reduce]);

  useEffect(() => {
    if (phase === "opened" || reduce) {
      document.body.style.overflow = "";
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase, reduce]);

  useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

  async function enter() {
    if (phase !== "closed") return;
    setPhase("opening");
    timers.current.push(window.setTimeout(() => setFlapUp(true), 1080));
    timers.current.push(window.setTimeout(() => setLeaving(true), 2100));
    timers.current.push(window.setTimeout(() => setEmerging(true), 3100));
    timers.current.push(window.setTimeout(() => setPhase("opened"), 4400));
    try {
      await startAmbience();
      setAmbienceMuted(false);
    } catch {
      setMuted(true);
    }
  }

  function toggleSound() {
    const next = !muted;
    setMuted(next);
    if (!next) {
      startAmbience()
        .then(() => setAmbienceMuted(false))
        .catch(() => setMuted(true));
      return;
    }
    setAmbienceMuted(true);
  }

  return (
    <CinemaContext.Provider value={value}>
      {phase === "opened" && !reduce ? <PetalField /> : null}
      {phase === "opened" && !reduce ? <SoundToggle muted={muted} onToggle={toggleSound} /> : null}
      <div className={phase === "opened" ? undefined : "relative z-10 h-svh overflow-hidden"}>
        <motion.div
          className={phase === "opened" ? undefined : "h-svh overflow-hidden"}
          style={{ transformOrigin: "center center" }}
          initial={false}
          animate={{
            scale: emerging || phase === "opened" ? 1 : 0.5,
            y: flapUp && !emerging ? "-12%" : "0%",
          }}
          transition={{
            scale: { duration: emerging ? 1.15 : 0, ease: paperEase },
            y: {
              duration: flapUp && !emerging ? 0.6 : emerging ? 1.15 : 0,
              ease: paperEase,
            },
          }}
        >
          {children}
        </motion.div>
      </div>
      {phase !== "opened" && !reduce ? (
        <div className="pointer-events-none fixed inset-0 z-0 bg-white" />
      ) : null}
      {phase !== "opened" && !reduce ? (
        <motion.div
          className="pointer-events-none fixed inset-0"
          initial={false}
          animate={{ y: leaving ? "115%" : "0%", zIndex: flapUp ? 2 : 90 }}
          transition={{
            y: { duration: 0.9, ease: paperEase },
            zIndex: { duration: 0 },
          }}
        >
          <EnvelopeFlap opening={phase === "opening"} seals={seals} onOpen={enter} />
        </motion.div>
      ) : null}
      {phase !== "opened" && !reduce ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[80]"
          initial={false}
          animate={{ y: leaving ? "115%" : "0%" }}
          transition={{ duration: 0.9, ease: paperEase }}
        >
          <EnvelopeBody opening={phase === "opening"} />
        </motion.div>
      ) : null}
    </CinemaContext.Provider>
  );
}
