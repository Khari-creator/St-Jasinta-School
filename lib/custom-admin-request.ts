import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE_NAME,
  verifyAdminSessionToken
} from "@/lib/custom-admin";

export function requireAdminSession(request: NextRequest) {
  const session = verifyAdminSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value);

  if (!session) {
    return {
      session: null,
      response: NextResponse.json(
        {
          error: "Unauthorized."
        },
        { status: 401 }
      )
    };
  }

  return {
    session,
    response: null
  };
}
