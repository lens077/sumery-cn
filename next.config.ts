import type { NextConfig } from "next";

// NEXT_BASE_PATH 用于镜像托管（如 looke.cloud/sumery/），官方域名构建时不设
const basePath = process.env.NEXT_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basePath ? { basePath, env: { NEXT_PUBLIC_BASE_PATH: basePath } } : {}),
};

export default nextConfig;
