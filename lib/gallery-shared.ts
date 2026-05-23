import type { GalleryItem, SchoolId } from "@/data/schools";

export type GalleryCategory = GalleryItem["category"];

export type GalleryItemRecord = GalleryItem & {
  id: string;
  schoolId: SchoolId;
  imagePath: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GalleryItemRow = {
  id: string;
  school_id: SchoolId;
  title: string | null;
  alt_text: string;
  category: GalleryCategory;
  image_url: string;
  image_path: string | null;
  is_featured: boolean | null;
  featured_order: number | null;
  sort_order: number | null;
  created_at: string;
  updated_at: string;
};

export const GALLERY_ITEM_SELECT = `
  id,
  school_id,
  title,
  alt_text,
  category,
  image_url,
  image_path,
  is_featured,
  featured_order,
  sort_order,
  created_at,
  updated_at
`;

export const galleryCategoryOptions: GalleryCategory[] = [
  "Learning",
  "School Life",
  "Events",
  "Facilities",
  "Trips",
  "Graduation"
];

export function mapGalleryItemRow(row: GalleryItemRow): GalleryItemRecord {
  return {
    id: row.id,
    schoolId: row.school_id,
    src: row.image_url,
    alt: row.alt_text,
    category: row.category,
    title: row.title ?? undefined,
    isFeatured: Boolean(row.is_featured),
    featuredOrder: row.featured_order ?? undefined,
    sortOrder: row.sort_order ?? undefined,
    imagePath: row.image_path,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
