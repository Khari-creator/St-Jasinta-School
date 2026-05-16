import type { Metadata } from "next";

import CTASection from "@/components/CTASection";
import GalleryMosaic from "@/components/GalleryMosaic";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
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
  const categories = Array.from(new Set(school.gallery.map((item) => item.category)));

  return (
    <>
      <PageHero
        school={school}
        eyebrow="Gallery"
        title={`A glimpse into life at ${school.shortName}.`}
        description="Explore moments that reflect learning, school life, events, and the environment in which learners grow each day."
      />

      <section className="shell section-space">
        <SectionHeader
          school={school}
          eyebrow="Visual Storytelling"
          title={`Moments that reflect the spirit of ${school.shortName}.`}
          description="The gallery offers a window into the rhythm of school life, showing the learning environment, events, facilities, and day-to-day learner experiences."
        />

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

        <div className="mt-10">
          <GalleryMosaic school={school} items={school.gallery} />
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
