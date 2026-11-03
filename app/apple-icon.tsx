import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F7F4EE",
        }}
      >
        <svg width="92" height="112" viewBox="0 0 80 120" fill="none">
          <path
            d="M40 108C24 88 12 74 12 54 12 34 24 18 40 14c16 4 28 20 28 40 0 20-12 34-28 54Z"
            stroke="#3E5144"
            strokeWidth="2"
          />
          <path d="M40 98c1-22 8-38 20-52" stroke="#3E5144" strokeWidth="1.5" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
