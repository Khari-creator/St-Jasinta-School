import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

import MotionReveal from "@/components/MotionReveal";
import type { SchoolProfile } from "@/data/schools";
import { cn } from "@/lib/utils";

type FeaturedVideoSectionProps = {
  school: SchoolProfile;
};

export default function FeaturedVideoSection({ school }: FeaturedVideoSectionProps) {
  if (!school.featuredVideo) {
    return null;
  }

  return (
    <section className="shell section-space pt-2">
      <MotionReveal>
        <div
          className={cn(
            "overflow-hidden border border-slate-200 bg-white shadow-[0_32px_80px_-52px_rgba(15,23,42,0.22)]",
            school.id === "st-jacinta" ? "rounded-[2.2rem]" : "rounded-[1.9rem]"
          )}
        >
          <div className="grid xl:grid-cols-[1.02fr_0.98fr]">
            <div className="border-b border-slate-200 bg-[linear-gradient(135deg,#0b1423_0%,#10233a_58%,#173455_100%)] p-5 sm:p-6 xl:border-b-0 xl:border-r xl:p-7">
              <div className="overflow-hidden rounded-[1.65rem] border border-white/10 bg-black shadow-[0_24px_56px_-34px_rgba(2,6,23,0.6)]">
                <div className="relative aspect-[16/10]">
                  <video
                    controls
                    preload="metadata"
                    playsInline
                    poster={school.featuredVideo.poster}
                    className="h-full w-full object-cover"
                  >
                    <source src={school.featuredVideo.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <div className="pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/14 bg-[rgba(8,15,26,0.36)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-sm">
                    <PlayCircle className="h-4 w-4" />
                    {school.featuredVideo.label ?? "Featured Video"}
                  </div>
                </div>
              </div>

              {school.featuredVideo.caption ? (
                <p className="mt-4 text-sm leading-7 text-white/72">{school.featuredVideo.caption}</p>
              ) : null}
            </div>

            <div className="bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] px-6 py-8 sm:px-10 sm:py-10 xl:px-12 xl:py-12">
              <div className="space-y-6">
                <span className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-[var(--school-primary)]">
                  {school.featuredVideo.eyebrow}
                </span>

                <div className="space-y-5">
                  <h2 className="font-display text-4xl font-semibold leading-[0.94] tracking-tight text-slate-950 sm:text-5xl lg:text-[4.15rem]">
                    {school.featuredVideo.title}
                  </h2>
                  <p className="max-w-3xl text-lg leading-9 text-slate-600 sm:text-[1.1rem]">
                    {school.featuredVideo.description}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {school.featuredVideo.highlights.map((item) => (
                    <article
                      key={item.label}
                      className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)]"
                    >
                      <p className="text-[10px] uppercase tracking-[0.26em] text-slate-500">{item.label}</p>
                      <p className="mt-3 text-base font-semibold leading-7 text-slate-950">{item.value}</p>
                    </article>
                  ))}
                </div>

                <article className="rounded-[1.45rem] border border-slate-200 bg-white p-5 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)] sm:p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Why It Matters</p>
                  <p className="mt-4 text-base leading-8 text-slate-600">
                    This highlight helps families see that King David supports meaningful junior milestones as well as senior
                    growth, giving the homepage a fuller picture of the school community.
                  </p>
                </article>

                {school.featuredVideo.ctaLabel && school.featuredVideo.ctaHref ? (
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={school.featuredVideo.ctaHref}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--school-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
                    >
                      {school.featuredVideo.ctaLabel}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-800 hover:border-slate-400 hover:text-[var(--school-primary)]"
                    >
                      Contact the school
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
