"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easeLuxury } from "@/lib/motion";

type FadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function FadeIn({ children, className = "", delay = 0, y = 18 }: FadeProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`motion-block ${className}`}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0 : 0.95,
        delay: reduce ? 0 : delay,
        ease: easeLuxury,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({ children, className = "", delay = 0, y = 26 }: FadeProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`motion-block ${className}`}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: reduce ? 0 : 0.9,
        delay: reduce ? 0 : delay,
        ease: easeLuxury,
      }}
    >
      {children}
    </motion.div>
  );
}

export function ExpandRule({
  delay = 0,
  className = "",
}: {
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={`motion-block block h-px origin-center bg-sage/70 ${className}`}
      initial={{ scaleX: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{
        duration: reduce ? 0 : 1.05,
        delay: reduce ? 0 : delay,
        ease: easeLuxury,
      }}
    />
  );
}
