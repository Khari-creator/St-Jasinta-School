import { NextRequest, NextResponse } from "next/server";

import { hasBlobContentStoreConfig, hasBlobImageStoreConfig } from "@/lib/blob-content";
import {
  ADMIN_SESSION_COOKIE_NAME,
  hasCustomAdminConfig,
  verifyAdminSessionToken
} from "@/lib/custom-admin";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const ready = hasCustomAdminConfig() && hasBlobContentStoreConfig() && hasBlobImageStoreConfig();

  if (!ready) {
    return NextResponse.json({
      authenticated: false,
      ready: false,
      username: null
    });
  }

  const session = verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value);

  return NextResponse.json({
    authenticated: Boolean(session),
    ready,
    username: session?.username ?? null
  });
}
