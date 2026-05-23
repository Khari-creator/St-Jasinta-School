import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { getNavigationLinks, type SchoolProfile } from "@/data/schools";
import {
  createMailtoLink,
  createTelLink,
  createWhatsAppLink,
  isValidContactValue
} from "@/lib/utils";

type FooterProps = {
  school: SchoolProfile;
};

export default function Footer({ school }: FooterProps) {
  const phoneReady = isValidContactValue(school.contact.phone);
  const emailReady = isValidContactValue(school.contact.email);
  const whatsappReady = isValidContactValue(school.contact.whatsapp);
  const navigationLinks = getNavigationLinks(school.id);

  return (
    <footer
      className="text-slate-100"
      style={{
        backgroundImage: `linear-gradient(180deg, ${school.theme.primary} 0%, #10253d 100%)`
      }}
    >
      <div className="shell section-space">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.85fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/58">School Identity</p>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{school.name}</h2>
            <p className="max-w-2xl text-sm leading-7 text-white/72 sm:text-base">{school.summary}</p>
            <p className="text-sm text-white/66">
              Director: <span className="font-medium text-white">{school.director}</span>
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/58">Navigation</p>
            <div className="grid gap-2">
              {navigationLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-white/72 transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/58">Contact</p>
            <div className="space-y-3 text-sm text-white/72">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <span>{school.contact.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                {phoneReady ? (
                  <a href={createTelLink(school.contact.phone)} className="hover:text-white">
                    {school.contact.phone}
                  </a>
                ) : (
                  <span>{school.contact.phone}</span>
                )}
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                {emailReady ? (
                  <a href={createMailtoLink(school.contact.email)} className="hover:text-white">
                    {school.contact.email}
                  </a>
                ) : (
                  <span>Email available on request</span>
                )}
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                {whatsappReady ? (
                  <a
                    href={createWhatsAppLink(school.contact.whatsapp)}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp the school
                  </a>
                ) : (
                  <span>{school.contact.whatsapp}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/56 sm:flex-row sm:items-center sm:justify-between">
          <p>{school.name} {new Date().getFullYear()}.</p>
          <p>{school.motto}</p>
        </div>
      </div>
    </footer>
  );
}
