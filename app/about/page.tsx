import type { Metadata } from "next";

import CTASection from "@/components/CTASection";
import FeatureCard from "@/components/FeatureCard";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import Timeline from "@/components/Timeline";
import { getSchoolContext } from "@/lib/getSchool";
import { buildMetadata, cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { school, origin } = await getSchoolContext();

  return buildMetadata({
    school,
    origin,
    pathname: "/about",
    title: "About",
    description: `Learn the story, mission, vision, leadership, and values behind ${school.name}.`
  });
}

export default async function AboutPage() {
  const { school } = await getSchoolContext();
  const softVariant = school.id === "st-jacinta";

  return (
    <>
      <PageHero
        school={school}
        eyebrow="About the School"
        title={`The story behind ${school.shortName}.`}
        description={`${school.history} Our story reflects a journey of commitment, growth, and a deep desire to serve learners and families well.`}
      />

      <section className="shell section-space">
        <div className="grid gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <article
            className={cn(
              "border p-6 shadow-panel sm:p-8",
              softVariant
                ? "rounded-[2rem] border-slate-200 bg-white"
                : "rounded-[1.55rem] border-slate-200 bg-white"
            )}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">School History</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              A story of vision, growth, and steady progress.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{school.history}</p>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Over the years, the school has continued to grow by remaining committed to quality learning, strong values,
              and the everyday wellbeing of its learners.
            </p>
          </article>

          <div className="grid gap-4">
            {[
              { label: "Mission", value: school.mission },
              { label: "Vision", value: school.vision },
              { label: "Motto", value: school.motto }
            ].map((item) => (
              <article
                key={item.label}
                className={cn(
                  "border p-6 shadow-panel sm:p-7",
                  softVariant
                    ? "rounded-[2rem] border-slate-200 bg-[linear-gradient(135deg,var(--school-surface),white)]"
                    : "rounded-[1.55rem] border-slate-200 bg-[linear-gradient(135deg,var(--school-surface),white)]"
                )}
              >
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{item.label}</p>
                <p className="mt-4 text-lg leading-8 text-slate-700 sm:text-xl">{item.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-4">
        <SectionHeader
          school={school}
          eyebrow="Leadership and Culture"
          title="Values that shape the school community each day."
          description={`${school.shortName} seeks to nurture learners in an environment where character, discipline, and growth are treated as an essential part of education.`}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {school.values.map((value, index) => (
            <FeatureCard key={value.title} school={school} feature={value} index={index} />
          ))}
        </div>

        <article
          className={cn(
            "mt-8 border p-6 shadow-panel sm:p-8",
            softVariant
              ? "rounded-[2rem] border-slate-200 bg-white"
              : "rounded-[1.55rem] border-slate-200 bg-white"
          )}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{"Director's Note"}</p>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{school.leadershipNote}</p>
        </article>
      </section>

      <section className="shell section-space">
        <SectionHeader
          school={school}
          eyebrow="Growth Milestones"
          title={"Key moments in the school's journey."}
          description="These milestones reflect how the school began, how it has grown over time, and how it continues to respond to the changing needs of learners."
          align="center"
        />
        <div className="mt-12">
          <Timeline school={school} />
        </div>
      </section>

      <CTASection
        school={school}
        title={`Become part of the ${school.shortName} community.`}
        description="We warmly welcome families who would like to learn more, visit the school, or begin the admissions process."
      />
    </>
  );
}
