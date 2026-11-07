import { ImageResponse } from "next/og";

// iPhone のホーム画面などに使うアイコン（icon.svg と同じインコの図形）
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

const navy = "#10264a";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: navy,
      }}
    >
      <svg width="180" height="180" viewBox="0 0 64 64">
        <g transform="translate(-2.5 -3)">
          <path d="M30 44 L17 58 L22 59.5 L36 47 Z" fill="#ffffff" />
          <path
            d="M29 24 C23 32 24 43 32 47.5 C39 50 45 43 45 35 C45 29 43 25 39 23 Z"
            fill="#ffffff"
          />
          <circle cx="36" cy="20" r="9.5" fill="#ffffff" />
          <path
            d="M44.5 15.5 C50 15.5 52.5 20.5 50 26.5 C48.8 24.2 46.8 23.3 44 24 Z"
            fill="#ffffff"
            stroke={navy}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="38.5" cy="18.5" r="2" fill={navy} />
          <path
            d="M33 30 C30.5 36 31.5 41.5 36.5 45"
            fill="none"
            stroke={navy}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>,
    size,
  );
}
