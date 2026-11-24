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

export function FadeIn({ children, className = "" }: FadeProps) {
  return <div className={className}>{children}</div>;
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

export function ExpandRule({ className = "" }: { delay?: number; className?: string }) {
  return <span aria-hidden="true" className={`block h-px bg-sage/70 ${className}`} />;
}
