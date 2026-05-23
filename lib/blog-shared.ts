import type { SchoolId } from "@/data/schools";

export const ST_JACINTA_BLOG_SCHOOL_ID = "st-jacinta" as const;
export const BLOG_ENABLED_SCHOOL_IDS: readonly SchoolId[] = [ST_JACINTA_BLOG_SCHOOL_ID];

export type BlogPostStatus = "draft" | "published";

export type BlogPostRecord = {
  id: string;
  schoolId: SchoolId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  coverImagePath: string | null;
  authorName: string;
  status: BlogPostStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostRow = {
  id: string;
  school_id: SchoolId;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  cover_image_path: string | null;
  author_name: string;
  status: BlogPostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export function isBlogEnabledForSchool(schoolId: SchoolId) {
  return BLOG_ENABLED_SCHOOL_IDS.includes(schoolId);
}

export function mapBlogPostRow(row: BlogPostRow): BlogPostRecord {
  return {
    id: row.id,
    schoolId: row.school_id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImageUrl: row.cover_image_url,
    coverImagePath: row.cover_image_path,
    authorName: row.author_name,
    status: row.status,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
