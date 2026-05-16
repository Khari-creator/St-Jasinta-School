import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AcademicSectionPage from "@/components/AcademicSectionPage";
import {
  academicPageContentBySchool,
  getAcademicSectionById
} from "@/data/academics";
import { getSchoolContext } from "@/lib/getSchool";
import { buildMetadata } from "@/lib/utils";

type AcademicSectionRouteProps = {
  params: Promise<{
    section: string;
  }>;
};

export function generateStaticParams() {
  const sectionIds = new Set<string>();

  Object.values(academicPageContentBySchool).forEach((pageContent) => {
    pageContent.sections.forEach((section) => {
      sectionIds.add(section.id);
    });
  });

  return Array.from(sectionIds).map((section) => ({ section }));
}

export async function generateMetadata({
  params
}: AcademicSectionRouteProps): Promise<Metadata> {
  const { school, origin } = await getSchoolContext();
  const { section: sectionId } = await params;
  const academicSection = getAcademicSectionById(school.id, sectionId);

  return buildMetadata({
    school,
    origin,
    pathname: `/academics/${sectionId}`,
    title: academicSection ? `${academicSection.label} Academics` : "Academics",
    description: academicSection
      ? `Explore the ${academicSection.label.toLowerCase()} pathway at ${school.name}, including the learning focus, student support, and next academic steps.`
      : `Explore the academic pathways at ${school.name}.`
  });
}

export default async function AcademicSectionRoute({
  params
}: AcademicSectionRouteProps) {
  const { school } = await getSchoolContext();
  const { section: sectionId } = await params;
  const pageContent = academicPageContentBySchool[school.id];
  const academicSection = getAcademicSectionById(school.id, sectionId);

  if (!academicSection) {
    notFound();
  }

  return (
    <AcademicSectionPage
      school={school}
      pageContent={pageContent}
      section={academicSection}
    />
  );
}
