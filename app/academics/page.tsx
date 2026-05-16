import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { academicPageContentBySchool, getAcademicSectionHref } from "@/data/academics";
import { getSchoolContext } from "@/lib/getSchool";
import { buildMetadata, cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { school, origin } = await getSchoolContext();

  return buildMetadata({
    school,
    origin,
    pathname: "/academics",
    title: "Academics",
    description: `Explore the academic levels, learning approach, and programme structure at ${school.name}.`
  });
}

export default async function AcademicsPage() {
  const { school } = await getSchoolContext();
  const softVariant = school.id === "st-jacinta";
  const pageContent = academicPageContentBySchool[school.id];

  return (
    <>
      <section className="shell pt-10 sm:pt-14">
        <div className="mx-auto max-w-4xl text-center">
          <span
            className="inline-flex rounded-full border border-slate-200 bg-[var(--school-tint)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--school-primary)]"
          >
            Academic Pathways
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold uppercase tracking-tight text-slate-950 sm:text-5xl lg:text-[4.2rem]">
            {pageContent.heading}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-[1.2rem]">
            {pageContent.intro}
          </p>
        </div>
      </section>

      <section className="shell section-space pt-10">
        <div className="grid gap-8 xl:grid-cols-3">
          {pageContent.sections.map((section) => (
            <article
              key={section.id}
              className={cn(
                "overflow-hidden border border-slate-200 bg-white shadow-[0_24px_64px_-42px_rgba(15,23,42,0.35)]",
                softVariant ? "rounded-[1.85rem]" : "rounded-[1.4rem]"
              )}
            >
              <Link href={getAcademicSectionHref(section.id)} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={section.heroImage}
                    alt={section.heroAlt}
                    fill
                    className="object-cover transition duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 1279px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 sm:p-7">
                  <h2
                    className="text-[2rem] font-semibold uppercase tracking-tight"
                    style={{ color: school.theme.secondary }}
                  >
                    {section.cardTitle}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-700">{section.cardSummary}</p>
                  <span className="mt-6 inline-flex items-center rounded-full bg-[var(--school-secondary)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                    View This Page
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {pageContent.sections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className="shell scroll-mt-40 pb-20 pt-6 sm:scroll-mt-44 sm:pb-24"
        >
          <div className="mx-auto max-w-[1120px]">
            <div className="flex flex-wrap items-center gap-4 border-t border-slate-200 pt-10 sm:pt-12">
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: school.theme.secondary }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Academic Level
                </p>
                <h2 className="mt-2 font-display text-4xl font-semibold uppercase tracking-tight text-slate-950 sm:text-5xl">
                  {section.label}
                </h2>
              </div>
            </div>

            <div
              className={cn(
                "mt-8 overflow-hidden border border-slate-200 bg-white shadow-[0_24px_64px_-42px_rgba(15,23,42,0.35)]",
                softVariant ? "rounded-[1.85rem]" : "rounded-[1.4rem]"
              )}
            >
              <div className="relative aspect-[16/7] min-h-[16rem] sm:min-h-[22rem]">
                <Image
                  src={section.heroImage}
                  alt={section.heroAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1279px) 100vw, 1120px"
                />
              </div>
              <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-14">
                <div className="space-y-7">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[1.02rem] leading-9 text-slate-800 sm:text-[1.08rem]">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.listTitle && section.listItems ? (
                  <div className="mt-10">
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-[2rem]">
                      {section.listTitle}
                    </h3>
                    <ol className="mt-6 grid gap-4 pl-6 text-[1.02rem] leading-8 text-slate-800 sm:text-[1.08rem]">
                      {section.listItems.map((item) => (
                        <li key={item} className="list-decimal pl-2">
                          {item}
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}
              </div>
            </div>

            {section.secondaryImage ? (
              <div
                className={cn(
                  "mt-12 overflow-hidden border border-slate-200 bg-white shadow-[0_24px_64px_-42px_rgba(15,23,42,0.35)]",
                  softVariant ? "rounded-[1.85rem]" : "rounded-[1.4rem]"
                )}
              >
                <div className="relative aspect-[16/8] min-h-[15rem] sm:min-h-[20rem]">
                  <Image
                    src={section.secondaryImage}
                    alt={section.secondaryImageAlt ?? section.heroAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1279px) 100vw, 1120px"
                  />
                </div>
              </div>
            ) : null}

            {section.assessmentItems ? (
              <article
                className={cn(
                  "mt-12 border border-slate-200 bg-white px-6 py-8 shadow-[0_24px_64px_-42px_rgba(15,23,42,0.35)] sm:px-10 sm:py-10 lg:px-14",
                  softVariant ? "rounded-[1.85rem]" : "rounded-[1.4rem]"
                )}
              >
                <h3 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-[2rem]">
                  {section.assessmentTitle}
                </h3>
                {section.assessmentIntro ? (
                  <p className="mt-5 text-[1.02rem] leading-9 text-slate-800 sm:text-[1.08rem]">
                    {section.assessmentIntro}
                  </p>
                ) : null}
                <ul className="mt-8 grid gap-4 pl-6 text-[1.02rem] leading-8 text-slate-800 sm:text-[1.08rem]">
                  {section.assessmentItems.map((item) => (
                    <li key={item} className="list-disc pl-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ) : null}

            {section.photoGallery && section.photoGallery.length > 0 ? (
              <div className="mt-16">
                <h3 className="text-center font-display text-4xl font-semibold uppercase tracking-tight text-slate-950 sm:text-5xl">
                  {section.photoGalleryTitle}
                </h3>
                <div className="mt-10 grid gap-8 lg:grid-cols-2">
                  {section.photoGallery.map((photo) => (
                    <div
                      key={photo.src}
                      className={cn(
                        "overflow-hidden border border-slate-200 bg-white shadow-[0_24px_64px_-42px_rgba(15,23,42,0.35)]",
                        softVariant ? "rounded-[1.85rem]" : "rounded-[1.4rem]"
                      )}
                    >
                      <div className="relative aspect-[5/4] min-h-[15rem]">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1023px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {section.ctaTitle && section.ctaParagraphs && section.ctaImage && section.ctaLinkHref && section.ctaLinkLabel ? (
              <div className="mt-16">
                <h3 className="text-center font-display text-4xl font-semibold uppercase tracking-tight text-slate-950 sm:text-5xl">
                  {section.ctaTitle}
                </h3>
                <div
                  className={cn(
                    "mt-10 overflow-hidden border border-slate-200 bg-white shadow-[0_24px_64px_-42px_rgba(15,23,42,0.35)] lg:grid lg:grid-cols-[0.94fr_1.06fr]",
                    softVariant ? "rounded-[1.85rem]" : "rounded-[1.4rem]"
                  )}
                >
                  <div className="relative min-h-[18rem]">
                    <Image
                      src={section.ctaImage}
                      alt={section.ctaImageAlt ?? section.heroAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1023px) 100vw, 45vw"
                    />
                  </div>
                  <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
                    <div className="space-y-6">
                      {section.ctaParagraphs.map((paragraph) => (
                        <p key={paragraph} className="text-[1.02rem] leading-9 text-slate-800 sm:text-[1.08rem]">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Link
                        href={section.ctaLinkHref}
                        className="inline-flex items-center rounded-full bg-[var(--school-secondary)] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white"
                      >
                        {section.ctaLinkLabel}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ))}
    </>
  );
}
