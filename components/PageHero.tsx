import type { SchoolProfile } from "@/data/schools";
import MotionReveal from "@/components/MotionReveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  school: SchoolProfile;
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({
  school,
  eyebrow,
  title,
  description
}: PageHeroProps) {
  const softVariant = school.id === "st-jacinta";

  return (
    <section className="shell pt-6 sm:pt-8">
      <MotionReveal>
        <div
          className={cn(
            "relative overflow-hidden border shadow-panel",
            softVariant
              ? "rounded-[2.35rem] border-slate-200"
              : "rounded-[1.8rem] border-slate-200"
          )}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${school.heroImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(108deg, rgba(8,12,18,0.88) 0%, rgba(13,32,50,0.8) 52%, rgba(21,76,121,0.34) 100%)"
            }}
          />
          <div className="absolute inset-0 bg-grain opacity-80" />
          <div className="relative max-w-4xl space-y-5 px-6 py-16 text-white sm:px-8 sm:py-20 lg:px-12">
            <span
              className={cn(
                "inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em]"
              )}
            >
              {eyebrow}
            </span>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-white/80 sm:text-lg">{description}</p>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
