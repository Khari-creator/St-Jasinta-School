import type { CSSProperties, ReactNode } from "react";
import type { Metadata, Viewport } from "next";

import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import SiteHeader from "@/components/SiteHeader";
import { getSchoolContext } from "@/lib/getSchool";
import { buildMetadata } from "@/lib/utils";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { school, origin } = await getSchoolContext();
  return buildMetadata({ school, origin });
}

export async function generateViewport(): Promise<Viewport> {
  const { school } = await getSchoolContext();

  return {
    width: "device-width",
    initialScale: 1,
    themeColor: school.theme.primary
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const { school } = await getSchoolContext();

  const themeVars = {
    "--school-primary": school.theme.primary,
    "--school-secondary": school.theme.secondary,
    "--school-accent": school.theme.accent,
    "--school-surface": school.theme.surface,
    "--school-tint": school.theme.tint,
    "--school-text": school.theme.text,
    "--school-panel": school.theme.panel
  } as CSSProperties;

  return (
    <html lang="en">
      <body className={school.id === "st-jacinta" ? "theme-st-jacinta" : "theme-king-david"} style={themeVars}>
        <SiteHeader school={school} />
        <main className="pt-[7.25rem] md:pt-[8rem]">{children}</main>
        <FloatingWhatsAppButton school={school} />
        <Footer school={school} />
      </body>
    </html>
  );
}
