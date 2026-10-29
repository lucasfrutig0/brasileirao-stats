# Ticket 17: Minutes Display alongside /90 Stats

**Status:** open  
**Type:** task

## Description
UI must always display minutes played alongside any /90 statistic to mitigate the risk of small sample sizes (e.g., goals/90 for players who played only 60 minutes "explode").

## Acceptance Criteria
- [ ] Minutes shown visibly next to every /90 metric
- [ ] Below 450-minute cutoff: explicit marking displayed, percentile disabled
- [ ] No /90 statistic displayed without adjacent minutes

## Notes
- Per spec constraint: "a UI deve sempre exibir minutos ao lado de qualquer /90"
- Related to Ticket 01 (below cutoff marking) and Ticket 04 (executive summary)
- Risk: "amostras pequenas: gols/90 de quem jogou 60 minutos explode"