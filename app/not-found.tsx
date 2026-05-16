import Link from "next/link";

import { getSchool } from "@/lib/getSchool";

export default async function NotFound() {
  const school = await getSchool();
  const softVariant = school.id === "st-jacinta";

  return (
    <section className="shell section-space">
      <div
        className={
          softVariant
            ? "rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-panel sm:p-12"
            : "rounded-[2rem] border border-slate-200 bg-white p-8 shadow-panel sm:p-12"
        }
      >
        <span
          className="inline-flex rounded-full bg-[var(--school-tint)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--school-primary)]"
        >
          Page Not Found
        </span>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          The page you are looking for is not available.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          Return to the main school site to continue exploring admissions,
          academics, and school information.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-full bg-[var(--school-secondary)] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
