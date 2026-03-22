---
description: "CatHerder git rules — instructions for use of git in CatHerder-enabled projects"
applyTo: "**"
---
# CatHerder Git Rules

Describes the rules for using git in CatHerder-enabled projects. All agents and humans working on a CatHerder-enabled project must follow these rules when executing plans/tasks and using git for version control.

## Plan and task execution

- Always create a dedicated branch when starting execution of a plan.
- Before creating a new branch, always create it from `main` unless explicitly specified otherwise.
- Before creating a new branch, check that the source branch is clean. If it is not, ask the user to clean it first. Refuse to execute the plan or start a new plan until the source branch is clean.
- Do not create the branch during drafting. Create it when you start execution.
- Each task is normally one commit. For plans with many tasks, you may batch related tasks into one commit.
- Do not execute tasks on `main` or any long-lived branch.

## Work outside plans and tasks
- When working outside plans and tasks, the user may request changes to files directly on `main`.
- You are allowed to do this when the user explicitly requests it, and only for smaller changes affecting one or two files. You should resist doing this for larger changes that span multiple files. In that case, ask the user to create a plan and execute the change as a task in that plan. Refuse to make larger changes directly on `main` without a plan.

## Branching

- Execute a plan on a dedicated branch.
- Create the branch when you start execution (not during drafting).

## Commits

- One commit per completed task.
- When you complete a task, also:
  - check the task checkbox in the plan
  - update the plan `**Updated:**` timestamp

## Merge / Approval

- Merges to `main` require explicit supervisor approval.
- Agents must not merge to `main` without approval.

## Commit Messages

- Start the subject with the task identifier when available (for example `task004-01: ...`).
