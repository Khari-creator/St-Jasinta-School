"use client";

import { motion } from "framer-motion";

import type { GalleryItem, SchoolProfile } from "@/data/schools";
import { cn } from "@/lib/utils";

type GalleryMosaicProps = {
  school: SchoolProfile;
  items: GalleryItem[];
  limit?: number;
};

export default function GalleryMosaic({
  school,
  items,
  limit
}: GalleryMosaicProps) {
  const softVariant = school.id === "st-jacinta";
  const galleryItems = typeof limit === "number" ? items.slice(0, limit) : items;

  return (
    <div className="grid auto-rows-[220px] gap-4 md:grid-cols-2 xl:grid-cols-4">
      {galleryItems.map((item, index) => (
        <motion.article
          key={`${item.src}-${item.category}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className={cn(
            "group relative overflow-hidden border",
            index === 0 || index === 3 ? "xl:row-span-2" : "",
            softVariant
              ? "rounded-[1.75rem] border-slate-200"
              : "rounded-[1.35rem] border-slate-200"
          )}
          style={{
            backgroundImage: softVariant
              ? `linear-gradient(180deg, rgba(30,95,88,0.08), rgba(30,95,88,0.8)), url(${item.src})`
              : `linear-gradient(180deg, rgba(22,33,62,0.14), rgba(22,33,62,0.88)), url(${item.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <span className="inline-flex rounded-full border border-white/12 bg-white/12 px-3 py-1 text-xs uppercase tracking-[0.28em] backdrop-blur">
              {item.category}
            </span>
            <p className="mt-3 max-w-sm text-base font-medium leading-7">{item.alt}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
