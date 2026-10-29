# Ticket 03: Player Percentiles within Positional Baseline

**Status:** open  
**Type:** task

## Description
Calculate and display percentiles per metric within the positional baseline (per ADR-0002):
- Example: "p80 em Finalizações/90"
- Each metric gets its own percentile rank within the player's positional group

## Acceptance Criteria
- [ ] Percentile calculated and displayed for each applicable metric
- [ ] Percentile based on positional baseline, not raw data
- [ ] Below 450-minute cutoff: percentile disabled with explicit marking

## Notes
- Per ADR-0002: percentile always on normalized (/90) stat within positional baseline
- Baseline derived during sync job, persisted as data