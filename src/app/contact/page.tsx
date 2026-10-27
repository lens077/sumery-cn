import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联系",
  description: "联系 Sumery 希曼。",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-(--container-page) px-6 py-24">
      <h1 className="text-3xl font-bold text-white">联系</h1>
      <p className="mt-6 max-w-xl leading-7 text-ink-500">
        产品反馈、合作与建议，欢迎通过 GitHub Issue
        或博客评论区联系；渠道入口补充后会在本页更新。
      </p>
      <a
        className="cta-secondary mt-8"
        href="https://github.com/lens077"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub ↗
      </a>
    </div>
  );
}
