# Ticket 14: Percentile Always on Normalized Stats (/90)

**Status:** open  
**Type:** task

## Description
 enforce that percentiles are always calculated on normalized (/90) statistics, never on raw stats. Per ADR-0002.

## Acceptance Criteria
- [ ] Server-side calculation ensures percentiles use /90 stats as base
- [ ] Raw stat values are still available for display, but percentiles operate on /90
- [ ] No percentile calculation on raw (non-/90) data anywhere in the UI
- [ ] Documentation/verification that the ADR-0002 rule is enforced

## Notes
- Per ADR-0002: "Percentil: sempre sobre Estatística normalizada (/90), dentro do Baseline posicional, nunca sobre Estatística crua"
- This rule affectsTickets 03, 05 (radar), 10 (scatter)