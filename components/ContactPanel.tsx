import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import type { SchoolProfile } from "@/data/schools";
import {
  cn,
  createMailtoLink,
  createTelLink,
  createWhatsAppLink,
  isValidContactValue
} from "@/lib/utils";

type ContactPanelProps = {
  school: SchoolProfile;
};

export default function ContactPanel({ school }: ContactPanelProps) {
  const softVariant = school.id === "st-jacinta";
  const phoneReady = isValidContactValue(school.contact.phone);
  const emailReady = isValidContactValue(school.contact.email);
  const whatsappReady = isValidContactValue(school.contact.whatsapp);
  const officeLines = [school.contact.phone, ...(school.contact.officePhones ?? [])].filter(isValidContactValue);
  const directorLines = (school.contact.directorPhones ?? []).filter(isValidContactValue);
  const emailLines = [school.contact.email, ...(school.contact.emailSecondary ?? [])].filter(isValidContactValue);
  const mapQuery = encodeURIComponent(school.contact.mapQuery ?? school.contact.address);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div
        className={cn(
          "border p-6 sm:p-8",
          softVariant
            ? "rounded-[2rem] border-slate-200 bg-white"
            : "rounded-[1.5rem] border-slate-200 bg-white"
        )}
      >
        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Reach the school</h3>
        <p className="mt-3 text-base leading-7 text-slate-600">
          For quick response, parents and guardians are encouraged to call or WhatsApp the school directly.
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-[var(--school-primary)]" />
            <div>
              <p className="font-semibold text-slate-950">Location</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{school.contact.address}</p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-[var(--school-primary)]" />
            <div>
              <p className="font-semibold text-slate-950">Office Lines</p>
              {officeLines.length > 0 ? (
                <div className="mt-2 space-y-1.5 text-sm text-slate-600">
                  {officeLines.map((line) => (
                    <a key={line} href={createTelLink(line)} className="block hover:text-slate-950">
                      {line}
                    </a>
                  ))}
                </div>
              ) : phoneReady ? (
                <a href={createTelLink(school.contact.phone)} className="mt-1 block text-sm text-slate-600 hover:text-slate-950">
                  {school.contact.phone}
                </a>
              ) : (
                <p className="mt-1 text-sm text-slate-600">{school.contact.phone}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
            <Phone className="mt-1 h-5 w-5 shrink-0 text-[var(--school-primary)]" />
            <div>
              <p className="font-semibold text-slate-950">Director Lines</p>
              {directorLines.length > 0 ? (
                <div className="mt-2 space-y-1.5 text-sm text-slate-600">
                  {directorLines.map((line) => (
                    <a key={line} href={createTelLink(line)} className="block hover:text-slate-950">
                      {line}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-sm text-slate-600">Director contact available on request.</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-[var(--school-primary)]" />
            <div>
              <p className="font-semibold text-slate-950">Email</p>
              {emailLines.length > 0 ? (
                <div className="mt-2 space-y-1.5 text-sm text-slate-600">
                  {emailLines.map((line) => (
                    <a key={line} href={createMailtoLink(line)} className="block hover:text-slate-950">
                      {line}
                    </a>
                  ))}
                </div>
              ) : emailReady ? (
                <a href={createMailtoLink(school.contact.email)} className="mt-1 block text-sm text-slate-600 hover:text-slate-950">
                  {school.contact.email}
                </a>
              ) : (
                <p className="mt-1 text-sm text-slate-600">Email contact details will be shared on request.</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl bg-slate-50 p-4">
            <MessageCircle className="mt-1 h-5 w-5 shrink-0 text-[var(--school-primary)]" />
            <div>
              <p className="font-semibold text-slate-950">WhatsApp</p>
              {whatsappReady ? (
                <a
                  href={createWhatsAppLink(school.contact.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-sm text-slate-600 hover:text-slate-950"
                >
                  Start a WhatsApp conversation
                </a>
              ) : (
                <p className="mt-1 text-sm text-slate-600">{school.contact.whatsapp}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "min-h-[300px] border p-6 sm:p-8",
          softVariant
            ? "rounded-[2rem] border-slate-200 bg-[linear-gradient(180deg,var(--school-surface),white)]"
            : "rounded-[1.5rem] border-slate-200 bg-[linear-gradient(180deg,var(--school-surface),white)]"
        )}
      >
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">School Location Map</p>
        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
          <iframe
            title={`${school.name} map`}
            src={`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
