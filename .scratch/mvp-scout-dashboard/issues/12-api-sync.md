# Ticket 12: API Sync Job with Throttle/Backoff

**Status:** open  
**Type:** task

## Description
Sync job for fetching API-Football data and storing locally in SQLite:
- Batch sync with throttle + backoff
- ~25 requests per full sync
- Manual CLI trigger: `npm run sync`
- Re-run should not re-request already recorded data

## Acceptance Criteria
- [ ] CLI command `npm run sync` triggers the sync job
- [ ] Throttling respects API-Free plan limits (10 req/min)
- [ ] Backoff on rate limit / errors
- [ ] Re-run does not duplicate already-recorded requests/data
- [ ] Season column present from day 1 (per ADR-0001)

## Notes
- Free plan: 100 req/day, 10 req/min
- Per spec: "sync job é por lote, com throttle + backoff"
- Critical path: no page hits API in runtime (Ticket 14)