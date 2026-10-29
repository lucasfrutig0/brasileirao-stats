/**
 * Sync job (ADR-0001): busca teams/players da API-Football e grava no banco local.
 *
 * Constraint do plano free (100 req/dia, 10 req/min):
 * - throttle: 6.5s entre requests (10/min com folga)
 * - resumível: re-run não refaz requests cujas estatísticas já estão no banco
 *
 * Disparo: `npm run sync` (manual, após rodada). Nunca roda no Caminho de request.
 *
 * TODO(mvp-scout-dashboard): tickets de implementação em .scratch/mvp-scout-dashboard/issues/
 */
import { eq } from "drizzle-orm";

import { db, schema } from "@/db/";

const API_FOOTBALL_BASE = "https://v3.football.api-sports.io";
/** Liga 71 = Série A (GLOSSARY.md) */
const LEAGUE_ID = 71;
const SEASONS = [new Date().getFullYear()];

const THROTTLE_MS = 6_500;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function apiFetch(path: string, params: Record<string, string>) {
  const key = process.env.API_FOOTBALL_API_KEY;
  if (!key) throw new Error("API_FOOTBALL_API_KEY ausente — copie .env.example para .env");

  const url = new URL(`${API_FOOTBALL_BASE}/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const res = await fetch(url, { headers: { "x-apisports-key": key } });
  if (!res.ok) throw new Error(`API ${path}: HTTP ${res.status}`);
  const body = (await res.json()) as {
    errors: string[] | Record<string, string>;
    results: number;
    response: unknown[];
  };
  if (Array.isArray(body.errors) ? body.errors.length : Object.keys(body.errors).length > 0) {
    throw new Error(`API ${path}: ${JSON.stringify(body.errors)}`);
  }
  return body;
}

async function main() {
  for (const season of SEASONS) {
    console.log(`sync: liga ${LEAGUE_ID}, temporada ${season}`);

    const statsDb = await db.select().from(schema.playerStatistics).where(eq(schema.playerStatistics.season, season));
    console.log(`sync: ${statsDb.length} estatísticas já sincronizadas (resumo skip)`);

    // TODO: completar com o fluxo do MVP
    // 1. teams?league=71&season=YYYY            → upsert em teams
    // 2. players?league=71&season=YYYY&team=ID  → upsert players + player_statistics (grupo posicional derivado aqui)
    // 3. standings?league=71&season=YYYY        → tabela da liga

    await sleep(THROTTLE_MS);
  }
}

main().catch((err) => {
  console.error("sync: falhou —", err);
  process.exit(1);
});
