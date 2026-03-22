---
type: reference
description: "Standard output structure for CatHerder repo instruction comparison, diff inventory, and directional sync recommendations."
snapshot_date: 2026-03-11
sources:
  - Internal CatHerder planning notes used during authoring (plan008 reporting-format notes as of 2026-03-11)
---
# Reporting Format

## Scope

This reference defines the preferred output format for compare/report mode.

## Default Sections

1. **Scope Summary**
   - repo A
   - repo B
   - compared surfaces
   - exclusions

2. **Inventory**
   - path
   - present in A
   - present in B
   - classification
   - note

3. **Findings**
   - path
   - difference summary
   - why it matters
   - likely status

4. **Recommendation**
   - recommendation
   - confidence
   - rationale
   - cautions

5. **Directional Summary**
   - sync A → B
   - sync B → A
   - merge manually
   - do not sync
   - needs canonical decision

## Style Rules

- Keep entries concise and path-oriented.
- Explain why a recommendation exists.
- Flag risky or ambiguous items explicitly.
- If the user requests only diffs, recommendation sections may be abbreviated but risk flags should remain.
