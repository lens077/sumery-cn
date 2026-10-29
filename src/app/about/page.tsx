import { withBase } from "@/lib/urls";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 Sumery",
  description:
    "Sumery 是独立开发者希曼的个人 IP 与产品工作室，专注于效率工具、开发者工具与独立产品。",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-(--container-page) px-6 py-24">
      <p className="section-eyebrow">ABOUT</p>
      <h1 className="mt-1 text-3xl font-bold text-white">
        Sumery · 希曼的工作室
      </h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBase("/images/brand/lucy-chibi.png")}
        alt="希曼 IP 形象 Lucy 的 Q 版立绘"
        width={160}
        height={160}
        className="mt-6 h-40 w-40 rounded-2xl border border-line"
      />
      <div className="mt-8 max-w-2xl space-y-5 leading-7 text-ink-500">
        <p>
          Sumery 是独立开发者 <strong className="text-white">希曼</strong>{" "}
          的工作室品牌，专注于效率工具、开发者工具与独立产品——用代码创造价值，用产品解决真实问题。
        </p>
        <p>
          产品线以星座命名的桌面工具为主：Lyra（密码管理）、Scorpius（剪贴板）、Virgo（任务对账）、Pyxis（项目规划）、Libra（健康观测）。另有一条游戏内容子线（Lepus、Corvus）。
        </p>
        <p>
          工程实践覆盖 Go 微服务、事件驱动架构、Kubernetes 与 GitOps
          交付；这些经验同样沉淀在{" "}
          <a
            className="text-sky-accent hover:underline"
            href="https://blog.apikv.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            blog.apikv.com
          </a>{" "}
          的技术写作里。
        </p>
      </div>
    </div>
  );
}
