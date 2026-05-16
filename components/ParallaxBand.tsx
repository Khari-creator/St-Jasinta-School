"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import type { SchoolProfile } from "@/data/schools";

type ParallaxBandProps = {
  school: SchoolProfile;
  eyebrow: string;
  title: string;
  description: string;
  chips: string[];
};

export default function ParallaxBand({
  school,
  eyebrow,
  title,
  description,
  chips
}: ParallaxBandProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const bandY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section ref={ref} className="shell section-space">
      <div
        className="relative overflow-hidden rounded-[1.9rem] border border-slate-200 px-6 py-10 text-white shadow-panel sm:px-8 lg:px-12 lg:py-14"
        style={{
          backgroundImage: `linear-gradient(135deg, #10233a 0%, ${school.theme.primary} 58%, #173455 100%)`
        }}
      >
        <motion.div
          style={{ y: bandY }}
          className="absolute inset-0 bg-grain opacity-70"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em]">
              {eyebrow}
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-white/82 sm:text-lg">{description}</p>
          </div>

          <div className="grid gap-3">
            {chips.map((chip, index) => (
              <motion.div
                key={chip}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-2xl border border-white/14 bg-white/10 px-4 py-4 text-sm leading-7 text-white/86 backdrop-blur"
              >
                {chip}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
