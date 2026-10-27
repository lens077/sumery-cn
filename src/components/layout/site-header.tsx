import Link from "next/link";
import { NAV_LINKS } from "@/content/navigation";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <nav
        aria-label="主导航"
        className="mx-auto mt-4 flex max-w-(--container-page) items-center justify-between rounded-full border border-line bg-navy-900/60 px-6 py-3 backdrop-blur-md sm:mx-6 lg:mx-auto"
      >
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide text-white"
        >
          Sumery<span className="text-glow">·</span>希曼
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-ink-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
