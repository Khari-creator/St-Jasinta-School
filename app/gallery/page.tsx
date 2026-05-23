import type { Metadata } from "next";

import CTASection from "@/components/CTASection";
import GalleryMosaic from "@/components/GalleryMosaic";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { getGalleryItemsForSchool } from "@/lib/gallery";
import { getSchoolContext } from "@/lib/getSchool";
import { buildMetadata } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { school, origin } = await getSchoolContext();

  return buildMetadata({
    school,
    origin,
    pathname: "/gallery",
    title: "Gallery",
    description: `Browse the ${school.name} gallery and preview school life, learning, events, and facilities.`
  });
}

export default async function GalleryPage() {
  const { school } = await getSchoolContext();
  const softVariant = school.id === "st-jacinta";
  const galleryItems = await getGalleryItemsForSchool(school.id, school.gallery);
  const categories = Array.from(new Set(galleryItems.map((item) => item.category)));
  const tripCount = galleryItems.filter((item) => item.category === "Trips").length;
  const graduationCount = galleryItems.filter((item) => item.category === "Graduation").length;
  const learningCount = galleryItems.filter((item) => item.category === "Learning").length;

  return (
    <>
      <PageHero
        school={school}
        eyebrow="Gallery"
        title={`A glimpse into life at ${school.shortName}.`}
        description={
          softVariant
            ? "Explore classroom learning, school trips, graduation highlights, and the everyday warmth of the St. Jacinta community."
            : "Explore moments that reflect learning, school life, events, and the environment in which learners grow each day."
        }
      />

      <section className="shell section-space">
        <SectionHeader
          school={school}
          eyebrow="Visual Storytelling"
          title={
            softVariant
              ? `A more curated view of life at ${school.shortName}.`
              : `Moments that reflect the spirit of ${school.shortName}.`
          }
          description={
            softVariant
              ? "This collection brings together learner growth, school trips, graduation moments, and the everyday atmosphere families want to see before they visit."
              : "The gallery offers a window into the rhythm of school life, showing the learning environment, events, facilities, and day-to-day learner experiences."
          }
        />

        {softVariant ? (
          <>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  label: "Learning",
                  value: `${learningCount} moments`,
                  description: "Real classroom progress and learner development."
                },
                {
                  label: "Trips",
                  value: `${tripCount} moments`,
                  description: "Educational outings and shared school experiences."
                },
                {
                  label: "Graduation",
                  value: `${graduationCount} moment${graduationCount === 1 ? "" : "s"}`,
                  description: "Important milestones families will love to see."
                }
              ].map((item) => (
                <article
                  key={item.label}
                  className="rounded-[1.45rem] border border-slate-200 bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] px-5 py-5 shadow-[0_18px_38px_-30px_rgba(15,23,42,0.16)]"
                >
                  <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                  <p className="mt-3 text-xl font-semibold tracking-tight text-slate-950">{item.value}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-[1.7rem] border border-slate-200 bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] p-5 shadow-[0_24px_54px_-40px_rgba(15,23,42,0.16)] sm:p-6">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[var(--school-primary)]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[var(--school-primary)]"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10">
          <GalleryMosaic school={school} items={galleryItems} />
        </div>
      </section>

      <CTASection
        school={school}
        title="Visit the school and experience the environment first-hand."
        description="Families are welcome to contact the school, arrange a visit, and learn more about daily life within the school community."
      />
    </>
  );
}
