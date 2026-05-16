"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

import SchoolLogo from "@/components/SchoolLogo";
import { navigationLinks, type SchoolProfile } from "@/data/schools";
import { cn } from "@/lib/utils";
import { getAcademicMenuItems } from "@/data/academics";

type NavbarProps = {
  school: SchoolProfile;
  compact?: boolean;
};

export default function Navbar({ school, compact = false }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isAcademicsRoute = pathname === "/academics" || pathname.startsWith("/academics/");
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(isAcademicsRoute);
  const academicMenuItems = getAcademicMenuItems(school.id);

  return (
    <header
      className={cn(
        "pointer-events-auto border-b border-slate-200 bg-white transition-all duration-300 ease-out",
        compact
          ? "shadow-[0_14px_34px_rgba(15,23,42,0.1)]"
          : "shadow-[0_10px_28px_rgba(15,23,42,0.08)]"
      )}
    >
      <div className={cn("shell transition-all duration-300 ease-out", compact ? "py-2.5" : "py-3.5")}>
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="flex min-w-0 items-center gap-3.5 xl:min-w-[20rem]">
            <SchoolLogo
              school={school}
              priority
              className={cn(
                "shrink-0 border-slate-200 bg-white shadow-none transition-all duration-300 ease-out",
                compact ? "h-11 w-11" : "h-12 w-12"
              )}
            />
            <div className="min-w-0">
              <p className="truncate text-[10px] uppercase tracking-[0.34em] text-slate-500">
                {school.id === "st-jacinta" ? "Junior Christian School" : "Senior and Junior School"}
              </p>
              <p
                className={cn(
                  "truncate font-display font-semibold leading-none text-slate-950 transition-all duration-300 ease-out",
                  compact ? "text-[1.8rem] sm:text-[2rem]" : "text-[1.95rem] sm:text-[2.15rem]"
                )}
              >
                {school.shortName}
              </p>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-5 2xl:gap-7 xl:flex">
            {navigationLinks.map((link) => {
              const isActive =
                link.href === "/academics" ? isAcademicsRoute : pathname === link.href;

              if (link.href === "/academics") {
                return (
                  <div key={link.href} className="group relative">
                    <Link
                      href={link.href}
                      className={cn(
                        "inline-flex items-center gap-2 border-b-2 px-0.5 pb-2 pt-2 text-[0.88rem] font-semibold uppercase tracking-[0.16em] transition-colors 2xl:text-[0.92rem]",
                        isActive
                          ? "border-[var(--school-secondary)] text-[var(--school-primary)]"
                          : "border-transparent text-slate-700 hover:border-slate-300 hover:text-[var(--school-primary)]"
                      )}
                    >
                      {link.label}
                      <ChevronDown className="h-4 w-4" />
                    </Link>

                    <div className="invisible absolute left-1/2 top-full z-30 w-[22rem] -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-[0_20px_50px_-30px_rgba(15,23,42,0.28)]">
                        <div className="border-b border-slate-200 px-5 py-4">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                            Academic Levels
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            Explore the learning pathways within the school.
                          </p>
                        </div>
                        <div className="p-2">
                          {academicMenuItems.map((item) => (
                            <Link
                              key={item.id}
                              href={item.href}
                              className={cn(
                                "block rounded-[1rem] px-4 py-3",
                                pathname === item.href ? "bg-[var(--school-tint)]" : "hover:bg-slate-50"
                              )}
                            >
                              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--school-primary)]">
                                {item.label}
                              </p>
                              <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "border-b-2 px-0.5 pb-2 pt-2 text-[0.88rem] font-semibold uppercase tracking-[0.16em] transition-colors 2xl:text-[0.92rem]",
                    isActive
                      ? "border-[var(--school-secondary)] text-[var(--school-primary)]"
                      : "border-transparent text-slate-700 hover:border-slate-300 hover:text-[var(--school-primary)]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center xl:flex">
            <Link
              href="/admissions"
              className="rounded-full bg-[var(--school-secondary)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(122,31,51,0.18)] transition-transform hover:-translate-y-0.5"
            >
              Apply Now
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm xl:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden xl:hidden"
            >
              <div className="mt-4 space-y-2 rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-[0_18px_38px_rgba(15,23,42,0.08)]">
                {navigationLinks.map((link) => {
                  const isActive =
                    link.href === "/academics" ? isAcademicsRoute : pathname === link.href;

                  if (link.href === "/academics") {
                    return (
                      <div key={link.href} className="rounded-[1.15rem] border border-slate-200 bg-slate-50 px-3 py-3">
                        <button
                          type="button"
                          className={cn(
                            "flex w-full items-center justify-between rounded-xl px-2 py-2 text-sm font-medium uppercase tracking-[0.18em]",
                            isActive ? "text-[var(--school-primary)]" : "text-slate-700"
                          )}
                          onClick={() => setIsAcademicsOpen((open) => !open)}
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              isAcademicsOpen && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isAcademicsOpen ? (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 space-y-2 px-2 pb-1">
                                <Link
                                  href="/academics"
                                  className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-700"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span>Academics Overview</span>
                                  <ArrowUpRight className="h-4 w-4" />
                                </Link>
                                {academicMenuItems.map((item) => (
                                  <Link
                                    key={item.id}
                                    href={item.href}
                                    className={cn(
                                      "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-[0.16em]",
                                      pathname === item.href
                                        ? "bg-[var(--school-tint)] text-[var(--school-primary)]"
                                        : "bg-white text-slate-700"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span>{item.label}</span>
                                    <ArrowUpRight className="h-4 w-4" />
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-[0.18em]",
                        isActive
                          ? "bg-[var(--school-tint)] text-[var(--school-primary)]"
                          : "bg-slate-50 text-slate-700"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
