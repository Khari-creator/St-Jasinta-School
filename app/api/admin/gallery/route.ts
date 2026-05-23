import { NextRequest, NextResponse } from "next/server";

import { deletePublicBlob, getGalleryIndexPath, readPrivateJson, writePrivateJson } from "@/lib/blob-content";
import { requireAdminSession } from "@/lib/custom-admin-request";
import type { GalleryItemRecord, GalleryCategory } from "@/lib/gallery-shared";

export const runtime = "nodejs";

function sortItems(items: GalleryItemRecord[]) {
  return [...items].sort((left, right) => {
    const featuredDelta = Number(Boolean(right.isFeatured)) - Number(Boolean(left.isFeatured));

    if (featuredDelta !== 0) {
      return featuredDelta;
    }

    const leftFeaturedOrder = left.featuredOrder ?? Number.MAX_SAFE_INTEGER;
    const rightFeaturedOrder = right.featuredOrder ?? Number.MAX_SAFE_INTEGER;

    if (leftFeaturedOrder !== rightFeaturedOrder) {
      return leftFeaturedOrder - rightFeaturedOrder;
    }

    const leftSortOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
    const rightSortOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

    if (leftSortOrder !== rightSortOrder) {
      return leftSortOrder - rightSortOrder;
    }

    return Date.parse(left.createdAt) - Date.parse(right.createdAt);
  });
}

export async function GET(request: NextRequest) {
  const { response } = requireAdminSession(request);

  if (response) {
    return response;
  }

  const items = await readPrivateJson<GalleryItemRecord[]>(getGalleryIndexPath("st-jacinta"), []);
  return NextResponse.json(sortItems(items));
}

export async function POST(request: NextRequest) {
  const { response } = requireAdminSession(request);

  if (response) {
    return response;
  }

  const body = (await request.json()) as {
    id?: string | null;
    title?: string;
    alt?: string;
    category?: GalleryCategory;
    imageUrl?: string;
    imagePath?: string | null;
    isFeatured?: boolean;
    featuredOrder?: number | null;
    sortOrder?: number | null;
  };

  const alt = body.alt?.trim() ?? "";
  const imageUrl = body.imageUrl?.trim() ?? "";

  if (!alt || !imageUrl || !body.category) {
    return NextResponse.json(
      {
        error: "Image, category, and description are required."
      },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const items = await readPrivateJson<GalleryItemRecord[]>(getGalleryIndexPath("st-jacinta"), []);
  const existingItem = body.id ? items.find((item) => item.id === body.id) : null;

  const nextItem: GalleryItemRecord = {
    id: existingItem?.id ?? crypto.randomUUID(),
    schoolId: "st-jacinta",
    src: imageUrl,
    alt,
    category: body.category,
    title: body.title?.trim() || undefined,
    imagePath: body.imagePath?.trim() || null,
    isFeatured: Boolean(body.isFeatured),
    featuredOrder: body.isFeatured ? body.featuredOrder ?? 1 : undefined,
    sortOrder: body.sortOrder ?? undefined,
    createdAt: existingItem?.createdAt ?? now,
    updatedAt: now
  };

  const updatedItems = sortItems(
    existingItem ? items.map((item) => (item.id === nextItem.id ? nextItem : item)) : [...items, nextItem]
  );

  await writePrivateJson(getGalleryIndexPath("st-jacinta"), updatedItems);

  return NextResponse.json(nextItem);
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
        error: "Gallery item id is required."
      },
      { status: 400 }
    );
  }

  const items = await readPrivateJson<GalleryItemRecord[]>(getGalleryIndexPath("st-jacinta"), []);
  const itemToDelete = items.find((item) => item.id === id);

  if (!itemToDelete) {
    return NextResponse.json(
      {
        error: "Gallery item not found."
      },
      { status: 404 }
    );
  }

  if (itemToDelete.imagePath) {
    await deletePublicBlob(itemToDelete.imagePath);
  }

  await writePrivateJson(
    getGalleryIndexPath("st-jacinta"),
    items.filter((item) => item.id !== id)
  );

  return NextResponse.json({
    ok: true
  });
}
