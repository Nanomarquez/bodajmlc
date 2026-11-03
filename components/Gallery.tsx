"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { wedding, type GalleryImage } from "@/lib/config";
import { easeLuxury } from "@/lib/motion";
import { Eyebrow } from "@/components/Botanicals";

const frames = [
  "lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

const aspects = [
  "aspect-[3/4]",
  "aspect-[3/4]",
  "aspect-[16/10]",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[16/10]",
];

function Photo({
  image,
  index,
  progress,
  reduce,
}: {
  image: GalleryImage;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const travel = index % 2 === 0 ? 8 : 12;
  const y = useTransform(progress, [0, 1], [travel, -travel]);
  return (
    <motion.figure
      className={`motion-block group ${frames[index] ?? ""}`}
      initial={{ opacity: 0, y: reduce ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduce ? 0 : 0.85,
        delay: reduce ? 0 : (index % 3) * 0.08,
        ease: easeLuxury,
      }}
    >
      <div className="h-full border border-sage/15 bg-paper p-1.5 shadow-[0_28px_50px_-38px_rgba(44,59,50,0.7)] sm:p-2">
        <div className={`relative overflow-hidden ${aspects[index] ?? "aspect-[4/5]"}`}>
          <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes={
                index === 0
                  ? "(min-width: 1024px) 50vw, 100vw"
                  : "(min-width: 1024px) 42vw, 100vw"
              }
              className="origin-center object-cover scale-[1.08] transition duration-700 ease-out group-hover:scale-[1.12]"
              style={{ objectPosition: image.focus }}
            />
          </motion.div>
        </div>
      </div>
    </motion.figure>
  );
}

export function Gallery() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="galeria" ref={ref} className="px-4 py-24 sm:px-8 md:py-36">
      <div className="mx-auto mb-12 max-w-6xl text-center md:mb-16">
        <Eyebrow>Galería</Eyebrow>
        <h2 className="font-serif text-4xl font-light text-sage-ink italic sm:text-5xl">
          Dos historias, una misma luz
        </h2>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12">
        {wedding.gallery.map((image, index) => (
          <Photo
            key={image.src}
            image={image}
            index={index}
            progress={scrollYProgress}
            reduce={Boolean(reduce)}
          />
        ))}
      </div>
    </section>
  );
}
