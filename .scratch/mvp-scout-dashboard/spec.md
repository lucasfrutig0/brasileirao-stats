# Spec: MVP Scout Dashboard — ScoutBR

## Contexto

Ferramenta solo de análise de scout para a **Liga** (Campeonato Brasileiro Série A), com dados da API-Football sincronizados para banco local. O usuário é o próprio dono (sem auth, sem multi-tenant). O princípio nº 1 do produto: **informação densa — nunca sacrificar números por estética**.

Decisões de arquitetura e normalização já registradas:

- **ADR-0001** — Sync para banco local (SQLite), API fora do Caminho de request
- **ADR-0002** — Percentil com Baseline posicional e Corte de minutos (450)

Terminologia: ver `GLOSSARY.md` na raiz. Esta spec usa os termos do glossário.

## Stack

- Next.js (App Router) + TypeScript
- Drizzle ORM + SQLite (better-sqlite3)
- Charts: ECharts
- Deploy: VPS/Docker (dev = prod)
- UI em pt-BR, tema dark densivo

## Escopo do MVP

As quatro análises obrigatórias. A Temporada coberta é 2026 apenas.

### 1. Perfil do jogador + percentis

Página por jogador com:

- Identificação: nome, idade, nacionalidade, altura/peso, foto, posição (Grupo posicional simplificado), time, camisa
- Minutos jogados, aparições, titularizações, entrada/saída do banco
- Estatísticas cruas: finalizações (total/no alvo), gols/assistências, passes (total/chave/precisão), dribles, duelos, faltas (sofridas/cometidas), cartões, pênaltis, rating da fonte
- **Estatísticas normalizadas** (/90) para cada métrica aplicável, calculadas no servidor
- **Percentil** por métrica dentro do Baseline posicional (ex.: "p80 em Finalizações/90")
- Jogador abaixo do Corte de minutos: visível, com Percentil desativado e marcação explícita
- Resumo executivo no topo: 3–4 percentis-chave em evidência (estilo headline)

### 2. Comparador de jogadores

- Seleção de 2+ jogadores (busca por nome/time), comparação lado a lado
- Radar com categorias-chave (finalização, criação, condução, duelo, disciplina) em Percentil
- Tabela numérica completa abaixo do radar — o radar não substitui os números

### 3. Página de time + liga

- Página por time: elenco com Estatísticas normalizadas por jogador, links para perfis
- Métricas do time agregadas: gols, finalizações, passes, cartões, duelos
- Tabela da Liga com métricas dos 20 times normalizadas por 90
- Home como dashboard executivo: KPIs de liga (top pontuadores /90 por categoria, surpresas) com atalho para as páginas de scout

### 4. Scatter de liga inteira

- Scatter plot da Liga toda (ex.: Passes-chave/90 vs Precisão de passe%, tamanho do ponto = minutos)
- Filtro por Grupo posicional simplificado e por Time
- Pontos clicáveis abrem o Perfil do jogador

## Constraints

- **Plano free da API-Football:** 100 req/dia, 10 req/min. O Sync job é por lote, com throttle + backoff, ~25 req/sync completo, disparo CLI manual (`npm run sync`). Resumível: re-run não deve refazer requests que já gravaram.
- **Caminho de request:** nenhuma página fereia a API-Football em runtime. O site só lê o banco local.
- **Percentil:** sempre sobre Estatística normalizada (/90), dentro do Baseline posicional, nunca sobre Estatística crua (ADR-0002).
- **Schema:** coluna `season` desde o dia 1 para permitir multi-temporada no futuro sem retrofit (decisão no ADR-0001).
- **Grupo posicional:** derivada no Sync job e persistida como coluna, não computada na UI (ADR-0002).

## Fora de escopo do MVP

- Autenticação, SaaS, billing, multi-tenant
- Multi-temporada (schema pronto, dados só 2026)
- Histórico por jogo: lineups, eventos, heatmaps, odds
- xG / xA (não disponível nos endpoints usados; recalculado exigiria dados de eventos por jogo)
- Idioma inglês / i18n
- Labels de triage (skill `triage` não instalada)
- Comparação com outras ligas

## Riscos conhecidos

- **Amostras pequenas:** gols/90 de quem jogou 60 minutos explode. Corte de minutos mitiga; a UI deve sempre exibir minutos ao lado de qualquer /90.
- **Rating da fonte:** string na API (`"6.56"`), nullable — parse tolerante no Sync job, tratar `null` como "sem rating", não como 0.
- **Cobertura do plano free:** variável por liga/temporada. Se a Liga não estiver acessível com o plano atual, o sync falha cedo e barato — detectável no dia 1.

## Tickets

Ver `issues/NN-<slug>.md` neste diretório (criados a partir desta spec).
