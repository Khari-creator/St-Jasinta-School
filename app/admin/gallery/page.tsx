import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SchoolGalleryAdmin from "@/components/admin/SchoolGalleryAdmin";
import PageHero from "@/components/PageHero";
import { isCustomAdminEnabledForSchool } from "@/lib/custom-admin";
import { getSchoolContext } from "@/lib/getSchool";
import { buildMetadata } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { school, origin } = await getSchoolContext();

  return {
    ...buildMetadata({
      school,
      origin,
      pathname: "/admin/gallery",
      title: "Gallery Admin",
      description: `Manage ${school.shortName} gallery images and featured highlights.`
    }),
    robots: {
      index: false,
      follow: false
    }
  };
}

export default async function AdminGalleryPage() {
  const { school } = await getSchoolContext();

  if (!isCustomAdminEnabledForSchool(school.id)) {
    notFound();
  }

  return (
    <>
      <PageHero
        school={school}
        eyebrow="Admin"
        title={`Manage the ${school.shortName} gallery.`}
        description="Upload new images, update descriptions and categories, control featured gallery highlights, and remove older media from one admin workspace."
      />
      <SchoolGalleryAdmin school={school} />
    </>
  );
}
