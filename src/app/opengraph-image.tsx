import { ImageResponse } from "next/og";

import { business } from "@/content/site";

// LINE などで共有したときに表示する画像（ビルド時に PNG として出力される）
export const alt = business.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 96px",
        backgroundColor: "#10264a",
        color: "#ffffff",
      }}
    >
      <div
        style={{
          width: 96,
          height: 6,
          backgroundColor: "#e6ebf3",
          marginBottom: 40,
        }}
      />
      <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: 2 }}>
        {business.name}
      </div>
      <div style={{ marginTop: 28, fontSize: 36, color: "#e6ebf3" }}>
        Business System Development
      </div>
      <div style={{ marginTop: 64, fontSize: 28, color: "#b9c4d8" }}>
        parakeets-works.jp
      </div>
    </div>,
    size,
  );
}
