# Ticket 16: Positional Group Persistence from Sync Job

**Status:** open  
**Type:** task

## Description
Positional group (grupo posicional) derived in the sync job and persisted as a column, not computed in the UI.

## Acceptance Criteria
- [ ] Sync job calculates and stores positional group for each player
- [ ] UI reads positional group from the database (not computes it)
- [ ] Positional group used for filtering in: player profile, scatter plot, comparator
- [ ] Consistent with ADR-0002 baseline determination

## Notes
- Per ADR-0002: "Grupo posicional: derivada no Sync job e persistida como coluna, não computada na UI"
- Affects filtering across multiple tickets (01, 03, 10, 11)