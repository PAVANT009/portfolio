import { ImageResponse } from "next/og";

export const alt = "Pavan Teja Kumar - Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
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
          background: "linear-gradient(135deg, #0b0b0f 0%, #1b1f2a 60%, #0e4d92 100%)",
          color: "#ffffff",
          textAlign: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Pavan Teja Kumar
        </div>
        <div
          style={{
            fontSize: 28,
            opacity: 0.9,
          }}
        >
          Full Stack Developer Portfolio
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
