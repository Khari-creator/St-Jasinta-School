import { ImageResponse } from "next/og";

import { getSchoolContext } from "@/lib/getSchool";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const { school } = await getSchoolContext();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            `linear-gradient(135deg, #10233a 0%, ${school.theme.primary} 58%, #173455 100%)`,
          color: "#ffffff",
          padding: "72px"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 14% 18%, rgba(255,255,255,0.16), transparent 26%), radial-gradient(circle at 84% 20%, rgba(255,255,255,0.14), transparent 22%)"
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255,255,255,0.16)",
            borderRadius: 36,
            padding: "42px",
            background: "rgba(255,255,255,0.08)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                width: 78,
                height: 78,
                borderRadius: 22,
                background: "rgba(255,255,255,0.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "0.18em"
              }}
            >
              {school.initials}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  fontSize: 22,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  opacity: 0.82
                }}
              >
                School Website
              </div>
              <div style={{ fontSize: 30, fontWeight: 700 }}>{school.shortName}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 860 }}>
            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.12)",
                padding: "10px 18px",
                fontSize: 18,
                letterSpacing: "0.22em",
                textTransform: "uppercase"
              }}
            >
              {school.motto}
            </div>
            <div style={{ fontSize: 58, lineHeight: 1.02, fontWeight: 700 }}>{school.name}</div>
            <div style={{ fontSize: 24, lineHeight: 1.5, opacity: 0.86 }}>{school.tagline}</div>
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[`Founded ${school.founded}`, school.location, school.curriculum[0]].map((item) => (
              <div
                key={item}
                style={{
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.1)",
                  padding: "12px 18px",
                  fontSize: 18
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
