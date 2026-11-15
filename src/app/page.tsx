import { CategoryChart } from "@/components/CategoryChart";
import { RankingTable } from "@/components/RankingTable";
import { TopSites } from "@/components/TopSites";
import { getRanking } from "@/lib/tranco";

export default async function Home() {
  const ranking = await getRanking();

  if (!ranking) {
    return (
      <main className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-4 py-20 text-center text-muted">
        순위 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
      </main>
    );
  }

  const webSites = ranking.sites.filter((site) => site.category !== "infra");
  const top100 = ranking.sites.slice(0, 100);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-14 px-4 py-12 sm:py-16">
      <header className="flex flex-col gap-4">
        <p className="w-fit rounded-full border border-line bg-card px-3 py-1 text-xs text-muted">
          {ranking.listDate} 기준 · 매일 갱신
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          지금 세계가 가장 많이 찾는
          <br />
          <span className="text-accent">웹사이트 순위</span>
        </h1>
        <p className="max-w-2xl text-muted">
          Chrome 사용자 경험 리포트(CrUX), Cloudflare Radar 등 여러 트래픽 지표를
          종합한 Tranco 리스트로 전 세계 상위 {ranking.sites.length.toLocaleString()}개
          도메인을 보여줍니다.
        </p>
      </header>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">🏆 사람들이 직접 방문하는 TOP 10</h2>
        <TopSites sites={webSites.slice(0, 10)} />
      </section>

      <section className="flex flex-col gap-5 rounded-2xl border border-line bg-card p-6">
        <div>
          <h2 className="text-xl font-bold">상위 100개 도메인 카테고리 분포</h2>
          <p className="text-sm text-muted">잘 알려진 도메인 기준의 추정 분류입니다.</p>
        </div>
        <CategoryChart sites={top100} />
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">전체 순위</h2>
        <RankingTable sites={ranking.sites} />
      </section>

      <footer className="border-t border-line pt-6 text-sm text-muted">
        데이터 출처:{" "}
        <a
          href={`https://tranco-list.eu/list/${ranking.listId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-accent"
        >
          Tranco list {ranking.listId}
        </a>
        {" "}· 파비콘: Google
      </footer>
    </main>
  );
}
