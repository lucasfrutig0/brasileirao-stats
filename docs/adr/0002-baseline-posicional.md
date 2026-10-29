# ADR-0002: Percentil com baseline posicional e corte de minutos

- **Status:** aceito
- **Data:** 2026-10-29
- **Contexto:** ADR inspirada na sessão de grilling do MVP scout (`.scratch/mvp-scout-dashboard/`).

## Contexto

O produto exibe Percentis de jogadores como análise central do scout. Um Percentil só é significativo com um baseline declarado: sem ele, comparar zagueiro com volante — ou um jogador de 100 minutos com um de 20 partidas completas — produz ruído disfarçado de insight. Três opções: liga inteira por posição, apenas top de minutos, posição + corte de minutos.

## Decisão

1. **Baseline posicional:** o Percentil de um jogador se calcula dentro do seu Grupo posicional simplificado (Goleiro / Defensor / Meia / Atacante) na mesma Temporada — não contra a Liga inteira.
2. **Corte de minutos: 450** (≈ 5 jogos completos). Jogadores abaixo do Corte de minutos ficam na base e visíveis no produto, mas são **excluídos do Baseline** e marcados como tais na UI.
3. **Toda Percentil computa sobre Estatística normalizada (/90)**, jamais sobre Estatística crua.

## Consequências

- **Positivas:** comparisons justos dentro de função; padrão du mercado de scout (facilita ler o produto com olhos já treinados); o corte protege contra outliers de amostra pequena.
- **Negativas:** jogadores jovens ou recém-contratados (pouca rodagem) aparecem sem Percentil — recursiva intencional, para não fabricar conclusão com poucos minutos.
- **Implementação:** o Grupo posicional simplificado é derivado no Sync job (coluna no banco), não computado na UI. O corte é aplicado em query time, parametrizado por config (450 é o valor padrão declarado no código, não um número mágico escondido na UI).
