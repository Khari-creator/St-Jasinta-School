"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import type { SchoolProfile } from "@/data/schools";

type SiteHeaderProps = {
  school: SchoolProfile;
};

export default function SiteHeader({ school }: SiteHeaderProps) {
  const [topBarCollapsed, setTopBarCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setTopBarCollapsed(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <TopBar school={school} collapsed={topBarCollapsed} />
      <Navbar school={school} compact={topBarCollapsed} />
    </div>
  );
}
