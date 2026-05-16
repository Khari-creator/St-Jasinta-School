import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  MapPin,
  PhoneCall
} from "lucide-react";

import {
  getAcademicSectionHref,
  type AcademicDetailSection,
  type AcademicPageContent
} from "@/data/academics";
import type { SchoolProfile } from "@/data/schools";
import { cn, createTelLink, isValidContactValue } from "@/lib/utils";

type AcademicSectionPageProps = {
  school: SchoolProfile;
  pageContent: AcademicPageContent;
  section: AcademicDetailSection;
};

export default function AcademicSectionPage({
  school,
  pageContent,
  section
}: AcademicSectionPageProps) {
  const softVariant = school.id === "st-jacinta";
  const quickContactHref = isValidContactValue(school.contact.phone)
    ? createTelLink(school.contact.phone)
    : "/contact";
  const emphasisItems = section.listItems ?? school.curriculum;

  return (
    <>
      <section className="shell pt-10 sm:pt-14">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/academics"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-300 hover:text-[var(--school-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Academics
          </Link>
          <span className="inline-flex rounded-full border border-slate-200 bg-[var(--school-tint)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--school-primary)]">
            {pageContent.heading}
          </span>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <div
            className={cn(
              "overflow-hidden border border-slate-200 bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] p-6 shadow-[0_28px_70px_-50px_rgba(15,23,42,0.22)] sm:p-8 lg:p-10",
              softVariant ? "rounded-[2.2rem]" : "rounded-[1.7rem]"
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[var(--school-primary)]">
              Academic Level
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[0.96] tracking-tight text-slate-950 sm:text-5xl lg:text-[4.5rem]">
              {section.label}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-600 sm:text-[1.12rem]">
              {section.cardSummary}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  label: "School",
                  value: school.shortName,
                  icon: GraduationCap
                },
                {
                  label: "Curriculum",
                  value: school.curriculum[0],
                  icon: CheckCircle2
                },
                {
                  label: "Location",
                  value: school.location,
                  icon: MapPin
                },
                {
                  label: "Founded",
                  value: school.founded,
                  icon: CalendarDays
                }
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.label}
                    className="rounded-[1.3rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.14)]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-[0.95rem] bg-[var(--school-tint)] text-[var(--school-primary)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                      {item.value}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--school-secondary)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white"
              >
                Apply for Admission
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={quickContactHref}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-slate-800 hover:border-slate-400 hover:text-[var(--school-primary)]"
              >
                <PhoneCall className="h-4 w-4" />
                Speak to the School
              </Link>
            </div>
          </div>

          <div
            className={cn(
              "overflow-hidden border border-slate-200 bg-white shadow-[0_28px_70px_-50px_rgba(15,23,42,0.22)]",
              softVariant ? "rounded-[2.2rem]" : "rounded-[1.7rem]"
            )}
          >
            <div className="relative min-h-[22rem] sm:min-h-[28rem] xl:h-full">
              <Image
                src={section.heroImage}
                alt={section.heroAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1279px) 100vw, 46vw"
              />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mt-6 border border-slate-200 bg-white p-3 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.14)]",
            softVariant ? "rounded-[1.85rem]" : "rounded-[1.45rem]"
          )}
        >
          <div className="flex flex-wrap gap-3">
            {pageContent.sections.map((item) => (
              <Link
                key={item.id}
                href={getAcademicSectionHref(item.id)}
                className={cn(
                  "inline-flex rounded-full px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.16em]",
                  item.id === section.id
                    ? "bg-[var(--school-primary)] text-white"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:text-[var(--school-primary)]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section-space pt-10">
        <div className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
          <article
            className={cn(
              "border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_64px_-42px_rgba(15,23,42,0.2)] sm:px-8 sm:py-10 lg:px-10",
              softVariant ? "rounded-[2rem]" : "rounded-[1.55rem]"
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--school-primary)]">
              Learning Experience
            </p>
            <div className="mt-6 space-y-7">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[1.02rem] leading-9 text-slate-700 sm:text-[1.08rem]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <div className="grid gap-6">
            <article
              className={cn(
                "border border-slate-200 bg-[linear-gradient(135deg,var(--school-surface),white)] px-6 py-8 shadow-[0_24px_64px_-42px_rgba(15,23,42,0.2)] sm:px-8 sm:py-9",
                softVariant ? "rounded-[2rem]" : "rounded-[1.55rem]"
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--school-primary)]">
                What This Level Emphasises
              </p>
              {section.listTitle ? (
                <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-[2.1rem]">
                  {section.listTitle}
                </h2>
              ) : null}
              <div className="mt-6 grid gap-3">
                {emphasisItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-700"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--school-tint)] text-[var(--school-primary)]">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>

            <article
              className={cn(
                "border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_64px_-42px_rgba(15,23,42,0.2)] sm:px-8 sm:py-9",
                softVariant ? "rounded-[2rem]" : "rounded-[1.55rem]"
              )}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--school-primary)]">
                Parent Confidence
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-[2.1rem]">
                A clear, supportive pathway within {school.shortName}.
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Families are supported by a school culture that values structure, guidance, communication,
                and steady progress from one stage of learning to the next.
              </p>
            </article>
          </div>
        </div>

        {section.secondaryImage || section.assessmentItems ? (
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
            {section.secondaryImage ? (
              <div
                className={cn(
                  "overflow-hidden border border-slate-200 bg-white shadow-[0_24px_64px_-42px_rgba(15,23,42,0.2)]",
                  softVariant ? "rounded-[2rem]" : "rounded-[1.55rem]"
                )}
              >
                <div className="relative min-h-[18rem] sm:min-h-[24rem]">
                  <Image
                    src={section.secondaryImage}
                    alt={section.secondaryImageAlt ?? section.heroAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1279px) 100vw, 48vw"
                  />
                </div>
              </div>
            ) : null}

            {section.assessmentItems ? (
              <article
                className={cn(
                  "border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_64px_-42px_rgba(15,23,42,0.2)] sm:px-8 sm:py-10",
                  softVariant ? "rounded-[2rem]" : "rounded-[1.55rem]",
                  !section.secondaryImage && "xl:col-span-2"
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--school-primary)]">
                  Assessments and Support
                </p>
                <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-[2.1rem]">
                  {section.assessmentTitle}
                </h2>
                {section.assessmentIntro ? (
                  <p className="mt-4 text-base leading-8 text-slate-600">{section.assessmentIntro}</p>
                ) : null}
                <div className="mt-6 grid gap-3">
                  {section.assessmentItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.15rem] border border-slate-200 bg-[var(--school-surface)] px-4 py-4 text-sm leading-7 text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            ) : null}
          </div>
        ) : null}

        {section.photoGallery && section.photoGallery.length > 0 ? (
          <div className="mt-16">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--school-primary)]">
                Photo Highlights
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                {section.photoGalleryTitle ?? `${section.label} in Photos`}
              </h2>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {section.photoGallery.map((photo) => (
                <article
                  key={photo.src}
                  className={cn(
                    "overflow-hidden border border-slate-200 bg-white shadow-[0_24px_64px_-42px_rgba(15,23,42,0.2)]",
                    softVariant ? "rounded-[2rem]" : "rounded-[1.55rem]"
                  )}
                >
                  <div className="relative min-h-[18rem] sm:min-h-[22rem]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1023px) 100vw, 50vw"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {section.ctaTitle && section.ctaParagraphs && section.ctaImage && section.ctaLinkHref && section.ctaLinkLabel ? (
          <div className="mt-16">
            <div
              className={cn(
                "overflow-hidden border border-slate-200 bg-white shadow-[0_28px_70px_-50px_rgba(15,23,42,0.24)] lg:grid lg:grid-cols-[0.92fr_1.08fr]",
                softVariant ? "rounded-[2.2rem]" : "rounded-[1.7rem]"
              )}
            >
              <div className="relative min-h-[18rem] sm:min-h-[22rem]">
                <Image
                  src={section.ctaImage}
                  alt={section.ctaImageAlt ?? section.heroAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1023px) 100vw, 44vw"
                />
              </div>
              <div className="bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--school-primary)]">
                  Next Step
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-[3.2rem]">
                  {section.ctaTitle}
                </h2>
                <div className="mt-6 space-y-5">
                  {section.ctaParagraphs.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-slate-600 sm:text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="mt-8">
                  <Link
                    href={section.ctaLinkHref}
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--school-secondary)] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white"
                  >
                    {section.ctaLinkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
