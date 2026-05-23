import { NextRequest, NextResponse } from "next/server";

import { deletePublicBlob, getBlogIndexPath, readPrivateJson, writePrivateJson } from "@/lib/blob-content";
import { requireAdminSession } from "@/lib/custom-admin-request";
import { isBlogEnabledForSchool, type BlogPostRecord, type BlogPostStatus } from "@/lib/blog-shared";

export const runtime = "nodejs";

function sortPosts(posts: BlogPostRecord[]) {
  return [...posts].sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt));
}

export async function GET(request: NextRequest) {
  const { response } = requireAdminSession(request);

  if (response) {
    return response;
  }

  const schoolId = "st-jacinta";

  if (!isBlogEnabledForSchool(schoolId)) {
    return NextResponse.json([], { status: 200 });
  }

  const posts = await readPrivateJson<BlogPostRecord[]>(getBlogIndexPath(schoolId), []);

  return NextResponse.json(sortPosts(posts));
}

export async function POST(request: NextRequest) {
  const { response } = requireAdminSession(request);

  if (response) {
    return response;
  }

  const schoolId = "st-jacinta";
  const body = (await request.json()) as {
    id?: string | null;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    authorName?: string;
    coverImageUrl?: string | null;
    coverImagePath?: string | null;
    status?: BlogPostStatus;
    publishedAt?: string | null;
  };

  const title = body.title?.trim() ?? "";
  const slug = body.slug?.trim() ?? "";
  const content = body.content?.trim() ?? "";

  if (!title || !slug || !content) {
    return NextResponse.json(
      {
        error: "Title, slug, and content are required."
      },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const status = body.status === "published" ? "published" : "draft";
  const posts = await readPrivateJson<BlogPostRecord[]>(getBlogIndexPath(schoolId), []);
  const existingPost = body.id ? posts.find((post) => post.id === body.id) : null;

  const nextPost: BlogPostRecord = {
    id: existingPost?.id ?? crypto.randomUUID(),
    schoolId,
    title,
    slug,
    excerpt: body.excerpt?.trim() || content.split(/\s+/).slice(0, 28).join(" "),
    content,
    coverImageUrl: body.coverImageUrl?.trim() || null,
    coverImagePath: body.coverImagePath?.trim() || null,
    authorName: body.authorName?.trim() || "School Admin",
    status,
    publishedAt: status === "published" ? body.publishedAt ?? existingPost?.publishedAt ?? now : null,
    createdAt: existingPost?.createdAt ?? now,
    updatedAt: now
  };

  const duplicateSlug = posts.find((post) => post.slug === slug && post.id !== nextPost.id);

  if (duplicateSlug) {
    return NextResponse.json(
      {
        error: "Another post is already using that slug."
      },
      { status: 409 }
    );
  }

  const updatedPosts = sortPosts(
    existingPost ? posts.map((post) => (post.id === nextPost.id ? nextPost : post)) : [nextPost, ...posts]
  );

  await writePrivateJson(getBlogIndexPath(schoolId), updatedPosts);

  return NextResponse.json(nextPost);
}

export async function DELETE(request: NextRequest) {
  const { response } = requireAdminSession(request);

  if (response) {
    return response;
  }

  const id = request.nextUrl.searchParams.get("id")?.trim();

  if (!id) {
    return NextResponse.json(
      {
        error: "Post id is required."
      },
      { status: 400 }
    );
  }

  const schoolId = "st-jacinta";
  const posts = await readPrivateJson<BlogPostRecord[]>(getBlogIndexPath(schoolId), []);
  const postToDelete = posts.find((post) => post.id === id);

  if (!postToDelete) {
    return NextResponse.json(
      {
        error: "Post not found."
      },
      { status: 404 }
    );
  }

  if (postToDelete.coverImagePath) {
    await deletePublicBlob(postToDelete.coverImagePath);
  }

  await writePrivateJson(
    getBlogIndexPath(schoolId),
    posts.filter((post) => post.id !== id)
  );

  return NextResponse.json({
    ok: true
  });
}
