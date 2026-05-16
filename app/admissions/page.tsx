import Link from "next/link";
import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";

import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { getSchoolContext } from "@/lib/getSchool";
import {
  buildMetadata,
  cn,
  createMailtoLink,
  createTelLink,
  createWhatsAppLink,
  isValidContactValue
} from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { school, origin } = await getSchoolContext();

  return buildMetadata({
    school,
    origin,
    pathname: "/admissions",
    title: "Admissions",
    description: `Learn how to begin admissions for ${school.name}, including steps, requirements, and the best way to contact the school.`
  });
}

export default async function AdmissionsPage() {
  const { school } = await getSchoolContext();
  const softVariant = school.id === "st-jacinta";
  const phoneReady = isValidContactValue(school.contact.phone);
  const emailReady = isValidContactValue(school.contact.email);
  const whatsappReady = isValidContactValue(school.contact.whatsapp);

  return (
    <>
      <PageHero
        school={school}
        eyebrow="Admissions"
        title={`Join the ${school.shortName} school community.`}
        description={`${school.admissions.intro} We aim to make the admissions process clear, welcoming, and easy for families to follow.`}
      />

      <section className="shell section-space">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-8">
            <SectionHeader
              school={school}
              eyebrow="How Admissions Begin"
              title="A simple process that helps families move forward confidently."
              description="Families can begin by contacting the school, visiting the campus, and receiving clear guidance from the admissions team."
            />

            <div className="grid gap-4">
              {school.admissions.steps.map((step, index) => (
                <article
                  key={step}
                  className={cn(
                    "flex gap-4 border p-5 shadow-sm",
                    softVariant
                      ? "rounded-[1.7rem] border-slate-200 bg-white"
                      : "rounded-[1.35rem] border-slate-200 bg-white"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold",
                      "bg-[var(--school-tint)] text-[var(--school-primary)]"
                    )}
                  >
                    {index + 1}
                  </div>
                  <p className="text-base leading-8 text-slate-700">{step}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <article
              className={cn(
                "border p-6 shadow-panel sm:p-7",
                softVariant
                  ? "rounded-[2rem] border-slate-200 bg-[linear-gradient(135deg,var(--school-surface),white)]"
                  : "rounded-[1.55rem] border-slate-200 bg-[linear-gradient(135deg,var(--school-surface),white)]"
              )}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Requirements</p>
              <div className="mt-5 grid gap-3">
                {school.admissions.requirements.map((requirement) => (
                  <div key={requirement} className="rounded-2xl bg-white px-4 py-4 text-sm leading-7 text-slate-700 shadow-sm">
                    {requirement}
                  </div>
                ))}
              </div>
            </article>

            <article
              className={cn(
                "border p-6 shadow-panel sm:p-7",
                softVariant
                  ? "rounded-[2rem] border-slate-200 bg-white"
                  : "rounded-[1.55rem] border-slate-200 bg-white"
              )}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Quick Contact</p>
              <p className="mt-4 text-base leading-8 text-slate-600">{school.admissions.familyNote}</p>
              <div className="mt-6 grid gap-3">
                <Link
                  href={phoneReady ? createTelLink(school.contact.phone) : "/contact"}
                  className="inline-flex items-center justify-between rounded-2xl bg-[var(--school-secondary)] px-5 py-4 text-sm font-semibold text-white"
                >
                  <span>Call School</span>
                  <Phone className="h-4 w-4" />
                </Link>
                <Link
                  href={whatsappReady ? createWhatsAppLink(school.contact.whatsapp) : "/contact"}
                  className="inline-flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200"
                >
                  <span>WhatsApp School</span>
                  <MessageCircle className="h-4 w-4" />
                </Link>
                {emailReady ? (
                  <Link
                    href={createMailtoLink(school.contact.email)}
                    className="inline-flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200"
                  >
                    <span>Email School</span>
                    <Mail className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </article>
          </div>
        </div>
      </section>

      <CTASection
        school={school}
        title="We look forward to welcoming your family."
        description="Please contact the school to arrange a visit, ask questions, or begin the next step in the admissions journey."
      />
    </>
  );
}
