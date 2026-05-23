import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { SchoolProfile } from "@/data/schools";
import type { BlogPostRecord } from "@/lib/blog-shared";
import { cn, estimateReadingMinutes, formatDisplayDate } from "@/lib/utils";

type BlogCardProps = {
  school: SchoolProfile;
  post: BlogPostRecord;
  featured?: boolean;
};

export default function BlogCard({ school, post, featured = false }: BlogCardProps) {
  const readingMinutes = estimateReadingMinutes(post.content);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article
        className={cn(
          "overflow-hidden border border-slate-200 bg-white shadow-[0_24px_54px_-40px_rgba(15,23,42,0.2)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_70px_-42px_rgba(15,23,42,0.24)]",
          featured ? "rounded-[2rem]" : "rounded-[1.7rem]"
        )}
      >
        <div className={cn("grid", featured && "lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch")}>
          <div className="relative aspect-[16/11] overflow-hidden">
            {post.coverImageUrl ? (
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                sizes={featured ? "(max-width: 1023px) 100vw, 58vw" : "(max-width: 1023px) 100vw, 33vw"}
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${school.theme.primary} 0%, #10253d 100%)`
                }}
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,26,0.04)_0%,rgba(8,15,26,0.1)_52%,rgba(8,15,26,0.74)_100%)]" />
            <div className="absolute left-5 top-5">
              <span className="inline-flex rounded-full border border-white/18 bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                School Update
              </span>
            </div>
          </div>

          <div className={cn("p-6 sm:p-7", featured && "flex flex-col justify-center")}>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              <span>{formatDisplayDate(post.publishedAt ?? post.createdAt)}</span>
              <span>{readingMinutes} min read</span>
              <span>{post.authorName}</span>
            </div>

            <h3
              className={cn(
                "mt-4 font-display font-semibold tracking-tight text-slate-950",
                featured ? "text-3xl leading-tight sm:text-[2.5rem]" : "text-2xl leading-tight"
              )}
            >
              {post.title}
            </h3>

            <p className="mt-4 text-base leading-8 text-slate-600">{post.excerpt}</p>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--school-primary)]">
              Read Article
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
