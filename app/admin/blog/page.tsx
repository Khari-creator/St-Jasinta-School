import type { Metadata } from "next";
import { notFound } from "next/navigation";

import StJacintaBlogAdmin from "@/components/admin/StJacintaBlogAdmin";
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
      pathname: "/admin/blog",
      title: "Blog Admin",
      description: `Manage ${school.shortName} blog content and school updates.`
    }),
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function AdminBlogPage() {
  const { school } = await getSchoolContext();

  if (!isCustomAdminEnabledForSchool(school.id) || !isBlogEnabledForSchool(school.id)) {
    notFound();
  }

  return (
    <>
      <PageHero
        school={school}
        eyebrow="Admin"
        title={`Manage the ${school.shortName} blog.`}
        description="Create updates, upload blog cover images, save drafts, and publish parent-facing stories from a single school admin workspace."
      />
      <StJacintaBlogAdmin school={school} />
    </>
  );
}
