import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "unbg - Free AI Background Remover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
        {/* Logo */}
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

        {/* Tagline */}
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            fontWeight: 700,
            color: "#1e293b",
            textAlign: "center",
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

        {/* Subtitle */}
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

        {/* Pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 36,
          }}
        >
          {["Free Forever", "Full Resolution", "Private & Secure"].map(
            (label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "#e0e7ff",
                  borderRadius: 9999,
                  padding: "8px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#4338ca",
                }}
              >
                {label}
              </div>
            ),
          )}
        </div>

        {/* URL */}
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
