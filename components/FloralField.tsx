"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function FloralField({
  src,
  priority = false,
}: {
  src: string;
  priority?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [18, -18]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div className="absolute -inset-8" style={{ y }}>
        <Image
          src={src}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className={reduce ? "object-cover object-center" : "floral-bloom object-cover object-center"}
        />
      </motion.div>
    </div>
  );
}
