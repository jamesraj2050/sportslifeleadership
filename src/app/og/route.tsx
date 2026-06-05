import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg,#111,#1d1d1d)",
          color: "white",
          padding: 80
        }}
      >
        <div style={{ color: "#F5C242", fontSize: 28, letterSpacing: 8, textTransform: "uppercase" }}>{site.name}</div>
        <div style={{ marginTop: 30, fontSize: 92, fontWeight: 900, lineHeight: 0.92, letterSpacing: -5 }}>
          Build Sports Communities for Kingdom Impact
        </div>
        <div style={{ marginTop: 36, maxWidth: 760, fontSize: 30, color: "rgba(255,255,255,.72)" }}>{site.mission}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
