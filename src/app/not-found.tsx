import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-(--container-page) flex-col items-start px-6 py-32">
      <h1 className="text-3xl font-bold text-white">页面不存在</h1>
      <p className="mt-4 text-ink-500">你要找的页面不在这里。</p>
      <Link className="cta-primary mt-8" href="/">
        回到首页
      </Link>
    </div>
  );
}
