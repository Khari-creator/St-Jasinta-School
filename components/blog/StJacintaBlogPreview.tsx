import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { SchoolProfile } from "@/data/schools";
import type { BlogPostRecord } from "@/lib/blog-shared";
import BlogCard from "@/components/blog/BlogCard";
import BlogEmptyState from "@/components/blog/BlogEmptyState";
import SectionHeader from "@/components/SectionHeader";

type StJacintaBlogPreviewProps = {
  school: SchoolProfile;
  posts: BlogPostRecord[];
};

export default function StJacintaBlogPreview({ school, posts }: StJacintaBlogPreviewProps) {
  const featuredPost = posts[0];
  const supportingPosts = posts.slice(1, 3);

  return (
    <section className="shell section-space pt-2">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          school={school}
          eyebrow="School Blog"
          title="Latest updates, learning highlights, and school stories."
          description="This space helps parents and guardians keep up with academic milestones, school activities, learner moments, and important St. Jacinta updates."
        />

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--school-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
        >
          Visit the Blog
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {featuredPost ? (
        <div className="mt-10 grid gap-5">
          <BlogCard school={school} post={featuredPost} featured />
          {supportingPosts.length > 0 ? (
            <div className="grid gap-5 xl:grid-cols-2">
              {supportingPosts.map((post) => (
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
  );
}
