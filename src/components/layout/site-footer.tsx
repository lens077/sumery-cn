import Link from "next/link";
import { NAV_LINKS } from "@/content/navigation";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/lens077" },
  { label: "博客", href: "https://blog.apikv.com" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-navy-900">
      <div className="mx-auto grid max-w-(--container-page) gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold text-white">
            Sumery<span className="text-glow">·</span>希曼
          </p>
          <p className="mt-3 text-sm leading-6 text-ink-500">
            独立开发者 · 产品工作室。专注于效率工具、开发者工具与独立产品，用代码创造价值，用产品解决真实问题。
          </p>
        </div>
        <nav aria-label="快速导航">
          <h2 className="text-sm font-semibold text-white">快速导航</h2>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-500 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold text-white">社交账号</h2>
          <ul className="mt-3 space-y-2">
            {SOCIALS.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  className="text-sm text-ink-500 transition-colors hover:text-white"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">联系</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-500">
            <li>
              <Link href="/contact/" className="transition-colors hover:text-white">
                联系页面
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line/60 py-6 text-center text-xs text-ink-500">
        © {new Date().getFullYear()} Sumery · 希曼 · Small Tools, Big Changes
      </div>
    </footer>
  );
}
