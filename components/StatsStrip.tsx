"use client";

import { motion } from "framer-motion";

import type { SchoolProfile } from "@/data/schools";
import { iconMap } from "@/lib/icon-map";

type StatsStripProps = {
  school: SchoolProfile;
};

export default function StatsStrip({ school }: StatsStripProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {school.stats.map((stat, index) => {
        const Icon = iconMap[stat.icon];

        return (
          <motion.article
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            className="border border-slate-200 bg-white p-6 shadow-[0_18px_38px_-28px_rgba(15,23,42,0.18)]"
            style={{ borderRadius: "1.2rem" }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-[0.95rem] bg-[var(--school-tint)] text-[var(--school-primary)]">
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-slate-500">{stat.label}</p>
            <p className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-950">{stat.value}</p>
          </motion.article>
        );
      })}
    </div>
  );
}
