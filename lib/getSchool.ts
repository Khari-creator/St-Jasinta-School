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

function normalizeSchoolIdCandidate(value: string | null | undefined): SchoolId | null {
  const normalized = (value ?? "").trim().toLowerCase();

  if (normalized === "st-jacinta" || normalized === "stjacinta") {
    return "st-jacinta";
  }

  if (normalized === "king-david" || normalized === "kingdavid") {
    return "king-david";
  }

  return null;
}

function resolveSchoolIdFromHint(host: string): SchoolId | null {
  const normalizedHost = normalizeHost(host);

  if (
    normalizedHost.includes("king-david") ||
    normalizedHost.includes("kingdavid")
  ) {
    return "king-david";
  }

  if (
    normalizedHost.includes("st-jacinta") ||
    normalizedHost.includes("stjacinta") ||
    normalizedHost.includes("st-jasinta") ||
    normalizedHost.includes("jasinta")
  ) {
    return "st-jacinta";
  }

  return null;
}

function resolveConfiguredDefaultSchoolId(): SchoolId {
  return (
    normalizeSchoolIdCandidate(process.env.DEFAULT_SCHOOL_ID) ??
    normalizeSchoolIdCandidate(process.env.NEXT_PUBLIC_DEFAULT_SCHOOL_ID) ??
    resolveSchoolIdFromHint(process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "") ??
    resolveSchoolIdFromHint(process.env.VERCEL_URL ?? "") ??
    defaultSchoolId
  );
}

export function resolveSchoolIdFromHost(host: string): SchoolId {
  const normalizedHost = normalizeHost(host);

  if (normalizedHost in schoolHostMap) {
    return schoolHostMap[normalizedHost as keyof typeof schoolHostMap];
  }

  const hintedSchoolId = resolveSchoolIdFromHint(normalizedHost);

  if (hintedSchoolId) {
    return hintedSchoolId;
  }

  if (normalizedHost.endsWith(":3001")) {
    return "king-david";
  }

  if (
    normalizedHost.startsWith("localhost") ||
    normalizedHost.startsWith("127.0.0.1")
  ) {
    return resolveConfiguredDefaultSchoolId();
  }

  return resolveConfiguredDefaultSchoolId();
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
