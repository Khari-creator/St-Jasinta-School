import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import MotionReveal from "@/components/MotionReveal";
import type { SchoolProfile } from "@/data/schools";
import {
  createTelLink,
  createWhatsAppLink,
  isValidContactValue
} from "@/lib/utils";

type CTASectionProps = {
  school: SchoolProfile;
  title: string;
  description: string;
};

export default function CTASection({
  school,
  title,
  description
}: CTASectionProps) {
  const phoneReady = isValidContactValue(school.contact.phone);
  const whatsappReady = isValidContactValue(school.contact.whatsapp);

  return (
    <section className="shell section-space">
      <MotionReveal>
        <div
          className="overflow-hidden rounded-[1.9rem] border border-slate-200 px-6 py-10 text-white shadow-panel sm:px-8 sm:py-12 lg:px-12"
          style={{
            backgroundImage: `linear-gradient(135deg, #10233a 0%, ${school.theme.primary} 58%, #173455 100%)`
          }}
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-4">
              <span className="inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em]">
                Ready to Take the Next Step?
              </span>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="max-w-2xl text-base leading-8 text-white/82 sm:text-lg">{description}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--school-secondary)] px-6 py-3 text-sm font-semibold text-white"
              >
                Admissions
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={phoneReady ? createTelLink(school.contact.phone) : "/contact"}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 py-3 text-sm font-semibold text-white"
              >
                <Phone className="h-4 w-4" />
                Call School
              </Link>
              <Link
                href={whatsappReady ? createWhatsAppLink(school.contact.whatsapp) : "/contact"}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </MotionReveal>
    </section>
  );
}
