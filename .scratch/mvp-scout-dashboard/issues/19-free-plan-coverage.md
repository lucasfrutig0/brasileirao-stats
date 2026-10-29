# Ticket 19: Free Plan Coverage Detection

**Status:** open  
**Type:** task

## Description
Detect early if the Campeonato Brasileiro Série A is not accessible with the free API-Football plan (100 req/day, 10 req/min). If the league is not coverable, the sync should fail early and cheaply - detectable on day 1.

## Acceptance Criteria
- [ ] Sync job checks league accessibility early in the process
- [ ] Clear error message if the league/tournament is not coverable with the free plan
- [ ] Failure is "early and cheap" - doesn't waste quota
- [ ] Day-1 detectability confirmed

## Notes
- Per spec risk: "Cobertura do plano free: variável por liga/temporada. Se a Liga não estiver acessível com o plano atual, o sync falha cedo e barato — detectável no dia 1."
- This is a validation/guardrail on the sync job (Ticket 12)
- Should produce a specific, actionable error rather than ambiguous timeout/quota exhaustion