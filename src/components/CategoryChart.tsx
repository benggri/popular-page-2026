import { CATEGORIES, type Category } from "@/lib/categories";
import type { Site } from "@/lib/tranco";

export function CategoryChart({ sites }: { sites: Site[] }) {
  const counts = new Map<Category, number>();
  for (const site of sites) {
    counts.set(site.category, (counts.get(site.category) ?? 0) + 1);
  }
  const rows = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  const max = Math.max(...rows.map(([, count]) => count), 1);

  return (
    <ul className="flex flex-col gap-2">
      {rows.map(([category, count]) => (
        <li key={category} className="grid grid-cols-[6rem_1fr_2.5rem] items-center gap-3 text-sm">
          <span className="text-muted">{CATEGORIES[category]}</span>
          <span className="h-3 overflow-hidden rounded-full bg-line">
            <span
              className="block h-full rounded-full bg-accent"
              style={{ width: `${(count / max) * 100}%` }}
            />
          </span>
          <span className="text-right font-mono">{count}</span>
        </li>
      ))}
    </ul>
  );
}
