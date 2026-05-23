import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Images, PenSquare, ShieldCheck } from "lucide-react";

import PageHero from "@/components/PageHero";
import { isBlogEnabledForSchool } from "@/lib/blog-shared";
import { isCustomAdminEnabledForSchool } from "@/lib/custom-admin";
import { getSchoolContext } from "@/lib/getSchool";
import { buildMetadata } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { school, origin } = await getSchoolContext();

  return {
    ...buildMetadata({
      school,
      origin,
      pathname: "/admin",
      title: "Admin",
      description: `Manage ${school.shortName} content and media.`
    }),
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function AdminPage() {
  const { school } = await getSchoolContext();

  if (!isCustomAdminEnabledForSchool(school.id)) {
    notFound();
  }

  const tools = [
    ...(isBlogEnabledForSchool(school.id)
      ? [
          {
            title: "Blog Manager",
            description: "Write posts, upload cover images, save drafts, and publish school updates.",
            href: "/admin/blog",
            icon: PenSquare
          }
        ]
      : []),
    {
      title: "Gallery Manager",
      description: "Add, edit, feature, and remove gallery images used on the gallery page and homepage highlights.",
      href: "/admin/gallery",
      icon: Images
    }
  ];

  return (
    <>
      <PageHero
        school={school}
        eyebrow="Admin"
        title={`${school.shortName} content workspace.`}
        description="Choose a content area to manage. The admin workspace is designed for school updates, gallery media, and homepage visual highlights."
      />

      <section className="shell section-space">
        <div className="grid gap-5 xl:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-panel transition hover:-translate-y-1 hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.22)] sm:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[var(--school-tint)] text-[var(--school-primary)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-slate-950">
                  {tool.title}
                </h2>
                <p className="mt-3 text-base leading-8 text-slate-600">{tool.description}</p>
              </Link>
            );
          })}
        </div>

        <article className="mt-6 rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-panel sm:p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[var(--school-tint)] text-[var(--school-primary)]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-slate-950">
            Secure school-only access
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
            Each admin area checks the custom St. Jacinta login session before it allows editing, publishing, image uploads,
            or deletion.
          </p>
        </article>
      </section>
    </>
  );
}
