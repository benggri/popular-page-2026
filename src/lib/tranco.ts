import { cacheLife } from "next/cache";
import { categorize, type Category } from "./categories";

const LATEST_LIST_URL = "https://tranco-list.eu/api/lists/date/latest";
const TOP_N = 1000;

export type Site = {
  rank: number;
  domain: string;
  category: Category;
};

export type Ranking = {
  listId: string;
  listDate: string;
  sites: Site[];
};

type LatestListResponse = {
  list_id: string;
  created_on: string;
  configuration?: { endDate?: string };
};

function parseCsv(csv: string): Site[] {
  return csv
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [rank, domain] = line.split(",");
      return { rank: Number(rank), domain, category: categorize(domain) };
    })
    .filter((site) => Number.isFinite(site.rank) && site.domain);
}

export async function getRanking(): Promise<Ranking | null> {
  "use cache";
  cacheLife("days");

  try {
    const metaRes = await fetch(LATEST_LIST_URL);
    if (!metaRes.ok) return null;
    const meta = (await metaRes.json()) as LatestListResponse;

    const csvRes = await fetch(
      `https://tranco-list.eu/download/${meta.list_id}/${TOP_N}`,
    );
    if (!csvRes.ok) return null;

    return {
      listId: meta.list_id,
      listDate: meta.configuration?.endDate ?? meta.created_on.slice(0, 10),
      sites: parseCsv(await csvRes.text()),
    };
  } catch {
    return null;
  }
}
