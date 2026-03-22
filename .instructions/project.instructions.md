---
type: project
description: "MarkdownEditorsSample.Blazor project specifics (purpose, layout, development workflow, and commands)"
alwaysApply: true
---
# MarkdownEditorsSample.Blazor — Project Instructions

`tmp-blazor-markdowneditorssample` is a Blazor sandbox project for testing and comparing multiple markdown editors in a single application.

This project is **CatHerder-enabled** and follows CatHerder process with files and documents in the `.instructions/` directory. Read this file first for repository-specific guidance, then follow the files it references.

## Architecture Snapshot
- Runtime: .NET / C#
- Frontend: ASP.NET Blazor
- UI/component integrations: multiple markdown editor wrappers, including component-based and JavaScript-interop-based integrations
- Configuration: `appsettings.json` and `appsettings.Development.json`

## Development Conventions
- Plans define intent; tasks execute intent.
- Prefer understanding current editor integration behavior before changing wrappers or synchronization logic.
- Keep editor experiments isolated and reversible where practical.
- Command execution expectation: exit code `0` indicates success even when output is minimal or empty; investigate only on explicit errors, non-zero exit codes, or user-reported failure.

## Testing / Validation Strategy
- Default: build and local manual verification of affected editor pages or file-browser flows.
- Prefer focused verification around initialization, content synchronization, JS interop behavior, and disposal.
- Use the project's local `data/` scope for deterministic testing when file-browser behavior is involved.

## Building and Running
From the repository root:
- Build application: `dotnet build src/MarkdownEditorsSample.Blazor/MarkdownEditorsSample.Blazor.csproj`
- Run application: `dotnet run --project src/MarkdownEditorsSample.Blazor/MarkdownEditorsSample.Blazor.csproj`

## Layout (key locations)
- `src/MarkdownEditorsSample.Blazor/` — application source
- `Blazor-MarkdownEditorsSample.slnx` — solution entry
- `README.md` — project overview and editor-integration notes
- `.instructions/` — CatHerder planning and workflow instructions
- `.agents/` — local agent/runtime assets if added later

## Project-specific technical concerns
- Initial content load and reload synchronization between editor instances and Blazor state
- Avoiding content update loops between JavaScript callbacks and C# state updates
- Correct script and stylesheet loading order for editor packages
- Proper disposal of editor instances when components unmount
- Keeping file-browser operations scoped to the local project data area
