import type { DirectoryEntry } from "@/content/directory";
import { SectionHeader } from "@/components/home/article-card";

function RepoLinks({ entry }: { entry: DirectoryEntry }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-5">
      {entry.repoUrl && (
        <a
          href={entry.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-sky-accent hover:underline"
        >
          GitHub ↗
        </a>
      )}
      {entry.repoNote && (
        <span className="text-xs text-ink-500">{entry.repoNote}</span>
      )}
      {entry.status.tone === "glow" && (
        <span className="chip chip-glow">{entry.status.label}</span>
      )}
    </div>
  );
}

export function PlatformArchSection({
  entries,
}: {
  entries: DirectoryEntry[];
}) {
  const [main, ...rest] = entries;
  return (
    <section
      className="mx-auto max-w-(--container-page) px-6 py-20"
      id="platform"
    >
      <SectionHeader eyebrow="INFRASTRUCTURE & PLATFORM" title="平台与架构" />
      <div className="grid gap-5 lg:grid-cols-2">
        <article className="glass-card glass-card-hover p-7">
          <h3 className="text-lg font-semibold text-white">{main.title}</h3>
          <p className="mt-1 text-sm text-glow-soft">{main.subcategory}</p>
          <p className="mt-3 text-sm leading-6 text-ink-500">{main.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {main.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          <RepoLinks entry={main} />
        </article>
        <ul className="grid gap-4">
          {rest.map((e) => (
            <li key={e.id} className="glass-card glass-card-hover p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-white">
                  {e.title}
                </h3>
                <span
                  className={`chip ${e.status.tone === "glow" ? "chip-glow" : ""}`}
                >
                  {e.status.label}
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-ink-500">{e.summary}</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {e.tags.slice(0, 3).map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
                {e.repoUrl ? (
                  <a
                    href={e.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sky-accent hover:underline"
                  >
                    GitHub ↗
                  </a>
                ) : (
                  <span className="text-xs text-ink-500">未公开</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TechPracticeSection({
  entries,
}: {
  entries: DirectoryEntry[];
}) {
  return (
    <section
      className="mx-auto max-w-(--container-page) px-6 py-20"
      id="tech-practice"
    >
      <SectionHeader
        eyebrow="ENGINEERING PRACTICES"
        title="技术实践"
        moreHref="/projects/?type=tech-practice"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {entries.map((e) => (
          <article key={e.id} className="glass-card glass-card-hover p-6">
            <p className="text-xs uppercase tracking-wider text-ink-500">
              {e.subcategory}
            </p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-white">{e.title}</h3>
              <span
                className={`chip ${e.status.tone === "glow" ? "chip-glow" : ""}`}
              >
                {e.status.label}
              </span>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-500">{e.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {e.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <RepoLinks entry={e} />
          </article>
        ))}
      </div>
    </section>
  );
}
