"use client";

import Image from "next/image";
import { BusFront, Clock3, MapPinned } from "lucide-react";
import { useState } from "react";

import type { SchoolProfile } from "@/data/schools";
import { cn } from "@/lib/utils";

type TransportVisualProps = {
  school: Pick<SchoolProfile, "id" | "shortName" | "transport">;
};

const fallbackIcons = [Clock3, BusFront, MapPinned];

export default function TransportVisual({ school }: TransportVisualProps) {
  const [hasError, setHasError] = useState(false);
  const softVariant = school.id === "st-jacinta";

  if (!hasError) {
    return (
      <Image
        src={school.transport.image}
        alt={school.transport.imageAlt}
        fill
        sizes="(max-width: 1279px) 100vw, 52vw"
        className="object-cover"
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        softVariant
          ? "bg-[radial-gradient(circle_at_14%_20%,rgba(255,255,255,0.16),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.12),transparent_26%),linear-gradient(135deg,#154c79_0%,#1f5f8f_46%,#0f2234_100%)]"
          : "bg-[radial-gradient(circle_at_14%_20%,rgba(255,255,255,0.16),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.12),transparent_26%),linear-gradient(135deg,#0f3e67_0%,#154e84_46%,#081521_100%)]"
      )}
    >
      <div className="absolute left-8 top-8 h-28 w-28 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-10 top-14 h-36 w-36 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute left-[12%] right-[12%] top-[44%] hidden border-t border-dashed border-white/30 sm:block" />

      <div className="relative flex h-full flex-col justify-between p-6 text-white sm:p-8">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/16 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] backdrop-blur-sm">
          <BusFront className="h-4 w-4" />
          School Transport
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {school.transport.highlights.map((item, index) => {
            const Icon = fallbackIcons[index % fallbackIcons.length];

            return (
              <article
                key={item.label}
                className="rounded-[1.3rem] border border-white/14 bg-[rgba(255,255,255,0.12)] p-4 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/14 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.26em] text-white/72">{item.label}</p>
                <p className="mt-2 text-base font-semibold leading-7 text-white">{item.value}</p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
