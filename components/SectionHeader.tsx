import type { SchoolProfile } from "@/data/schools";
import MotionReveal from "@/components/MotionReveal";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  school: SchoolProfile;
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeaderProps) {
  return (
    <MotionReveal>
      <div className={cn("space-y-4", align === "center" && "mx-auto max-w-3xl text-center")}>
        <span
          className="inline-flex rounded-full border border-slate-200 bg-[var(--school-tint)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--school-primary)]"
        >
          {eyebrow}
        </span>
        <div className="space-y-3">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-[3.25rem]">
            {title}
          </h2>
          <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">{description}</p>
        </div>
      </div>
    </MotionReveal>
  );
}
