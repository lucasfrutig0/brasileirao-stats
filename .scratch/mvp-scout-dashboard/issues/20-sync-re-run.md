# Ticket 20: Sync Re-run Should Not Re-fetch Already Recorded Data

**Status:** open  
**Type:** task

## Description
When running the sync job again (re-run), it should not re-request requests that have already been recorded in the local database. This respects the API free plan limits and avoids unnecessary network usage.

## Acceptance Criteria
- [ ] Re-run of `npm run sync` checks what data already exists locally
- [ ] Already-recorded requests are skipped, not repeated
- [ ] Only missing/new data is fetched
- [ ] State is consistent after re-run (no duplicates, no gaps)

## Notes
- Per spec constraint: "Resumível: re-run não deve refazer requests que já gravaram"
- Related to Ticket 12 (API sync job) and the throttle/backoff mechanism
- Important for production workflow: sync can be re-run safely after initial setup