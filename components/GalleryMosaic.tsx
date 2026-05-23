"use client";

import Image from "next/image";
import { Star } from "lucide-react";
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

  if (softVariant) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {galleryItems.map((item, index) => (
          <motion.article
            key={`${item.src}-${item.category}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.55, delay: index * 0.04 }}
            className="group overflow-hidden rounded-[1.85rem] border border-slate-200 bg-white shadow-[0_28px_64px_-42px_rgba(15,23,42,0.22)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
                <div className="flex flex-wrap items-start gap-2">
                  <span className="inline-flex rounded-full border border-white/18 bg-[rgba(255,255,255,0.16)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-white backdrop-blur-sm">
                    {item.category}
                  </span>
                  {item.isFeatured ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/40 bg-[rgba(245,158,11,0.18)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                      <Star className="h-3.5 w-3.5" />
                      Featured
                    </span>
                  ) : null}
                </div>
                <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-white/18 bg-[rgba(8,15,26,0.32)] px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,26,0.02)_0%,rgba(8,15,26,0.02)_52%,rgba(8,15,26,0.54)_100%)]" />
            </div>

            <div className="bg-[linear-gradient(135deg,white_0%,var(--school-surface)_100%)] p-5 sm:p-6">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">St. Jacinta Collection</p>
              <p className="mt-3 text-lg font-semibold leading-8 tracking-tight text-slate-950">{item.alt}</p>
            </div>
          </motion.article>
        ))}
      </div>
    );
  }

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
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex rounded-full border border-white/12 bg-white/12 px-3 py-1 text-xs uppercase tracking-[0.28em] backdrop-blur">
                {item.category}
              </span>
              {item.isFeatured ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/40 bg-amber-400/20 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white backdrop-blur">
                  <Star className="h-3.5 w-3.5" />
                  Featured
                </span>
              ) : null}
            </div>
            <p className="mt-3 max-w-sm text-base font-medium leading-7">{item.alt}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
