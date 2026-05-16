import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import type { Metadata } from "next";

import CTASection from "@/components/CTASection";
import FeatureCard from "@/components/FeatureCard";
import Hero from "@/components/Hero";
import MotionReveal from "@/components/MotionReveal";
import ParallaxBand from "@/components/ParallaxBand";
import SchoolLogo from "@/components/SchoolLogo";
import SectionHeader from "@/components/SectionHeader";
import StatsStrip from "@/components/StatsStrip";
import { academicPageContentBySchool, getAcademicSectionHref } from "@/data/academics";
import { getSchoolContext } from "@/lib/getSchool";
import { buildMetadata, cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { school, origin } = await getSchoolContext();

  return buildMetadata({
    school,
    origin,
    title: "Home",
    description: `${school.name} in ${school.location} offers a nurturing and well-guided learning environment shaped by strong values, purposeful teaching, and learner growth.`
  });
}

export default async function HomePage() {
  const { school } = await getSchoolContext();
  const softVariant = school.id === "st-jacinta";
  const stJacintaAcademics = academicPageContentBySchool["st-jacinta"].sections;
  const kingDavidAcademics = academicPageContentBySchool["king-david"].sections;
  const featuredGalleryItem = school.gallery[0];
  const supportingGalleryItems = school.gallery.slice(1, 3);
  const kingDavidFeaturedGalleryItem = school.gallery[2] ?? school.gallery[0];
  const kingDavidSupportingGalleryItems =
    school.gallery.length > 4 ? [school.gallery[0], school.gallery[4]] : school.gallery.slice(0, 2);
  const galleryCategories = Array.from(new Set(school.gallery.map((item) => item.category))).slice(0, 4);
  const welcomePillars = softVariant
    ? [
        {
          title: "Caring Teachers",
          description: "Children are guided with patience, attentiveness, and daily encouragement.",
          icon: HeartHandshake
        },
        {
          title: "Christian Values",
          description: "Faith, respect, discipline, and character are part of the school culture.",
          icon: ShieldCheck
        },
        {
          title: "Steady Progress",
          description: "Learning is structured to build confidence and long-term academic growth.",
          icon: Sparkles
        }
      ]
    : [
        {
          title: "Academic Structure",
          description: "Learners benefit from clear routines, serious study habits, and focus.",
          icon: ShieldCheck
        },
        {
          title: "Leadership Growth",
          description: "Students are encouraged to grow in confidence, responsibility, and maturity.",
          icon: Sparkles
        },
        {
          title: "Purposeful Guidance",
          description: "Teaching is designed to help learners progress with clarity and direction.",
          icon: HeartHandshake
        }
      ];
  const familyTrustPoints = softVariant
    ? [
        "Steady leadership and a warm school culture",
        "Caring teachers who guide children with purpose",
        "Discipline, values, and meaningful academic progress"
      ]
    : [
        "A more structured academic atmosphere",
        "Student discipline and clearer learner expectations",
        "Growth in confidence, responsibility, and direction"
      ];

  return (
    <>
      <Hero school={school} />

      <section className="shell pt-10 sm:pt-12">
        <StatsStrip school={school} />
      </section>

      <section className="shell section-space">
        <MotionReveal>
          <div
            className={cn(
              "overflow-hidden border border-slate-200 shadow-[0_32px_80px_-52px_rgba(15,23,42,0.22)]",
              softVariant ? "rounded-[2.4rem]" : "rounded-[1.9rem]"
            )}
          >
            <div className="grid gap-10 bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] px-6 py-8 sm:px-10 sm:py-10 xl:grid-cols-[1.02fr_0.98fr] xl:gap-12 xl:px-12 xl:py-12">
            <div className="space-y-8">
              <div className="space-y-5">
                <span className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-[var(--school-primary)]">
                  Welcome to the School
                </span>
                <div className="space-y-5">
                  <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[0.93] tracking-tight text-slate-950 sm:text-5xl lg:text-[5rem]">
                    {softVariant
                      ? "A caring school community where children grow in faith, knowledge, and confidence."
                      : "A disciplined school community where learners grow in knowledge, character, and leadership."}
                  </h2>
                  <div className="h-px w-28 bg-[linear-gradient(90deg,var(--school-primary),transparent)]" />
                  <p className="max-w-3xl text-lg leading-9 text-slate-600 sm:text-[1.15rem]">
                    {school.summary} Families are welcomed into a school environment where learners are guided with purpose, taught with care, and encouraged to build a strong foundation for the future.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {welcomePillars.map((pillar) => {
                  const Icon = pillar.icon;

                  return (
                    <article
                      key={pillar.title}
                      className="rounded-[1.45rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-[0.95rem] bg-[var(--school-tint)] text-[var(--school-primary)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950">{pillar.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{pillar.description}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-5">
              <article
                className={cn(
                  "overflow-hidden border border-slate-200 bg-white p-6 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)] sm:p-7",
                  softVariant ? "rounded-[2rem]" : "rounded-[1.55rem]"
                )}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <SchoolLogo school={school} className="h-[4.9rem] w-[4.9rem] shrink-0" />
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Leadership Note</p>
                    <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-[2.55rem]">
                      Guided by Director {school.director}
                    </h2>
                  </div>
                </div>

                <p className="mt-7 text-base leading-8 text-slate-600 sm:text-lg">{school.leadershipNote}</p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {["Steady leadership", "Caring teachers", "Meaningful progress"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-[var(--school-surface)] px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>

              <article
                className={cn(
                  "border border-slate-200 bg-[linear-gradient(135deg,var(--school-surface),white)] p-6 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)] sm:p-7",
                  softVariant ? "rounded-[2rem]" : "rounded-[1.55rem]"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[var(--school-tint)] text-[var(--school-primary)]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Why Families Choose Us</p>
                    <h3 className="mt-2 text-[2rem] font-semibold leading-tight tracking-tight text-slate-950">
                      A school environment families can trust.
                    </h3>
                  </div>
                </div>

                <div className="mt-7 grid gap-3">
                  {familyTrustPoints.map((point) => (
                    <div
                      key={point}
                      className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-700"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
          </div>
        </MotionReveal>
      </section>

      <section className="shell pb-4">
        <SectionHeader
          school={school}
          eyebrow="Why Families Choose This School"
          title="The strongest reasons to trust the learning environment."
          description={`At ${school.shortName}, learning is shaped by strong values, attentive guidance, and a clear commitment to helping every learner make steady progress.`}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {school.differentiators.map((feature, index) => (
            <FeatureCard key={feature.title} school={school} feature={feature} index={index} />
          ))}
        </div>
      </section>

      <ParallaxBand
        school={school}
        eyebrow="Learning Atmosphere"
        title={softVariant ? "A nurturing environment with structure and confidence." : "A disciplined environment with maturity and direction."}
        description={school.learnerFocus}
        chips={school.coCurricular}
      />

      {softVariant ? (
        <section className="shell section-space">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-4xl font-semibold uppercase tracking-tight text-slate-950 sm:text-5xl lg:text-[4.2rem]">
              Academics
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-[1.2rem]">
              Join us for CBC Curriculum and holistic education that supports growth from Kindergarten to Junior Secondary.
            </p>
          </div>

          <div className="mt-14 grid gap-10 xl:grid-cols-3">
            {stJacintaAcademics.map((section) => (
              <article key={section.id} className="space-y-5">
                <h3
                  className="text-[1.95rem] font-semibold uppercase tracking-tight"
                  style={{ color: school.theme.primary }}
                >
                  {section.label}
                </h3>

                <Link href={getAcademicSectionHref(section.id)} className="block overflow-hidden rounded-[0.35rem] border border-slate-200 bg-white">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={section.heroImage}
                      alt={section.heroAlt}
                      fill
                      sizes="(max-width: 1279px) 100vw, 33vw"
                      className="object-cover transition duration-500 hover:scale-[1.02]"
                    />
                  </div>
                </Link>

                <p className="text-[1.02rem] leading-9 text-slate-800">
                  {section.cardSummary}
                </p>

                <Link
                  href={getAcademicSectionHref(section.id)}
                  className="inline-flex items-center justify-center rounded-md bg-[var(--school-secondary)] px-7 py-3 text-base font-semibold uppercase tracking-[0.08em] text-white"
                >
                  Learn More
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="shell section-space">
          <div className="overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white shadow-[0_32px_80px_-52px_rgba(15,23,42,0.22)]">
            <div className="bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] px-6 py-8 sm:px-10 sm:py-10 xl:px-12 xl:py-12">
              <div className="grid gap-8 xl:grid-cols-[0.94fr_1.06fr] xl:items-end">
                <div className="space-y-6">
                  <SectionHeader
                    school={school}
                    eyebrow="Academic Pathways"
                    title="A more refined pathway from junior growth to senior academic readiness."
                    description={`King David combines its senior school foundation with a structured junior pathway so learners grow with discipline, clearer direction, and stronger academic purpose.`}
                  />
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        label: "Senior Foundation",
                        value: "Since 2014"
                      },
                      {
                        label: "Junior Expansion",
                        value: "CBC Pathway"
                      },
                      {
                        label: "Learning Culture",
                        value: "Structure & Growth"
                      }
                    ].map((item) => (
                      <article
                        key={item.label}
                        className="rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.14)]"
                      >
                        <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                        <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">{item.value}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <article className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)] sm:p-7">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Pathway Overview</p>
                  <h3 className="mt-3 text-[2rem] font-semibold leading-tight tracking-tight text-slate-950">
                    Built to move learners from guided growth into stronger academic maturity.
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-600">
                    The academic structure at King David is designed to help families see a clearer progression: a junior section
                    shaped by guidance and confidence-building, and a senior section rooted in seriousness, responsibility, and
                    future readiness.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/academics"
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--school-primary)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
                    >
                      View All Pathways
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/admissions"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-800 hover:border-slate-400 hover:text-[var(--school-primary)]"
                    >
                      Apply Now
                    </Link>
                  </div>
                </article>
              </div>

              <div className="mt-10 grid gap-5 xl:grid-cols-3">
                {kingDavidAcademics.map((section, index) => (
                  <article
                    key={section.id}
                    className="group overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_24px_54px_-36px_rgba(15,23,42,0.18)]"
                  >
                    <Link href={getAcademicSectionHref(section.id)} className="block">
                      <div className="relative aspect-[16/11] overflow-hidden">
                        <Image
                          src={section.heroImage}
                          alt={section.heroAlt}
                          fill
                          sizes="(max-width: 1279px) 100vw, 33vw"
                          className="object-cover transition duration-700 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,26,0.02)_0%,rgba(8,15,26,0.12)_52%,rgba(8,15,26,0.72)_100%)]" />
                        <div className="absolute left-5 top-5">
                          <span className="inline-flex rounded-full border border-white/20 bg-[rgba(255,255,255,0.12)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-white">
                            Pathway {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                          <p className="text-[11px] uppercase tracking-[0.28em] text-white/72">King David</p>
                          <h3 className="mt-2 text-2xl font-semibold tracking-tight">{section.label}</h3>
                        </div>
                      </div>

                      <div className="p-6">
                        <p className="text-base leading-8 text-slate-600">{section.cardSummary}</p>

                        <div className="mt-5 grid gap-3">
                          {section.listItems?.slice(0, 2).map((item) => (
                            <div
                              key={item}
                              className="rounded-[1rem] border border-slate-200 bg-[var(--school-surface)] px-4 py-3 text-sm leading-7 text-slate-700"
                            >
                              {item}
                            </div>
                          ))}
                        </div>

                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--school-primary)]">
                          Explore This Pathway
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-[1.04fr_0.96fr]">
                <article className="rounded-[1.7rem] border border-slate-200 bg-white px-6 py-6 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)] sm:px-7">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Why This Pathway Works</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                    Families can see a clearer progression through each stage.
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-600">
                    Each section is designed to build on the next. Learners begin with stronger support and structure, then move
                    toward deeper academic seriousness, responsibility, and readiness for future opportunities.
                  </p>
                </article>

                <article className="rounded-[1.7rem] border border-slate-200 bg-[linear-gradient(135deg,var(--school-surface),white)] px-6 py-6 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)] sm:px-7">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Quick Actions</p>
                  <div className="mt-5 grid gap-3">
                    <Link
                      href="/academics"
                      className="inline-flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-sm"
                    >
                      View the academics page
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/gallery"
                      className="inline-flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-sm"
                    >
                      Explore school life
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-sm"
                    >
                      Contact the school
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      )}

      {softVariant ? (
        <section className="shell section-space pt-2">
          <div className="grid gap-10 xl:grid-cols-[0.94fr_1.06fr] xl:items-end">
            <div className="space-y-5">
              <span className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-[var(--school-primary)]">
                School Gallery
              </span>
              <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[0.94] tracking-tight text-slate-950 sm:text-5xl lg:text-[4.4rem]">
                A closer look at life, learning, and growth inside St. Jacinta.
              </h2>
              <p className="max-w-3xl text-lg leading-9 text-slate-600 sm:text-[1.12rem]">
                Explore moments that reflect the warmth of the school community, from classroom engagement and learner growth to everyday school life and memorable events.
              </p>
              <div className="flex flex-wrap gap-3">
                {galleryCategories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-slate-200 bg-[var(--school-surface)] px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Learning Moments",
                  value: "CBC Classrooms"
                },
                {
                  label: "School Life",
                  value: "Daily Growth"
                },
                {
                  label: "Events",
                  value: "Community Spirit"
                }
              ].map((item) => (
                <article
                  key={item.label}
                  className="rounded-[1.35rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)]"
                >
                  <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                  <p className="mt-3 text-xl font-semibold tracking-tight text-slate-950">{item.value}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.16fr_0.84fr]">
            {featuredGalleryItem ? (
              <Link href="/gallery" className="group block">
                <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_70px_-44px_rgba(15,23,42,0.24)]">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={featuredGalleryItem.src}
                      alt={featuredGalleryItem.alt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 62vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,26,0.02)_0%,rgba(8,15,26,0.12)_56%,rgba(8,15,26,0.72)_100%)]" />
                    <div className="absolute left-6 top-6">
                      <span className="inline-flex rounded-full border border-white/18 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm">
                        {featuredGalleryItem.category}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <div className="max-w-2xl rounded-[1.4rem] border border-white/12 bg-[rgba(8,15,26,0.42)] p-5 text-white backdrop-blur-sm">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-white/72">Featured View</p>
                        <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[2rem]">
                          Learning spaces that reflect care, structure, and confidence.
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-white/78 sm:text-base">
                          {featuredGalleryItem.alt}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ) : null}

            <div className="grid gap-5">
              {supportingGalleryItems.map((item) => (
                <Link key={item.src} href="/gallery" className="group block">
                  <article className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_22px_54px_-38px_rgba(15,23,42,0.2)]">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 1023px) 100vw, 38vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,26,0.02)_0%,rgba(8,15,26,0.08)_52%,rgba(8,15,26,0.56)_100%)]" />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <span className="inline-flex rounded-full border border-white/16 bg-white/12 px-3 py-1 text-[11px] uppercase tracking-[0.24em] backdrop-blur-sm">
                          {item.category}
                        </span>
                        <p className="mt-3 text-lg font-medium leading-7">{item.alt}</p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.04fr_0.96fr]">
            <article className="rounded-[1.7rem] border border-slate-200 bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] px-6 py-6 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)] sm:px-7">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Why This Section Matters</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                The gallery helps families feel the atmosphere before they visit.
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Through real classroom moments, school life highlights, and event coverage, families gain a clearer picture of the environment their children would grow in each day.
              </p>
            </article>

            <article className="rounded-[1.7rem] border border-slate-200 bg-white px-6 py-6 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)] sm:px-7">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Explore More</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                See more of school life, learning, and community moments.
              </h3>
              <div className="mt-6">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--school-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
                >
                  View Full Gallery
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        </section>
      ) : (
        <section className="shell section-space pt-2">
          <div className="overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white shadow-[0_32px_80px_-52px_rgba(15,23,42,0.22)]">
            <MotionReveal>
              <div className="grid gap-8 bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] px-6 py-8 sm:px-10 sm:py-10 xl:grid-cols-[0.94fr_1.06fr] xl:px-12 xl:py-12">
                <div className="space-y-5">
                  <span className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.34em] text-[var(--school-primary)]">
                    School Gallery
                  </span>
                  <h2 className="max-w-4xl font-display text-4xl font-semibold leading-[0.94] tracking-tight text-slate-950 sm:text-5xl lg:text-[4.3rem]">
                    A stronger view into student life, classroom culture, and school identity at King David.
                  </h2>
                  <p className="max-w-3xl text-lg leading-9 text-slate-600 sm:text-[1.12rem]">
                    Explore a more structured picture of school life, from junior pathway growth and classroom focus to senior school readiness, events, and daily student development.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {galleryCategories.map((category) => (
                      <span
                        key={category}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      label: "Junior Pathway",
                      value: "Guided Growth"
                    },
                    {
                      label: "Senior Identity",
                      value: "Academic Seriousness"
                    },
                    {
                      label: "School Culture",
                      value: "Confidence & Discipline"
                    }
                  ].map((item) => (
                    <article
                      key={item.label}
                      className="rounded-[1.35rem] border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)]"
                    >
                      <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                      <p className="mt-3 text-xl font-semibold tracking-tight text-slate-950">{item.value}</p>
                    </article>
                  ))}
                </div>
              </div>
            </MotionReveal>

            <div className="px-6 pb-6 sm:px-10 sm:pb-10 xl:px-12 xl:pb-12">
              <div className="grid gap-5 lg:grid-cols-[1.14fr_0.86fr]">
                {kingDavidFeaturedGalleryItem ? (
                  <MotionReveal delay={0.05}>
                    <Link href="/gallery" className="group block">
                      <article className="overflow-hidden rounded-[1.95rem] border border-slate-200 bg-white shadow-[0_28px_70px_-44px_rgba(15,23,42,0.24)]">
                        <div className="relative aspect-[16/11] overflow-hidden">
                          <Image
                            src={kingDavidFeaturedGalleryItem.src}
                            alt={kingDavidFeaturedGalleryItem.alt}
                            fill
                            sizes="(max-width: 1023px) 100vw, 62vw"
                            className="object-cover transition duration-700 group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,26,0.02)_0%,rgba(8,15,26,0.12)_54%,rgba(8,15,26,0.74)_100%)]" />
                          <div className="absolute left-6 top-6">
                            <span className="inline-flex rounded-full border border-white/18 bg-white/12 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                              Featured View
                            </span>
                          </div>
                          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                            <div className="max-w-2xl rounded-[1.35rem] border border-white/12 bg-[rgba(8,15,26,0.34)] p-5 text-white">
                              <p className="text-[11px] uppercase tracking-[0.28em] text-white/72">
                                {kingDavidFeaturedGalleryItem.category}
                              </p>
                              <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[2rem]">
                                Moments that reflect the school&apos;s stronger academic culture.
                              </h3>
                              <p className="mt-3 text-sm leading-7 text-white/78 sm:text-base">
                                {kingDavidFeaturedGalleryItem.alt}
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </MotionReveal>
                ) : null}

                <div className="grid gap-5">
                  {kingDavidSupportingGalleryItems.map((item, index) => (
                    <MotionReveal key={item.src} delay={0.09 + index * 0.05}>
                      <Link href="/gallery" className="group block">
                        <article className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_22px_54px_-38px_rgba(15,23,42,0.2)]">
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                              src={item.src}
                              alt={item.alt}
                              fill
                              sizes="(max-width: 1023px) 100vw, 38vw"
                              className="object-cover transition duration-700 group-hover:scale-[1.04]"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,26,0.02)_0%,rgba(8,15,26,0.08)_52%,rgba(8,15,26,0.58)_100%)]" />
                            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                              <span className="inline-flex rounded-full border border-white/16 bg-white/12 px-3 py-1 text-[11px] uppercase tracking-[0.24em]">
                                {item.category}
                              </span>
                              <p className="mt-3 text-lg font-medium leading-7">{item.alt}</p>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </MotionReveal>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[1.04fr_0.96fr]">
                <MotionReveal delay={0.1}>
                  <article className="rounded-[1.7rem] border border-slate-200 bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] px-6 py-6 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)] sm:px-7">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Why This Section Matters</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                      Families see more than photos. They see the school tone.
                    </h3>
                    <p className="mt-4 text-base leading-8 text-slate-600">
                      This gallery helps parents understand the difference between guided junior growth and the stronger senior
                      school identity, while also showing the everyday atmosphere learners experience on campus.
                    </p>
                  </article>
                </MotionReveal>

                <MotionReveal delay={0.14}>
                  <article className="rounded-[1.7rem] border border-slate-200 bg-white px-6 py-6 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)] sm:px-7">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Explore More</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                      See more of classrooms, events, senior identity, and student development.
                    </h3>
                    <div className="mt-6">
                      <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--school-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
                      >
                        View Full Gallery
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                </MotionReveal>
              </div>
            </div>
          </div>
        </section>
      )}

      <CTASection
        school={school}
        title={`Begin your journey with ${school.shortName}.`}
        description="We welcome families who are looking for a school community built on strong values, purposeful learning, and steady learner growth."
      />
    </>
  );
}
