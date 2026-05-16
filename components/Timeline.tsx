"use client";

import { motion } from "framer-motion";

import type { SchoolProfile } from "@/data/schools";
import { cn } from "@/lib/utils";

type TimelineProps = {
  school: SchoolProfile;
};

export default function Timeline({ school }: TimelineProps) {
  const softVariant = school.id === "st-jacinta";

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-[var(--school-tint)] sm:left-1/2 sm:-translate-x-1/2" />
      <div className="space-y-6">
        {school.milestones.map((milestone, index) => (
          <motion.div
            key={`${milestone.year}-${milestone.title}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.05 }}
            className="relative pl-12 sm:grid sm:grid-cols-2 sm:pl-0"
          >
            <div
              className="absolute left-0 top-8 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[var(--school-tint)] bg-white text-[var(--school-primary)] sm:left-1/2 sm:-translate-x-1/2"
            >
              <span className="h-2 w-2 rounded-full bg-current" />
            </div>

            <div
              className={cn(
                "sm:pr-10",
                index % 2 === 0 ? "sm:text-right" : "sm:order-2 sm:pl-10 sm:text-left"
              )}
            >
              <span
                className="inline-flex rounded-full bg-[var(--school-tint)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--school-primary)]"
              >
                {milestone.year}
              </span>
            </div>

            <div
              className={cn(
                "mt-4 border bg-white p-6 sm:mt-0",
                softVariant
                  ? "rounded-[1.75rem] border-slate-200 bg-white"
                  : "rounded-[1.35rem] border-slate-200 bg-white",
                index % 2 === 0 ? "sm:ml-10" : "sm:order-1 sm:mr-10"
              )}
            >
              <h3 className="text-xl font-semibold tracking-tight text-slate-950">{milestone.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                {milestone.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
