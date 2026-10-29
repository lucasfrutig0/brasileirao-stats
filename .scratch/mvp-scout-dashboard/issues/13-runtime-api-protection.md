# Ticket 13: Runtime API Protection - No External Calls

**Status:** open  
**Type:** task

## Description
Ensure no page or component directly hits API-Football at runtime. The site should only read from the local SQLite database.

## Acceptance Criteria
- [ ] All data fetching goes through sync job, not inline in pages/-components
- [ ] Type-safe queries using Drizzle ORM against local DB
- [ ] No `fetch()` or API calls in client components or API routes that reach external services
- [ ] E2E test or verification that runtime requests are only to local endpoints

## Notes
- Per spec: "nenhuma página fereia a API-Football em runtime. O site só lê o banco local."
- This is a cross-cutting constraint that should be verified throughout development