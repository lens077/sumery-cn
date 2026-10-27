import type { Product } from "@/lib/content-schema";
import { statusLabels } from "@/lib/content-schema";
import type { Project } from "@/lib/content-schema";
import type { Game } from "@/lib/content-schema";
import { SectionHeader } from "@/components/home/article-card";
import Link from "next/link";

export function ProductsSection({ products }: { products: Product[] }) {
  return (
    <section
      className="mx-auto max-w-(--container-page) px-6 py-20"
      id="products"
    >
      <SectionHeader
        eyebrow="PRODUCTS"
        title="Sumery 产品"
        moreHref="/products/"
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {products.map((p) => (
          <article
            key={p.slug}
            className="glass-card glass-card-hover flex flex-col p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="flex items-center gap-2.5 text-base font-semibold text-white">
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    className="h-10 w-10 rounded-[10px]"
                  />
                )}
                {p.name}
              </h3>
              <span
                className={`chip ${p.status === "in-development" ? "chip-glow" : ""}`}
              >
                {statusLabels[p.status]}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-ink-400">{p.tagline}</p>
            <p className="mt-2 flex-1 text-sm leading-6 text-ink-500">
              {p.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {p.platforms?.map((pl) => (
                <span key={pl} className="chip">
                  {pl}
                </span>
              ))}
            </div>
            <Link
              href={`/products/${p.slug}/`}
              className="mt-4 text-sm font-medium text-sky-accent hover:underline"
            >
              了解详情 →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <section
      className="mx-auto max-w-(--container-page) px-6 py-20"
      id="projects"
    >
      <SectionHeader
        eyebrow="ENGINEERING"
        title="工程项目"
        moreHref="/projects/"
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {featured.map((p) => (
          <article key={p.slug} className="glass-card glass-card-hover p-7">
            <h3 className="text-lg font-semibold text-white">{p.name}</h3>
            <p className="mt-1 text-sm text-glow-soft">{p.tagline}</p>
            <p className="mt-3 text-sm leading-6 text-ink-500">
              {p.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {rest.map((p) => (
          <li
            key={p.slug}
            className="glass-card flex items-center justify-between gap-4 p-4"
          >
            <div>
              <h3 className="text-sm font-semibold text-white">{p.name}</h3>
              <p className="mt-0.5 text-xs text-ink-500">{p.tagline}</p>
            </div>
            <div className="flex flex-wrap justify-end gap-1.5">
              {p.tags.slice(0, 2).map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function GamesSection({ games }: { games: Game[] }) {
  return (
    <section className="mx-auto max-w-(--container-page) px-6 py-20" id="games">
      <SectionHeader eyebrow="GAMES" title="游戏乐园" moreHref="/games/" />
      <div className="grid gap-5 lg:grid-cols-2">
        {games.map((g) => (
          <article
            key={g.slug}
            className="glass-card glass-card-hover relative flex min-h-44 flex-col justify-end overflow-hidden p-7"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(91,143,249,0.18),transparent_60%)]"
            />
            <div className="relative">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-white">{g.name}</h3>
                <span className="chip chip-glow">{g.statusNote}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-ink-500">
                {g.description}
              </p>
              <Link
                href={`/games/${g.slug}/`}
                className="mt-4 inline-block text-sm font-medium text-sky-accent hover:underline"
              >
                了解详情 →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
