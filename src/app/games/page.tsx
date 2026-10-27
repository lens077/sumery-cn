import type { Metadata } from "next";
import { games } from "@/content/games";

export const metadata: Metadata = {
  title: "游戏乐园",
  description: "Sumery 游戏子线：浏览器小游戏。",
  alternates: { canonical: "/games/" },
};

export default function GamesPage() {
  return (
    <div className="mx-auto max-w-(--container-page) px-6 py-24">
      <h1 className="text-3xl font-bold text-white">游戏乐园</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {games.map((g) => (
          <a
            key={g.slug}
            href={`/games/${g.slug}/`}
            className="glass-card glass-card-hover block p-6"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-white">{g.name}</h2>
              <span className="chip chip-glow">{g.statusNote}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-500">
              {g.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
