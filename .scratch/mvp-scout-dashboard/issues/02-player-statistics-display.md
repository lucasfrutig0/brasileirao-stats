# Ticket 02: Player Statistics - Raw and Normalized

**Status:** open  
**Type:** task

## Description
Display raw and normalized (/90) statistics for each applicable metric:
- Finalizations (total/no target), gols/assistências
- Passes (total/chave/precisão)
- Dribles, duelos, faltas (sofridas/cometidas)
- Cartões, pênaltis, rating da fonte

Calculated on server, displayed with minutes context.

## Acceptance Criteria
- [ ] Raw stat totals displayed
- [ ] /90 normalized stats calculated and displayed
- [ ] Minutes shown adjacent to every /90 metric
- [ ] Rating source parsed tolerantly; null treated as "sem rating"

## Notes
- Server-side calculation per ADR-0002: percentiles always on /90, never raw
- Rating: API returns string "6.56", nullable - parse with tolerance