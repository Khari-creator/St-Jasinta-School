import { MessageCircle } from "lucide-react";

import type { SchoolProfile } from "@/data/schools";
import { createWhatsAppLink, isValidContactValue } from "@/lib/utils";

type FloatingWhatsAppButtonProps = {
  school: SchoolProfile;
};

export default function FloatingWhatsAppButton({ school }: FloatingWhatsAppButtonProps) {
  if (!isValidContactValue(school.contact.whatsapp)) {
    return null;
  }

  return (
    <a
      href={createWhatsAppLink(school.contact.whatsapp)}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with ${school.shortName} on WhatsApp`}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(18,28,45,0.22)] transition hover:bg-[#20bc5c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] sm:bottom-6 sm:right-6"
    >
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/16">
        <MessageCircle className="h-5 w-5" />
      </span>
      <span className="hidden pr-1 sm:inline">WhatsApp Us</span>
    </a>
  );
}
