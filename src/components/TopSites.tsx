import { CATEGORIES } from "@/lib/categories";
import type { Site } from "@/lib/tranco";
import { Favicon } from "./Favicon";

export function TopSites({ sites }: { sites: Site[] }) {
  return (
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {sites.map((site, index) => (
        <li key={site.domain}>
          <a
            href={`https://${site.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-card p-4 transition hover:-translate-y-0.5 hover:border-accent"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-bold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Favicon domain={site.domain} size={28} />
            </div>
            <div className="min-w-0">
              <p className="truncate font-semibold group-hover:underline">
                {site.domain}
              </p>
              <p className="text-xs text-muted">
                전체 {site.rank}위 · {CATEGORIES[site.category]}
              </p>
            </div>
          </a>
        </li>
      ))}
    </ol>
  );
}
