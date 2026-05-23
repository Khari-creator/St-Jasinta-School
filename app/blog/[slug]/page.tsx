import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import BlogArticleContent from "@/components/blog/BlogArticleContent";
import BlogCard from "@/components/blog/BlogCard";
import CTASection from "@/components/CTASection";
import SectionHeader from "@/components/SectionHeader";
import {
  getPublishedBlogPostBySlugForSchool,
  getPublishedBlogPostsForSchool
} from "@/lib/blog";
import { isBlogEnabledForSchool } from "@/lib/blog-shared";
import { getSchoolContext } from "@/lib/getSchool";
import { buildMetadata, estimateReadingMinutes, formatDisplayDate } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { school, origin } = await getSchoolContext();
  const { slug } = await params;

  if (!isBlogEnabledForSchool(school.id)) {
    return buildMetadata({
      school,
      origin,
      pathname: `/blog/${slug}`,
      title: "Blog",
      description: `${school.name} school blog article.`
    });
  }

  const post = await getPublishedBlogPostBySlugForSchool(school.id, slug);

  return buildMetadata({
    school,
    origin,
    pathname: `/blog/${slug}`,
    title: post?.title ?? "Blog",
    description: post?.excerpt ?? `Read the latest St. Jacinta school update.`
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { school } = await getSchoolContext();

  if (!isBlogEnabledForSchool(school.id)) {
    notFound();
  }

  const { slug } = await params;
  const post = await getPublishedBlogPostBySlugForSchool(school.id, slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getPublishedBlogPostsForSchool(school.id))
    .filter((item) => item.slug !== slug)
    .slice(0, 2);
  const readingMinutes = estimateReadingMinutes(post.content);

  return (
    <>
      <section className="shell pt-6 sm:pt-8">
        <article className="overflow-hidden rounded-[2.1rem] border border-slate-200 bg-white shadow-panel">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            <div className="relative min-h-[320px] overflow-hidden">
              {post.coverImageUrl ? (
                <Image
                  src={post.coverImageUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1023px) 100vw, 48vw"
                  className="object-cover"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${school.theme.primary} 0%, #10253d 100%)`
                  }}
                />
              )}
            </div>

            <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--school-primary)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                <span>{formatDisplayDate(post.publishedAt ?? post.createdAt)}</span>
                <span>{readingMinutes} min read</span>
                <span>{post.authorName}</span>
              </div>

              <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
                {post.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-600">{post.excerpt}</p>
            </div>
          </div>
        </article>
      </section>

      <section className="shell section-space">
        <div className="grid gap-10 xl:grid-cols-[0.84fr_0.16fr]">
          <article className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-panel sm:px-8 sm:py-10">
            <BlogArticleContent content={post.content} />
          </article>
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="shell pb-4">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              school={school}
              eyebrow="Related Updates"
              title="More from the St. Jacinta school blog."
              description="Continue exploring recent stories, community highlights, and school updates shared for families."
            />
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--school-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
            >
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 xl:grid-cols-2">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.id} school={school} post={relatedPost} />
            ))}
          </div>
        </section>
      ) : null}

      <CTASection
        school={school}
        title="Keep up with school life at St. Jacinta."
        description="For more updates, admissions support, or a school visit, please contact the school directly."
      />
    </>
  );
}
