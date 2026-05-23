import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE_NAME,
  createAdminSessionToken,
  getAdminSessionMaxAge,
  hasCustomAdminConfig,
  validateCustomAdminCredentials
} from "@/lib/custom-admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!hasCustomAdminConfig()) {
    return NextResponse.json(
      {
        error: "Custom admin credentials are not configured."
      },
      { status: 500 }
    );
  }

  const body = (await request.json()) as {
    username?: string;
    password?: string;
  };

  const username = body.username?.trim() ?? "";
  const password = body.password ?? "";

  if (!validateCustomAdminCredentials(username, password)) {
    return NextResponse.json(
      {
        error: "Invalid login details."
      },
      { status: 401 }
    );
  }

  const response = NextResponse.json({
    ok: true
  });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE_NAME,
    value: createAdminSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getAdminSessionMaxAge()
  });

  return response;
}
