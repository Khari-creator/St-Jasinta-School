import type { SchoolId } from "@/data/schools";
import { readPrivateJson, getBlogIndexPath } from "@/lib/blob-content";
import { isBlogEnabledForSchool, type BlogPostRecord } from "@/lib/blog-shared";
import { isCustomAdminEnabledForSchool } from "@/lib/custom-admin";

function sortPosts(posts: BlogPostRecord[]) {
  return [...posts].sort((left, right) => {
    const leftDate = Date.parse(left.publishedAt ?? left.updatedAt ?? left.createdAt);
    const rightDate = Date.parse(right.publishedAt ?? right.updatedAt ?? right.createdAt);

    return rightDate - leftDate;
  });
}

async function getAllBlogPostsForSchool(schoolId: SchoolId): Promise<BlogPostRecord[]> {
  if (!isBlogEnabledForSchool(schoolId) || !isCustomAdminEnabledForSchool(schoolId)) {
    return [];
  }

  return readPrivateJson<BlogPostRecord[]>(getBlogIndexPath(schoolId), []);
}

export async function getPublishedBlogPostsForSchool(
  schoolId: SchoolId,
  limit?: number
): Promise<BlogPostRecord[]> {
  const publishedPosts = sortPosts((await getAllBlogPostsForSchool(schoolId)).filter((post) => post.status === "published"));

  return typeof limit === "number" ? publishedPosts.slice(0, limit) : publishedPosts;
}

export async function getPublishedBlogPosts(limit?: number): Promise<BlogPostRecord[]> {
  return getPublishedBlogPostsForSchool("st-jacinta", limit);
}

export async function getPublishedBlogPostBySlugForSchool(
  schoolId: SchoolId,
  slug: string
): Promise<BlogPostRecord | null> {
  const posts = await getPublishedBlogPostsForSchool(schoolId);
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostRecord | null> {
  return getPublishedBlogPostBySlugForSchool("st-jacinta", slug);
}
