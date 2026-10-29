# ADR-0001: Sync para banco local (SQLite) — API fora do caminho de request

- **Status:** aceito
- **Data:** 2026-10-29
- **Contexto:** ADR inspirada na sessão de grilling do MVP scout (`.scratch/mvp-scout-dashboard/`).

## Contexto

Os dados vêm da API-Football (plano free: 100 requests/dia, 10 requests/min). O produto precisa de suplementos analíticos que a API não entrega pronto: Percentis, Estatísticas normalizadas (/90), agregações por time e scatter da Liga inteira. Três caminhos eram possíveis: proxy live com cache, sync para banco local, híbrido.

## Decisão

1. **Ferramenta solo/desso:** sem autenticação, sem multi-tenant, infra mínima.
2. **Sync para banco local:** um Sync job CLI busca teams/players/standings da API-Football, normaliza e grava localmente. O site consulta **100%** do banco local no Caminho de request.
3. **SQLite em arquivo** via better-sqlite3/Drizzle, dev = prod, deploy em VPS/Docker. Sem Postgres/Turso no MVP — para uma ferramenta solo, um arquivo SQLite é a forma mais barata e previsível.
4. **Sync CLI manual** (não botão no app, não cron agressivo): `npm run sync` com throttle + backoff, resumível, ~25 requests por sync completo. Cron no VPS é opcional e enterior.

## Consequências

- **Positivas:** zero dependência da API no Caminho de request; Percentis e agregações viram SQL; rate limit deixa de ser risco de runtime; dados têm forma própria e controlada (a resposta da API é achatada: aninhada, `null` espalhado, `rating` como string).
- **Negativas:** dados têm latência de rodada (até o próximo sync); o Sync job precisa ser sólido (dedup, throttle, resumabilidade) desde o dia 1 — não é opcional.
- **Preço do plano free:** 100 req/dia fecha multi-temporada no bootstrap. O schema carrega `season` desde o dia 1 (decisão preparatória), mas o MVP sincroniza só a Temporada corrente.
- **Neutralidade da UI:** o idioma da UI é pt-BR (decisão de produto, fora do escopo desta ADR), mas a terminologia técnica vem do `GLOSSARY.md`.
