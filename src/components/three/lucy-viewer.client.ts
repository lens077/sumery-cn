"use client";

import dynamic from "next/dynamic";

const LucyViewer = dynamic(
  () => import("@/components/three/lucy-viewer").then((m) => m.LucyViewer),
  { ssr: false },
);

export { LucyViewer };
