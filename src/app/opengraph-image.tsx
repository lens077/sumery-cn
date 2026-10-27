import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Sumery 希曼 — Small Tools, Big Changes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OgImage() {
  const chibi = await readFile(
    path.join(process.cwd(), "public/images/brand/lucy-chibi.png"),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background:
          "linear-gradient(135deg, #0a1128 0%, #1a2d5c 60%, #6f5a8e 100%)",
        padding: "80px 100px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 72, fontWeight: 700, color: "#f2f5fb" }}>
          Sumery
        </div>
        <div style={{ fontSize: 40, color: "#f4b57a" }}>
          Small Tools, Big Changes
        </div>
        <div style={{ fontSize: 28, color: "#a8b8d8" }}>sumery.cn</div>
      </div>
      <img
        src={`data:image/png;base64,${chibi.toString("base64")}`}
        width={420}
        height={420}
        alt=""
      />
    </div>,
    size,
  );
}
