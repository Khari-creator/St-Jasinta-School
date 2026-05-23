import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BusFront, Clock3, MapPinned } from "lucide-react";

import MotionReveal from "@/components/MotionReveal";
import TransportVisual from "@/components/TransportVisual";
import type { SchoolProfile } from "@/data/schools";
import { cn } from "@/lib/utils";

type TransportSectionProps = {
  school: SchoolProfile;
};

const highlightIcons = [Clock3, BusFront, MapPinned];
const featureIcons = [BusFront, Clock3, MapPinned];

export default function TransportSection({ school }: TransportSectionProps) {
  const softVariant = school.id === "st-jacinta";
  const transportSupportingImages =
    school.transport.supportingImages && school.transport.supportingImages.length > 0
      ? school.transport.supportingImages
      : school.transport.secondaryImage
        ? [
            {
              src: school.transport.secondaryImage,
              alt: school.transport.secondaryImageAlt ?? school.transport.imageAlt,
              label: school.transport.secondaryImageLabel
            }
          ]
        : [];
  const hasSupportingTransportImages = transportSupportingImages.length > 0;

  return (
    <section className="shell section-space pt-2">
      <MotionReveal>
        <div
          className={cn(
            "overflow-hidden border border-slate-200 bg-white shadow-[0_32px_80px_-52px_rgba(15,23,42,0.22)]",
            softVariant ? "rounded-[2.2rem]" : "rounded-[1.9rem]"
          )}
        >
          <div
            className={cn(
              "grid xl:grid-cols-[1.04fr_0.96fr]",
              hasSupportingTransportImages ? "" : "xl:items-start"
            )}
          >
            <div
              className={cn(
                "overflow-hidden border-b border-slate-200 xl:border-b-0 xl:border-r",
                hasSupportingTransportImages ? "h-full" : "xl:self-start"
              )}
            >
              <div
                className={cn(
                  "flex flex-col",
                  hasSupportingTransportImages
                    ? "h-full xl:grid xl:h-full xl:grid-rows-[minmax(0,1.02fr)_minmax(0,0.98fr)]"
                    : ""
                )}
              >
                <div
                  className={cn(
                    "relative min-h-[22rem] overflow-hidden sm:min-h-[26rem]",
                    hasSupportingTransportImages ? "xl:min-h-0 xl:h-full" : "xl:min-h-0 xl:aspect-[16/11]"
                  )}
                >
                  <TransportVisual school={school} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,26,0.04)_0%,rgba(8,15,26,0.12)_50%,rgba(8,15,26,0.44)_100%)]" />

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <div className="max-w-2xl rounded-[1.45rem] border border-white/14 bg-[rgba(8,15,26,0.42)] p-5 text-white backdrop-blur-sm">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-white/72">Transport Enquiries</p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[2rem]">
                        {softVariant
                          ? "A more comfortable school-day routine for families."
                          : "A more reliable rhythm for daily school movement."}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base">
                        {school.transport.availabilityNote}
                      </p>
                    </div>
                  </div>
                </div>

                {hasSupportingTransportImages ? (
                  <div
                    className={cn(
                      "border-t border-slate-200 bg-white",
                      transportSupportingImages.length > 1
                        ? "grid gap-px bg-slate-200 sm:grid-cols-2"
                        : "grid"
                    )}
                  >
                    {transportSupportingImages.map((item) => (
                      <div
                        key={item.src}
                        className="relative min-h-[14rem] overflow-hidden bg-white sm:min-h-[17rem] xl:min-h-0 xl:h-full"
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 26vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,26,0.04)_0%,rgba(8,15,26,0.08)_45%,rgba(8,15,26,0.62)_100%)]" />
                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                          <div className="max-w-xl rounded-[1.25rem] border border-white/14 bg-[rgba(8,15,26,0.38)] p-4 text-white backdrop-blur-sm">
                            <p className="text-[11px] uppercase tracking-[0.28em] text-white/72">
                              {item.label ?? "Transport Support"}
                            </p>
                            <p className="mt-2 text-sm leading-7 text-white/82 sm:text-base">
                              {item.alt}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] px-6 py-8 sm:px-10 sm:py-10 xl:px-12 xl:py-12">
              <div className="space-y-6">
                <span className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-[var(--school-primary)]">
                  {school.transport.eyebrow}
                </span>

                <div className="space-y-5">
                  <h2 className="font-display text-4xl font-semibold leading-[0.94] tracking-tight text-slate-950 sm:text-5xl lg:text-[4.2rem]">
                    {school.transport.title}
                  </h2>
                  <p className="max-w-3xl text-lg leading-9 text-slate-600 sm:text-[1.1rem]">
                    {school.transport.description}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {school.transport.highlights.map((item, index) => {
                    const Icon = highlightIcons[index % highlightIcons.length];

                    return (
                      <article
                        key={item.label}
                        className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)]"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--school-tint)] text-[var(--school-primary)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="mt-4 text-[10px] uppercase tracking-[0.26em] text-slate-500">{item.label}</p>
                        <p className="mt-2 text-base font-semibold leading-7 text-slate-950">{item.value}</p>
                      </article>
                    );
                  })}
                </div>

                <article className="rounded-[1.45rem] border border-slate-200 bg-white p-5 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)] sm:p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Transport Support</p>
                  <p className="mt-4 text-base leading-8 text-slate-600">{school.transport.contactNote}</p>
                </article>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={school.transport.ctaHref}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--school-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
                  >
                    {school.transport.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/admissions"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-800 hover:border-slate-400 hover:text-[var(--school-primary)]"
                  >
                    Admission Details
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 bg-white px-6 py-6 sm:px-10 sm:py-8 xl:grid-cols-3 xl:px-12">
            {school.transport.features.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];

              return (
                <article
                  key={feature.title}
                  className="rounded-[1.35rem] border border-slate-200 bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] px-5 py-5 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.14)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[var(--school-tint)] text-[var(--school-primary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
