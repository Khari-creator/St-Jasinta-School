import Link from "next/link";
import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";

import ContactPanel from "@/components/ContactPanel";
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
    pathname: "/contact",
    title: "Contact",
    description: `Contact ${school.name} for admissions, visits, and parent enquiries.`
  });
}

export default async function ContactPage() {
  const { school } = await getSchoolContext();
  const softVariant = school.id === "st-jacinta";
  const phoneReady = isValidContactValue(school.contact.phone);
  const emailReady = isValidContactValue(school.contact.email);
  const whatsappReady = isValidContactValue(school.contact.whatsapp);
  const officeCount = 1 + (school.contact.officePhones?.length ?? 0);
  const directorCount = school.contact.directorPhones?.length ?? 0;

  return (
    <>
      <PageHero
        school={school}
        eyebrow="Contact"
        title={`Get in touch with ${school.shortName}.`}
        description="We welcome parents, guardians, and visitors who would like to ask questions, arrange a visit, or learn more about the school."
      />

      <section className="shell section-space">
        <ContactPanel school={school} />
      </section>

      <section className="shell pb-10">
        <div className="grid gap-8 xl:grid-cols-[0.96fr_1.04fr]">
          <div className="space-y-6">
            <SectionHeader
              school={school}
              eyebrow="Preferred Contact Method"
              title="We are here to help you."
              description="For the fastest response, please contact the school directly by phone, WhatsApp, or email."
            />

            <div className="grid gap-3">
              <Link
                href={phoneReady ? createTelLink(school.contact.phone) : "/contact"}
                className="inline-flex items-center justify-between rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white"
              >
                <span>{officeCount > 1 ? "Call Office" : "Call School"}</span>
                <Phone className="h-4 w-4" />
              </Link>
              <Link
                href={whatsappReady ? createWhatsAppLink(school.contact.whatsapp) : "/contact"}
                className="inline-flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-200"
              >
                <span>{directorCount > 0 ? "WhatsApp Director" : "WhatsApp School"}</span>
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
          </div>

          <article
            className={cn(
              "border p-6 shadow-panel sm:p-8",
              softVariant
                ? "rounded-[2rem] border-slate-200 bg-white"
                : "rounded-[1.55rem] border-slate-200 bg-white"
            )}
          >
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Visit and Enquiries</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
              We would be glad to welcome you.
            </h2>
            <p className="mt-3 text-base leading-8 text-slate-600">
              Parents and guardians are welcome to contact the school for admissions information, school visits,
              programme enquiries, and any guidance they may need.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                "Call ahead to arrange a school visit.",
                "Reach out for admissions guidance and enrolment support.",
                "Use the director WhatsApp line for the quickest follow-up.",
                emailReady
                  ? "Email the school for admissions and general enquiries."
                  : "Please call or WhatsApp the school for the fastest response."
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
