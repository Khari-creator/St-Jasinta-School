import type { GalleryItem, SchoolId } from "@/data/schools";
import { getGalleryIndexPath, readPrivateJson } from "@/lib/blob-content";
import { isCustomAdminEnabledForSchool } from "@/lib/custom-admin";
import type { GalleryItemRecord } from "@/lib/gallery-shared";

function sortGalleryItems(items: GalleryItem[]) {
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

    return 0;
  });
}

export async function getGalleryItemsForSchool(
  schoolId: SchoolId,
  fallbackItems: GalleryItem[]
): Promise<GalleryItem[]> {
  if (!isCustomAdminEnabledForSchool(schoolId)) {
    return fallbackItems;
  }

  const storedItems = await readPrivateJson<GalleryItemRecord[]>(getGalleryIndexPath(schoolId), []);

  if (storedItems.length === 0) {
    return fallbackItems;
  }

  return sortGalleryItems(storedItems);
}
