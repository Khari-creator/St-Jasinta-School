import type { Program, SchoolProfile } from "@/data/schools";
import { cn } from "@/lib/utils";

type ProgramCardProps = {
  school: SchoolProfile;
  program: Program;
};

export default function ProgramCard({ school, program }: ProgramCardProps) {
  const softVariant = school.id === "st-jacinta";

  return (
    <article
      className={cn(
        "border p-6 shadow-[0_20px_52px_-34px_rgba(15,23,42,0.32)]",
        softVariant
          ? "rounded-[1.75rem] border-slate-200 bg-white"
          : "rounded-[1.35rem] border-slate-200 bg-white"
      )}
    >
      <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{program.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{program.summary}</p>
      <div className="mt-6 grid gap-3">
        {program.bullets.map((bullet, index) => (
          <div
            key={bullet}
            className={cn(
              "rounded-2xl px-4 py-3 text-sm",
              index === 0
                ? "bg-[var(--school-tint)] text-[var(--school-primary)]"
                : "bg-slate-100 text-slate-700"
            )}
          >
            {bullet}
          </div>
        ))}
      </div>
    </article>
  );
}
