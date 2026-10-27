import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { games } from "@/content/games";

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) return {};
  return {
    title: game.name,
    description: game.description,
    alternates: { canonical: `/games/${game.slug}/` },
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);
  if (!game) notFound();
  return (
    <div className="mx-auto max-w-(--container-page) px-6 py-24">
      <p className="section-eyebrow">GAME</p>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold text-white">{game.name}</h1>
        <span className="chip chip-glow">{game.statusNote}</span>
      </div>
      <p className="mt-3 text-lg text-ink-400">{game.tagline}</p>
      <p className="mt-6 max-w-2xl leading-7 text-ink-500">
        {game.description}
      </p>
      {game.playUrl ? (
        <a
          className="cta-primary mt-8"
          href={game.playUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          开始游玩 ↗
        </a>
      ) : (
        <p className="mt-8 text-sm text-ink-500">
          入口开放后会在本页提供游玩链接。
        </p>
      )}
    </div>
  );
}
