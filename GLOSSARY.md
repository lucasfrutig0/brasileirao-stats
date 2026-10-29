# Glossário — ScoutBR

Vocabulário oficial do projeto. Skills e agentes devem usar estes termos exatos (em português) ao nomear conceitos em issues, specs, código e UI — e evitar sinônimos que este glossário explicitamente evita.

## Conceitos

### ScoutBR
Nome de trabalho do produto: ferramenta solo de análise de scout para o Campeonato Brasileiro Série A. Slug do repo: `scoutbr`.

### Liga
O Campeonato Brasileiro Série A. Na API-Football: `league: 71`. Único escopo estatístico do produto no MVP.

### Temporada
Edição anual da Liga, identificada pelo ano (ex.: `2026`). O schema carrega a coluna `season` desde o dia 1; o MVP sincroniza apenas a temporada corrente.

### Estatística crua
Número acumulado no formato fonte da API-Football (ex.: `shots.total: 13`, `passes.total: 326`). Sem normalização, sem contexto. Contrasta com Estatística normalizada.

### Estatística normalizada (p90)
Estatística crua dividida por (minutos jogados / 90). Escrita como `X/90` (ex.: `Finalizações/90`). Nomenclatura em inglês do termo não traduz: sempre "per-90" ou "/90", nunca "por jogo" nem "média por partida".

### Percentil
Posição relativa de uma Estatística normalizada de um jogador dentro do seu Baseline posicional, expressa de p0 a p99 (ex.: "p80 em Finalizações/90"). A unidade do percentil é sempre uma Estatística normalizada — nunca a Estatística crua.

### Baseline posicional
A população contra a qual cada Percentil é calculado: os jogadores elígíveis do mesmo Grupo posicional na mesma Temporada. Definido pela ADR-0002.

### Grupo posicional simplificado
Redução da posição da API-Football (`Goalkeeper` / `Defender` / `Midfielder` / `Attacker`) a quatro buckets de comparação: **Goleiro**, **Defensor**, **Meia**, **Atacante**. O bucket mapeia 1:1 com a posição fonte; a simplificação é o nome, não a tradução.

### Corte de minutos
Limiar mínimo de minutos jogados (450 ≈ 5 jogos completos) para um jogador entrar no Baseline posicional. Jogador abaixo do corte é visível no produto, mas excluído dos Percentis (e marcado como tal na UI).

### Sync job
Script CLI manual (`npm run sync`) que busca dados na API-Football e grava no banco local. Nunca roda no caminho das requests. Comporta-se como consumidor de API por lote: throttle (10 req/min) + backoff, ~25 requests por sync completo, disparo manual após rodada. A ADR-0001 registra a decisão.

### Caminho de request (request path)
O fluxo do servidor web ao responder uma requisição de navegador. Os dados de estatística consultados no Caminho de request vêm **sempre** do banco local — nunca diretamente da API-Football.

### Plano free
Plano da API-Football em uso: 100 requests/dia, 10 requests/min. Constraint orçamentária que reescreveu o design do Sync job (lote, resumível, sem retry agressivo).

## Termos que evitamos

| Evitar | Usar em vez disso |
|---|---|
| "métrica" para uma estatística específica | Estatística (normalizada ou crua) |
| "média por jogo" | /90 (Estatística normalizada) |
| "ranking" ou "posição geral" (sem contexto) | Percentil no Baseline posicional |
| "liga brasileira" | Liga |
| "elenco" no contexto de comparação | Grupo posicional simplificado |
