# Ticket 15: Season Column from Day 1

**Status:** open  
**Type:** task

## Description
Ensure the database schema includes a `season` column from day 1, enabling multi-season support in the future without retrofitting.

## Acceptance Criteria
- [ ] Database tables include `season` column
- [ ] Sync job populates the season column (2026 for current data)
- [ ] Future seasons can be added without schema migration
- [ ] All queries filter or can filter by season

## Notes
- Per ADR-0001: "Schema: coluna season desde o dia 1 para permitir multi-temporada no futuro sem retrofit"
- This is foundational - should be implemented early