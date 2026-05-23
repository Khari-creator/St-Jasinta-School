import type { Metadata } from "next";

import type { SchoolProfile } from "@/data/schools";

const placeholderPattern = /(to be added|coming soon|placeholder)/i;

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function isValidContactValue(value: string) {
  return Boolean(value) && !placeholderPattern.test(value);
}

export function createTelLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function createWhatsAppLink(whatsapp: string) {
  return `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`;
}

export function createMailtoLink(email: string) {
  return `mailto:${email}`;
}

export function createSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 80);
}

export function formatDisplayDate(value: string | null | undefined) {
  if (!value) {
    return "Date to be confirmed";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

export function estimateReadingMinutes(value: string) {
  const words = value.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function buildMetadata({
  school,
  origin,
  pathname = "/",
  title,
  description
}: {
  school: SchoolProfile;
  origin: string;
  pathname?: string;
  title?: string;
  description?: string;
}): Metadata {
  const resolvedTitle = title ? `${title} | ${school.name}` : school.name;
  const resolvedDescription = description ?? school.seoDescription;
  const pageUrl = new URL(pathname, `${origin}/`).toString();

  return {
    metadataBase: new URL(origin),
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: pageUrl,
      siteName: school.name,
      locale: "en_KE",
      type: "website",
      images: [
        {
          url: `${origin}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${school.name} preview image`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [`${origin}/opengraph-image`]
    },
    icons: {
      icon: `${origin}/icon`,
      apple: `${origin}/icon`
    }
  };
}
