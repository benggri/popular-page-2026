"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, type Category } from "@/lib/categories";
import type { Site } from "@/lib/tranco";
import { Favicon } from "./Favicon";

const PAGE_SIZE = 50;

type Filter = Category | "all";

function filterSites(sites: Site[], query: string, filter: Filter, hideInfra: boolean) {
  const q = query.trim().toLowerCase();
  return sites.filter(
    (site) =>
      (!hideInfra || site.category !== "infra") &&
      (filter === "all" || site.category === filter) &&
      (!q || site.domain.includes(q)),
  );
}

export function RankingTable({ sites }: { sites: Site[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [hideInfra, setHideInfra] = useState(true);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () => filterSites(sites, query, filter, hideInfra),
    [sites, query, filter, hideInfra],
  );
  const visible = filtered.slice(0, limit);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setLimit(PAGE_SIZE); }}
          placeholder="도메인 검색 (예: naver)"
          className="w-full rounded-xl border border-line bg-card px-4 py-2.5 outline-none focus:border-accent sm:max-w-xs"
        />
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value as Filter); setLimit(PAGE_SIZE); }}
          className="rounded-xl border border-line bg-card px-3 py-2.5"
          aria-label="카테고리"
        >
          <option value="all">전체 카테고리</option>
          {Object.entries(CATEGORIES).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={hideInfra}
            onChange={(e) => setHideInfra(e.target.checked)}
            className="accent-[var(--accent)]"
          />
          인프라·광고 도메인 숨기기
        </label>
      </div>

      <p className="text-sm text-muted">{filtered.length.toLocaleString()}개 사이트</p>

      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
        {visible.map((site) => (
          <li key={site.domain} className="flex items-center gap-4 px-4 py-3">
            <span className="w-12 text-right font-mono text-muted">#{site.rank}</span>
            <Favicon domain={site.domain} size={24} />
            <a
              href={`https://${site.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-0 flex-1 truncate font-medium hover:text-accent hover:underline"
            >
              {site.domain}
            </a>
            <span className="hidden rounded-full border border-line px-2.5 py-0.5 text-xs text-muted sm:inline">
              {CATEGORIES[site.category]}
            </span>
          </li>
        ))}
        {visible.length === 0 && (
          <li className="px-4 py-10 text-center text-muted">검색 결과가 없습니다.</li>
        )}
      </ul>

      {limit < filtered.length && (
        <button
          type="button"
          onClick={() => setLimit((n) => n + PAGE_SIZE)}
          className="self-center rounded-xl border border-line bg-card px-5 py-2.5 font-medium hover:border-accent"
        >
          더 보기 ({visible.length} / {filtered.length})
        </button>
      )}
    </div>
  );
}
