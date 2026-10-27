"use client";

export default function ErrorPage() {
  return (
    <div className="mx-auto flex max-w-(--container-page) flex-col items-start px-6 py-32">
      <h1 className="text-3xl font-bold text-white">出了点问题</h1>
      <p className="mt-4 text-ink-500">页面渲染出错，请稍后重试。</p>
    </div>
  );
}
