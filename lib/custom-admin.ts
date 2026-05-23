import { createHmac, timingSafeEqual } from "node:crypto";

import type { SchoolId } from "@/data/schools";

export const CUSTOM_ADMIN_SCHOOL_ID = "st-jacinta" as const;
export const ADMIN_SESSION_COOKIE_NAME = "st-jacinta-admin-session";
const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const ADMIN_USERNAME = process.env.ST_JACINTA_ADMIN_USERNAME?.trim() ?? "";
const ADMIN_PASSWORD = process.env.ST_JACINTA_ADMIN_PASSWORD?.trim() ?? "";
const ADMIN_SESSION_SECRET = process.env.ST_JACINTA_ADMIN_SESSION_SECRET?.trim() ?? "";

type AdminSessionPayload = {
  schoolId: typeof CUSTOM_ADMIN_SCHOOL_ID;
  username: string;
  expiresAt: number;
};

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return createHmac("sha256", ADMIN_SESSION_SECRET).update(value).digest("base64url");
}

export function isCustomAdminEnabledForSchool(schoolId: SchoolId) {
  return schoolId === CUSTOM_ADMIN_SCHOOL_ID;
}

export function hasCustomAdminConfig() {
  return Boolean(ADMIN_USERNAME && ADMIN_PASSWORD && ADMIN_SESSION_SECRET);
}

export function validateCustomAdminCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createAdminSessionToken() {
  const payload: AdminSessionPayload = {
    schoolId: CUSTOM_ADMIN_SCHOOL_ID,
    username: ADMIN_USERNAME,
    expiresAt: Date.now() + ADMIN_SESSION_MAX_AGE * 1000
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined | null): AdminSessionPayload | null {
  if (!token || !ADMIN_SESSION_SECRET) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as AdminSessionPayload;

    if (
      payload.schoolId !== CUSTOM_ADMIN_SCHOOL_ID ||
      payload.username !== ADMIN_USERNAME ||
      payload.expiresAt <= Date.now()
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function getAdminSessionMaxAge() {
  return ADMIN_SESSION_MAX_AGE;
}

export function getCustomAdminUsername() {
  return ADMIN_USERNAME;
}
