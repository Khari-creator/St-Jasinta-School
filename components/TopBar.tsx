"use client";

import Link from "next/link";
import {
  Facebook,
  GraduationCap,
  Instagram,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Youtube
} from "lucide-react";

import type { SchoolProfile } from "@/data/schools";
import {
  cn,
  createWhatsAppLink,
  isValidContactValue
} from "@/lib/utils";

type TopBarProps = {
  school: SchoolProfile;
  collapsed?: boolean;
};

export default function TopBar({ school, collapsed = false }: TopBarProps) {
  const whatsappReady = isValidContactValue(school.contact.whatsapp);
  const infoItems = [
    {
      icon: MapPin,
      label: school.location
    },
    {
      icon: GraduationCap,
      label: school.topBar.items[0] ?? school.curriculum[0]
    },
    {
      icon: ShieldCheck,
      label: school.topBar.items[1] ?? school.curriculum[1] ?? school.curriculum[0]
    }
  ];
  const socialLinks = [
    {
      label: "WhatsApp",
      href: whatsappReady ? createWhatsAppLink(school.contact.whatsapp) : "/contact",
      icon: MessageCircle,
      external: whatsappReady
    },
    {
      label: "Instagram",
      href: "/gallery",
      icon: Instagram
    },
    {
      label: "Facebook",
      href: "/about",
      icon: Facebook
    },
    {
      label: "YouTube",
      href: "/contact",
      icon: Youtube
    }
  ];

  return (
    <div
      className={cn(
        "pointer-events-auto overflow-hidden border-b border-black/10 text-white transition-all duration-300 ease-out",
        collapsed
          ? "max-h-0 -translate-y-full border-transparent opacity-0"
          : "max-h-20 translate-y-0 opacity-100"
      )}
      style={{ backgroundColor: school.theme.primary }}
    >
      <div className="shell flex min-h-[2.75rem] items-center gap-4 py-1.5">
        <div className="hidden min-w-0 items-center gap-4 text-[0.78rem] text-white/78 lg:flex xl:gap-5">
          {infoItems.map(({ icon: Icon, label }) => (
            <div key={label} className="inline-flex min-w-0 items-center gap-2">
              <Icon className="h-3.5 w-3.5 shrink-0 text-white/58" />
              <span className="truncate">{label}</span>
            </div>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.82rem] text-white/82 sm:text-[0.84rem]">
            {school.topBar.announcement}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <Link
            href="/contact"
            className="hidden shrink-0 text-[0.74rem] font-semibold uppercase tracking-[0.28em] text-[var(--school-secondary)] lg:inline-flex"
          >
            {school.topBar.ctaLabel}
          </Link>
          {socialLinks.map(({ label, href, icon: Icon, external }) => (
            <Link
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              aria-label={label}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white/72 hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-[0.95rem] w-[0.95rem]" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
