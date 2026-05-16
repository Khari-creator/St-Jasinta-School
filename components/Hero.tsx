"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { SchoolProfile } from "@/data/schools";
import { cn } from "@/lib/utils";

type HeroProps = {
  school: SchoolProfile;
};

export default function Hero({ school }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const heroImageFit = school.heroImageFit ?? "cover";
  const heroImagePosition = school.heroImagePosition ?? "center center";
  const heroHeight = "min-h-[100svh]";
  const titleLines = school.hero.titleLines.length > 0 ? school.hero.titleLines : [school.name];
  const heroBackgroundImages = useMemo(
    () =>
      school.hero.backgroundImages && school.hero.backgroundImages.length > 0
        ? school.hero.backgroundImages
        : [school.heroImage],
    [school.hero.backgroundImages, school.heroImage]
  );
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0);
  const activeHeroImage = heroBackgroundImages[activeBackgroundIndex] ?? school.heroImage;

  useEffect(() => {
    setActiveBackgroundIndex(0);
  }, [school.id]);

  useEffect(() => {
    if (prefersReducedMotion || heroBackgroundImages.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveBackgroundIndex((currentIndex) => (currentIndex + 1) % heroBackgroundImages.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, [heroBackgroundImages.length, prefersReducedMotion]);

  return (
    <section className={cn("relative -mt-[7.25rem] overflow-hidden md:-mt-[8rem]", heroHeight)}>
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`glow-${activeHeroImage}`}
            className="absolute inset-0"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={prefersReducedMotion ? undefined : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={activeHeroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-20 blur-[34px] scale-[1.08]"
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeHeroImage}
            className="absolute inset-0"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.08, x: 24 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1.02, x: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 1.08, x: -18 }}
            transition={prefersReducedMotion ? undefined : { duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={activeHeroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className={cn(
                heroImageFit === "contain"
                  ? "object-contain brightness-[1.02]"
                  : "object-cover brightness-[0.98]"
              )}
              style={{ objectPosition: heroImagePosition }}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,12,18,0.42)_0%,rgba(7,12,18,0.18)_36%,rgba(7,12,18,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,18,0.04)_0%,rgba(7,12,18,0.08)_58%,rgba(7,12,18,0.26)_100%)]" />
      </div>

      <div className={cn("relative flex items-center", heroHeight)}>
        <div className="shell pt-[8.5rem] sm:pt-[9rem] md:pt-[9.5rem]">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[52rem] space-y-6 text-white"
          >
            <h1 className="space-y-1.5">
              {titleLines.map((line, index) => (
                <motion.span
                  key={`${line}-${index}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : {
                          duration: 0.6,
                          delay: 0.08 + index * 0.08,
                          ease: [0.22, 1, 0.36, 1]
                        }
                  }
                  className={cn(
                    "block font-display font-semibold uppercase tracking-[-0.05em] text-white",
                    index === 0
                      ? "text-[clamp(3.15rem,6.4vw,5.8rem)] leading-[0.9]"
                      : "text-[clamp(2.2rem,4.2vw,4rem)] leading-[0.92] text-white/96"
                  )}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 0.55,
                      delay: 0.24,
                      ease: [0.22, 1, 0.36, 1]
                    }
              }
              className="flex flex-col gap-3 pt-2 sm:flex-row"
            >
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--school-secondary)] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-[0_18px_48px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5"
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white/14"
              >
                Contact School
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
