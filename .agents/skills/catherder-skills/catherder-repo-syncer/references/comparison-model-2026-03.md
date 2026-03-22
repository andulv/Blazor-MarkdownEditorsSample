---
type: reference
description: "Condensed comparison model for evaluating CatHerder instruction assets across repositories and choosing safe sync recommendations."
snapshot_date: 2026-03-11
sources:
  - Internal CatHerder planning notes used during authoring (plan007 and plan008 working notes as of 2026-03-11)
  - Root AGENTS.md bootstrap pattern and current CatHerder instruction conventions observed in this repository at authoring time
---
# Comparison Model

## Scope

This reference covers the comparison and recommendation model for:
- root `AGENTS.md`
- `.instructions/`
- `.agents/`

It does not define automatic sync behavior. Default mode is analysis and recommendation only.

## Core Rules

- Inventory first.
- Classify file role before recommending sync direction.
- Evaluate content role and reuse value, not only timestamps.
- Distinguish canonical/shared from locally adaptable and operational content.
- Surface unresolved ambiguity instead of guessing.

## Classification Classes

- **canonical/shared**
- **locally adaptable**
- **local-only / operational**
- **unresolved / needs-human-decision**

## Surface Defaults

### Root `AGENTS.md`
- Usually a canonical/shared pattern implemented with locally adaptable wording.
- Prefer the minimal bootstrap role over duplicated workflow rules.

### `.instructions/`
- `project.instructions.md` → locally adaptable
- `catherder.instructions.md` → often canonical/shared candidate
- `catherder-git.instructions.md` → often canonical/shared candidate when present
- `SCRATCHPAD.md` → local-only / operational
- active `plans/**` → local-only / operational by default

### `.agents/`
- `agents/<agent>/agent.md` → locally adaptable with possible reusable improvements
- `skills/<skill>/` → may be canonical/shared candidate if it generalizes cleanly
- `agents/agents.yaml` → unresolved / needs-human-decision
- other runtime/config files → local-only / operational unless clearly templated

## Recommendation Logic

### Signals that a version may be better
- clearer and less ambiguous for agents
- more aligned with current CatHerder standards
- more reusable across repositories
- less dependent on local assumptions

### Signals that a version may be project-specific
- references local structure, teams, environment, or current working state
- stores handoff memory or operational registry data
- exists mainly to support one repository runtime

## Recommendation Set

Choose one primary outcome per item:
- `sync A → B`
- `sync B → A`
- `merge manually`
- `do not sync`
- `needs canonical decision`

## Cautions

- Never blindly sync `SCRATCHPAD.md`.
- Never assume active plan files should sync.
- Treat `agents.yaml` as ambiguous until canonical guidance exists.
- Ask for explicit user approval before applying changes.
