"use client";

import { motion } from "framer-motion";

import type { Feature, SchoolProfile } from "@/data/schools";
import { iconMap } from "@/lib/icon-map";
import { cn } from "@/lib/utils";

type FeatureCardProps = {
  school: SchoolProfile;
  feature: Feature;
  index?: number;
};

export default function FeatureCard({
  school,
  feature,
  index = 0
}: FeatureCardProps) {
  const Icon = iconMap[feature.icon];
  const softVariant = school.id === "st-jacinta";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      whileHover={{ y: -4 }}
      className={cn(
        "border p-6 shadow-[0_20px_52px_-34px_rgba(15,23,42,0.32)]",
        softVariant
          ? "rounded-[1.75rem] border-slate-200 bg-white"
          : "rounded-[1.35rem] border-slate-200 bg-white"
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--school-tint)] text-[var(--school-primary)]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">{feature.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{feature.description}</p>
    </motion.article>
  );
}
