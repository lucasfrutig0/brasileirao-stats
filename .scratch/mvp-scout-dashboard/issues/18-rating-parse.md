# Ticket 18: Tolerant Rating Parsing

**Status:** open  
**Type:** task

## Description
The API-Football returns rating as a string (e.g., "6.56") and it can be nullable. The sync job should parse tolerantly, treating null as "sem rating" rather than as 0.

## Acceptance Criteria
- [ ] Sync job parses rating string with tolerance (handles formatting variations)
- [ ] Null rating treated as "sem rating", not as 0
- [ ] Display shows appropriate "sem rating" state when null
- [ ] No crash on unexpected rating format

## Notes
- Per spec risk: "Rating da fonte: string na API ('6.56'), nullable — parse tolerante no Sync job, tratar null como 'sem rating', não como 0"
- Critical for data integrity in player profiles (Ticket 01) and stats (Ticket 02)