import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "unbg - Free AI Background Remover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #eef2ff 0%, #ffffff 50%, #f5f3ff 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#0f172a" }}>un</span>
          <span style={{ color: "#4f46e5" }}>bg</span>
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            fontWeight: 700,
            color: "#1e293b",
          }}
        >
          Remove Image Background
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 32,
            fontWeight: 700,
            color: "#4f46e5",
          }}
        >
          Instantly & for Free
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 18,
            color: "#64748b",
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          100% browser-based AI. No upload. No sign-up. No watermark.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 16,
            color: "#94a3b8",
            fontWeight: 500,
          }}
        >
          unbg.tech
        </div>
      </div>
    ),
    { ...size },
  );
}
