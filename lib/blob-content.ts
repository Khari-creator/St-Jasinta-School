import { del, get, put } from "@vercel/blob";

import type { SchoolId } from "@/data/schools";

const PUBLIC_BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN?.trim() ?? "";
const CONTENT_BLOB_TOKEN = process.env.CONTENT_BLOB_READ_WRITE_TOKEN?.trim() ?? "";

export function hasBlobImageStoreConfig() {
  return Boolean(PUBLIC_BLOB_TOKEN);
}

export function hasBlobContentStoreConfig() {
  return Boolean(CONTENT_BLOB_TOKEN);
}

export function getBlogIndexPath(schoolId: SchoolId) {
  return `${schoolId}/content/blog-posts.json`;
}

export function getGalleryIndexPath(schoolId: SchoolId) {
  return `${schoolId}/content/gallery-items.json`;
}

export async function readPrivateJson<T>(pathname: string, fallback: T): Promise<T> {
  if (!hasBlobContentStoreConfig()) {
    return fallback;
  }

  const result = await get(pathname, {
    access: "private",
    token: CONTENT_BLOB_TOKEN
  });

  if (!result || result.statusCode !== 200) {
    return fallback;
  }

  const text = await new Response(result.stream).text();

  if (!text.trim()) {
    return fallback;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

export async function writePrivateJson(pathname: string, value: unknown) {
  if (!hasBlobContentStoreConfig()) {
    throw new Error("Vercel Blob content store is not configured.");
  }

  return put(pathname, JSON.stringify(value, null, 2), {
    access: "private",
    token: CONTENT_BLOB_TOKEN,
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: "application/json"
  });
}

export async function uploadPublicImage(pathname: string, body: File | Blob) {
  if (!hasBlobImageStoreConfig()) {
    throw new Error("Vercel Blob image store is not configured.");
  }

  return put(pathname, body, {
    access: "public",
    token: PUBLIC_BLOB_TOKEN,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: body.type || undefined
  });
}

export async function deletePublicBlob(pathname: string) {
  if (!hasBlobImageStoreConfig()) {
    return;
  }

  await del(pathname, {
    token: PUBLIC_BLOB_TOKEN
  });
}
