import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogCard from "@/components/blog/BlogCard";
import BlogEmptyState from "@/components/blog/BlogEmptyState";
import CTASection from "@/components/CTASection";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { getPublishedBlogPostsForSchool } from "@/lib/blog";
import { isBlogEnabledForSchool } from "@/lib/blog-shared";
import { getSchoolContext } from "@/lib/getSchool";
import { buildMetadata } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const { school, origin } = await getSchoolContext();

  if (!isBlogEnabledForSchool(school.id)) {
    return buildMetadata({
      school,
      origin,
      pathname: "/blog",
      title: "Blog",
      description: `${school.name} blog.`
    });
  }

  return buildMetadata({
    school,
    origin,
    pathname: "/blog",
    title: "Blog",
    description: `Read the latest St. Jacinta school news, learning highlights, and parent updates.`
  });
}

export default async function BlogPage() {
  const { school } = await getSchoolContext();

  if (!isBlogEnabledForSchool(school.id)) {
    notFound();
  }

  const posts = await getPublishedBlogPostsForSchool(school.id);
  const featuredPost = posts[0];
  const secondaryPosts = posts.slice(1);

  return (
    <>
      <PageHero
        school={school}
        eyebrow="School Blog"
        title="News, learning stories, and updates from St. Jacinta."
        description="Follow academic highlights, school events, learner moments, and important updates shared with families and the wider school community."
      />

      <section className="shell section-space">
        <SectionHeader
          school={school}
          eyebrow="Latest Articles"
          title="A dedicated space for school news and parent-facing updates."
          description="The St. Jacinta blog is designed to help families stay close to school life through thoughtful updates, meaningful stories, and timely announcements."
        />

        {featuredPost ? (
          <div className="mt-10 grid gap-5">
            <BlogCard school={school} post={featuredPost} featured />
            {secondaryPosts.length > 0 ? (
              <div className="grid gap-5 xl:grid-cols-2">
                {secondaryPosts.map((post) => (
                  <BlogCard key={post.id} school={school} post={post} />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-10">
            <BlogEmptyState school={school} />
          </div>
        )}
      </section>

      <CTASection
        school={school}
        title="Would you like to learn more about St. Jacinta?"
        description="Please contact the school to arrange a visit, ask questions, or explore the admissions journey for your family."
      />
    </>
  );
}
