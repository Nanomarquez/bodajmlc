import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { wedding } from "@/lib/config";
import { getWeddingDateParts } from "@/lib/format";

export const alt = wedding.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [regular, italic] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/CormorantGaramond-Italic.ttf")),
  ]);
  const date = getWeddingDateParts();
  const [first, second] = wedding.couples;

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
          backgroundColor: "#F7F4EE",
          color: "#2C3B32",
          fontFamily: "Cormorant",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 28,
            right: 28,
            bottom: 28,
            left: 28,
            border: "1px solid rgba(62, 81, 68, 0.35)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            letterSpacing: "0.42em",
            fontSize: 18,
            color: "#7E9478",
            marginBottom: 36,
          }}
        >
          NOS CASAMOS
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 420 }}>
            <div style={{ display: "flex", fontSize: 48, fontStyle: "italic" }}>{first.a}</div>
            <div style={{ display: "flex", fontSize: 28, color: "#7E9478", margin: "8px 0" }}>&</div>
            <div style={{ display: "flex", fontSize: 48, fontStyle: "italic" }}>{first.b}</div>
          </div>
          <div style={{ width: 1, height: 150, backgroundColor: "rgba(126, 148, 120, 0.7)", display: "flex" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 420 }}>
            <div style={{ display: "flex", fontSize: 48, fontStyle: "italic" }}>{second.a}</div>
            <div style={{ display: "flex", fontSize: 28, color: "#7E9478", margin: "8px 0" }}>&</div>
            <div style={{ display: "flex", fontSize: 48, fontStyle: "italic" }}>{second.b}</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 26,
            fontStyle: "italic",
            color: "#5E5A54",
          }}
        >
          {wedding.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            letterSpacing: "0.28em",
            fontSize: 16,
            color: "#7E9478",
            textTransform: "uppercase",
          }}
        >
          {date.long}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: regular, weight: 400 as const, style: "normal" as const },
        { name: "Cormorant", data: italic, weight: 400 as const, style: "italic" as const },
      ],
    },
  );
}
