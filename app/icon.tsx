import { ImageResponse } from "next/og";

import { getSchoolContext } from "@/lib/getSchool";

export const size = {
  width: 64,
  height: 64
};

export const contentType = "image/png";

export default async function Icon() {
  const { school } = await getSchoolContext();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "18px",
          background: `linear-gradient(135deg, ${school.theme.primary}, ${school.theme.secondary})`,
          color: "#ffffff",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.18em"
        }}
      >
        {school.initials}
      </div>
    ),
    size
  );
}
