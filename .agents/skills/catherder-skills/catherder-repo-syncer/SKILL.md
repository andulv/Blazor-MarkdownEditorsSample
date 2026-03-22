---
name: catherder-repo-syncer
description: "Compares CatHerder instruction assets between catherder-enabled repositories and recommends safe sync direction or manual merge when users want diff lists, newer/better evaluation, or upstream/downstream sync suggestions for AGENTS.md, .instructions, and .agents content."
---
# catherder-repo-syncer

Use this skill when the user wants to compare CatHerder instruction assets between repositories and decide what should sync in either direction.

## Use This Skill For

- `catherder-instructions-repo` ↔ one CatHerder-enabled project
- one CatHerder-enabled project ↔ another CatHerder-enabled project
- diff lists for root `AGENTS.md`, `.instructions/`, and `.agents/`
- evaluating which side is newer, better, or more canonical
- suggesting what to sync A → B, what to sync B → A, and what should be merged manually or left alone

## Do Not Use This Skill For

- ordinary source-code sync outside CatHerder instruction surfaces
- whole-repository mirroring
- blindly copying operational state
- editing either repository unless the user explicitly asks for sync/apply work

## Default Scope

Unless the user says otherwise, compare only:
- root `AGENTS.md`
- `.instructions/`
- `.agents/`

## Procedure

1. Confirm repo A, repo B, and scope.
2. Inventory in-scope files on both sides.
3. Classify each file before deciding sync direction.
4. Compare content, file role, and reuse value — not just recency.
5. Produce per-item recommendations with rationale and cautions.
6. Stay in compare/report mode unless the user explicitly asks for edits.

## Read These References When Needed

- Use [Comparison model and safety rules](references/comparison-model-2026-03.md) for classification defaults, evaluation heuristics, and caution areas.
- Use [Reporting format](references/reporting-format-2026-03.md) for the standard compare/report output shape.

## Classification Rules

Use one of these classes before recommending sync:

- **canonical/shared** — usually safe candidates for propagation when the role is standardized
- **locally adaptable** — compare and learn from them, but do not assume one side should overwrite the other
- **local-only / operational** — do not blindly sync
- **unresolved / needs-human-decision** — compare cautiously; do not force a direction without explicit judgment

### Important Defaults

- Root `AGENTS.md` is usually a minimal bootstrap file. Prefer the cleaner bootstrap model over duplicated workflow guidance.
- `.instructions/project.instructions.md` is repository-specific entry guidance, so treat it as locally adaptable even when one side has reusable improvements.
- `.instructions/catherder.instructions.md` and `.instructions/catherder-git.instructions.md` are often canonical/shared candidates.
- `.instructions/SCRATCHPAD.md` is local operational memory. Do not blindly sync it.
- Active `.instructions/plans/**` content is local operational work by default. Compare only if the user explicitly wants process/template comparison.
- `.agents/agents/agents.yaml` is an unresolved operational/canonical case. Flag it as `needs canonical decision` unless the user explicitly accepts the ambiguity.

## Evaluation Heuristics

### Newer
Treat a version as newer only as supporting evidence, not the deciding factor. Consider:
- explicit timestamps
- commit history if available
- references to later-known standards or structures

### Better
A version is more likely better if it is:
- clearer for agents
- more aligned with current CatHerder standards
- less ambiguous
- more reusable across projects
- less contaminated by project-local assumptions

### Canonical vs Project-Specific
Ask:
- Does this content express a shared CatHerder standard?
- Or does it encode local structure, active working state, or runtime configuration?

Prefer upstreaming improvements that generalize cleanly. Prefer local retention for repo-specific operational content.

## Recommendation Categories

Use exactly one primary recommendation per item:

- `sync A → B`
- `sync B → A`
- `merge manually`
- `do not sync`
- `needs canonical decision`

## Required Output Shape

Produce results in this structure unless the user asks for something simpler:

### Scope Summary
- repo A
- repo B
- compared surfaces
- exclusions

### Inventory
For each item:
- path
- present in A/B
- classification
- short note

### Findings
For each meaningful difference:
- path
- difference summary
- why it matters
- likely status (`canonical improvement`, `local customization`, `operational/local-only`, `unresolved ambiguity`)

### Recommendation
For each item:
- recommendation
- confidence (`high` / `medium` / `low`)
- rationale
- cautions

### Directional Summary
Group final suggestions into:
- sync A → B
- sync B → A
- merge manually
- do not sync
- needs canonical decision

## Safety Rules

- Default mode is compare/report only.
- Do not edit either repository unless the user explicitly asks for sync/apply work.
- Do not treat every difference as a sync candidate.
- If confidence is low, prefer `merge manually` or `needs canonical decision`.
- Explicitly call out risky or unresolved items instead of guessing.

## Quick Response Template

```md
## Scope Summary
- Repo A: ...
- Repo B: ...
- Scope: `AGENTS.md`, `.instructions/`, `.agents/`
- Exclusions: ...

## Inventory
| Path | In A | In B | Classification | Note |
|---|---|---|---|---|

## Findings
### `<path>`
- Difference: ...
- Why it matters: ...
- Likely status: ...
- Recommendation: ...
- Confidence: ...
- Cautions: ...

## Directional Summary
- **Sync A → B:** ...
- **Sync B → A:** ...
- **Merge manually:** ...
- **Do not sync:** ...
- **Needs canonical decision:** ...
```

## References

- [Comparison model and safety rules](references/comparison-model-2026-03.md)
- [Reporting format](references/reporting-format-2026-03.md)
