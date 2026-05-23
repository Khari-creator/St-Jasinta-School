import Link from "next/link";
import { Newspaper } from "lucide-react";

import type { SchoolProfile } from "@/data/schools";

type BlogEmptyStateProps = {
  school: SchoolProfile;
  title?: string;
  description?: string;
};

export default function BlogEmptyState({
  school,
  title = "School updates will appear here soon.",
  description = "The blog has been prepared for school news, academic highlights, events, and community updates. Once the first post is published, it will appear here automatically."
}: BlogEmptyStateProps) {
  return (
    <article className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] p-8 text-center shadow-[0_24px_60px_-44px_rgba(15,23,42,0.2)] sm:p-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--school-tint)] text-[var(--school-primary)]">
        <Newspaper className="h-7 w-7" />
      </div>
      <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-slate-950">{title}</h3>
      <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600">{description}</p>
      <div className="mt-6 flex justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full bg-[var(--school-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
        >
          Contact {school.shortName}
        </Link>
      </div>
    </article>
  );
}
