"use client";

import Image from "next/image";
import { useState } from "react";

import type { SchoolProfile } from "@/data/schools";
import { cn } from "@/lib/utils";

type SchoolLogoProps = {
  school: Pick<SchoolProfile, "id" | "logo" | "shortName" | "initials" | "theme">;
  className?: string;
  priority?: boolean;
};

export default function SchoolLogo({
  school,
  className,
  priority = false
}: SchoolLogoProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        "relative flex h-16 w-16 items-center justify-center overflow-hidden border text-lg font-semibold uppercase tracking-[0.28em] shadow-panel",
        school.id === "st-jacinta"
          ? "rounded-[1.25rem] border-slate-200 bg-white text-[var(--school-primary)]"
          : "rounded-[1rem] border-slate-200 bg-white text-[var(--school-primary)]",
        className
      )}
      style={{
        backgroundImage: hasError
          ? `linear-gradient(135deg, ${school.theme.tint}, ${school.theme.accent})`
          : undefined
      }}
    >
      {hasError ? (
        <span>{school.initials}</span>
      ) : (
        <Image
          src={school.logo}
          alt={`${school.shortName} logo`}
          fill
          className="object-contain p-3"
          sizes="64px"
          priority={priority}
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
