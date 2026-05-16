"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

import type { HeroProfile, SchoolProfile } from "@/data/schools";
import { cn } from "@/lib/utils";

type PortraitCardProps = {
  school: SchoolProfile;
  profile: HeroProfile;
  index: number;
};

export default function PortraitCard({
  school,
  profile,
  index
}: PortraitCardProps) {
  const [hasError, setHasError] = useState(false);
  const softVariant = school.id === "st-jacinta";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.16 + index * 0.08, duration: 0.7 }}
      whileHover={{ y: -8, rotate: index % 2 === 0 ? -1.2 : 1.2 }}
      className={cn(
        "group relative min-h-[220px] overflow-hidden border shadow-glass backdrop-blur",
        softVariant
          ? "rounded-[1.75rem] border-white/16 bg-white/10"
          : "rounded-[1.35rem] border-white/14 bg-slate-950/12"
      )}
    >
      <div className="absolute inset-0 overflow-hidden">
        {hasError ? (
          <div
            className="flex h-full items-center justify-center text-4xl font-semibold tracking-[0.3em] text-white"
            style={{
              backgroundImage: `linear-gradient(135deg, ${school.theme.primary}, ${school.theme.secondary})`
            }}
          >
            {school.initials}
          </div>
        ) : (
          <Image
            src={profile.image}
            alt={profile.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 320px"
            onError={() => setHasError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/20 to-slate-950/10" />
      </div>
      <div className="relative flex h-full flex-col justify-end space-y-2 p-5 text-white">
        <p
          className={cn(
            "text-[11px] uppercase tracking-[0.28em]",
            "text-sky-100"
          )}
        >
          {profile.role}
        </p>
        <h3 className="text-[1.75rem] font-semibold tracking-tight text-white">{profile.name}</h3>
        <p className="max-w-sm text-sm leading-6 text-white/76">{profile.note}</p>
      </div>
    </motion.article>
  );
}
