import Link from "next/link";
import { LucyViewer } from "@/components/three/lucy-viewer.client";

const GLINTS = [
  { left: "30%", top: "6%", width: "18%" },
  { left: "52%", top: "14%", width: "10%" },
  { left: "44%", top: "24%", width: "26%" },
  { left: "64%", top: "32%", width: "12%" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="hero-scene" aria-hidden="true">
        <div className="sun" />
        <svg
          className="mountains"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            d="M0 320 L260 120 L420 240 L640 60 L880 250 L1100 100 L1440 320 Z"
            fill="#1b2a55"
            opacity="0.9"
          />
          <path
            d="M0 320 L200 200 L430 300 L700 150 L980 300 L1200 190 L1440 320 Z"
            fill="#131f42"
          />
        </svg>
        <div className="water">
          {GLINTS.map((g, i) => (
            <span
              key={i}
              className="glint"
              style={{ left: g.left, top: g.top, width: g.width }}
            />
          ))}
        </div>
        <div className="fade-bottom" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-(--container-page) items-center gap-12 px-6 pb-28 pt-44 lg:grid-cols-[46%_54%] lg:pb-36 lg:pt-52">
        <div>
          <p className="text-sm font-medium tracking-widest text-glow-soft">
            SUMERY STUDIO · 独立开发者 · 产品工作室
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
            让每一个工具，都成为你更好的生活方式
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-ink-400">
            专注于效率工具、开发者工具与独立产品，用代码创造价值，用产品解决真实问题。
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/products/" className="cta-primary">
              探索全部产品
            </Link>
            <Link href="/about/" className="cta-secondary">
              了解工作室
            </Link>
          </div>
          <p className="mt-6 text-sm tracking-wide text-ink-500">
            Small Tools, Big Changes
          </p>
        </div>
        <div className="relative h-[320px] sm:h-[420px] lg:h-[480px]">
          <LucyViewer />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
        <span className="text-xs tracking-widest text-ink-500">↓ 向下滚动</span>
      </div>
    </section>
  );
}
