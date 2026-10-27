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
            SUMERY CREATIVE STUDIO · INDEPENDENT BUILDER
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold italic leading-tight text-white sm:text-5xl">
            Build Useful Tools,
            <br />
            Create Better Experiences.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-ink-400">
            用代码构建有用的产品，用技术解决实际问题。在创造中持续实践，在实践中持续进化。
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="#products" className="cta-primary">
              探索我的作品
            </Link>
            <Link href="/projects/" className="cta-secondary">
              查看全部项目 ↗
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
