# Ticket 01: Player Profile Core

**Status:** open  
**Type:** task

## Description
Build the core player profile page featuring:
- Identification: name, age, nationality, height/weight, photo, positional group simplified, team, jersey number
- Minutes played, appearances, starters, sub on/off
- Basic raw stats display

## Acceptance Criteria
- [ ] Player card with all identification fields
- [ ] Stats panel showing minutes, appearances, starters/sub data
- [ ] Visible marking when player is below the 450-minute cutoff (percentile disabled)

## Notes
- Depends on sync job having persisted player data with minutes and positional group
- UI should always display minutes alongside any normalized stats