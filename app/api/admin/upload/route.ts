import { NextRequest, NextResponse } from "next/server";

import { uploadPublicImage } from "@/lib/blob-content";
import { requireAdminSession } from "@/lib/custom-admin-request";
import { createSlug } from "@/lib/utils";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const { response } = requireAdminSession(request);

  if (response) {
    return response;
  }

  const kind = request.nextUrl.searchParams.get("kind");
  const formData = await request.formData();
  const file = formData.get("file");
  const title = String(formData.get("title") ?? "").trim();

  if (!(file instanceof File)) {
    return NextResponse.json(
      {
        error: "No file was provided."
      },
      { status: 400 }
    );
  }

  if (kind !== "blog" && kind !== "gallery") {
    return NextResponse.json(
      {
        error: "Upload kind is invalid."
      },
      { status: 400 }
    );
  }

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const fileName = createSlug(title || file.name.replace(/\.[^.]+$/, "") || `${kind}-image`);
  const pathname = `st-jacinta/${kind}-images/${Date.now()}-${fileName}.${extension}`;
  const uploadedBlob = await uploadPublicImage(pathname, file);

  return NextResponse.json({
    url: uploadedBlob.url,
    pathname: uploadedBlob.pathname
  });
}
