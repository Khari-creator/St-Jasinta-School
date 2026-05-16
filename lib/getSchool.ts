import { headers } from "next/headers";

import {
  defaultSchoolId,
  schoolHostMap,
  schools,
  type SchoolId,
  type SchoolProfile
} from "@/data/schools";

export type SchoolContext = {
  school: SchoolProfile;
  host: string;
  origin: string;
};

export function normalizeHost(rawHost: string | null | undefined) {
  return (rawHost ?? "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
}

export function resolveSchoolIdFromHost(host: string): SchoolId {
  const normalizedHost = normalizeHost(host);

  if (normalizedHost in schoolHostMap) {
    return schoolHostMap[normalizedHost as keyof typeof schoolHostMap];
  }

  if (normalizedHost.endsWith(":3001")) {
    return "king-david";
  }

  if (
    normalizedHost.startsWith("localhost") ||
    normalizedHost.startsWith("127.0.0.1")
  ) {
    return defaultSchoolId;
  }

  return defaultSchoolId;
}

export async function getSchoolContext(): Promise<SchoolContext> {
  const requestHeaders = await headers();
  const rawHost =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "127.0.0.1:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (rawHost.includes("localhost") || rawHost.includes("127.0.0.1") ? "http" : "https");

  const host = normalizeHost(rawHost) || "127.0.0.1:3000";
  const school = schools[resolveSchoolIdFromHost(host)];

  return {
    school,
    host,
    origin: `${protocol}://${host}`
  };
}

export async function getSchool() {
  const { school } = await getSchoolContext();
  return school;
}

export function getSchoolById(id: SchoolId) {
  return schools[id];
}

