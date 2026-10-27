import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectDirectory } from "@/components/projects/directory-browser";

export const metadata: Metadata = {
  title: "全部项目",
  description:
    "Sumery 的产品、平台工程、部署运维、技术实践与游戏实验完整目录，支持分类筛选与关键词搜索。",
  alternates: { canonical: "/projects/" },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-(--container-page) px-6 py-24">
      <p className="section-eyebrow">PORTFOLIO / PROJECT INDEX</p>
      <h1 className="mt-1 text-3xl font-bold text-white">全部项目</h1>
      <p className="mt-4 max-w-2xl leading-7 text-ink-500">
        按用途浏览 Sumery
        的产品、平台工程、部署运维、技术实践与游戏实验。完整目录不代表每个项目都处于活跃维护或生产就绪状态；项目状态以仓库证据为准。
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-sm text-ink-500">载入中…</p>}>
          <ProjectDirectory />
        </Suspense>
      </div>
    </div>
  );
}
