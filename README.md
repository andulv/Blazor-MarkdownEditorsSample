# MarkdownEditorsSample.Blazor

MarkdownEditorsSample.Blazor is a sandbox project for testing and comparing multiple markdown editors in a Blazor application.

## Purpose

This project exists to evaluate editor behavior, ergonomics, and integration complexity in one place.

It includes:
- Multiple editor test pages (MudMarkdown, Cherry, Toast UI, Vditor, Milkdown, Tiptap)
- A shared file browser component used across all test pages
- A local `data/` directory with sample markdown, yaml/yml, json, xml, and text files

## File Browser Scope

The file browser root is configured to this project's local `data/` folder.

That makes testing deterministic and isolated from other repositories or apps.

Configuration:
- `appsettings.json` -> `FileBrowser:RootPath = "data"`
- Fallback behavior in `Services/FileBrowserService.cs` also points to `data/`

## Blazor Integration Notes

Each editor is wrapped in a Blazor component and integrated via one of these patterns:
- Native Blazor component usage when available
- JavaScript interop wrapper (`.razor.js`) for browser-first editors

Common integration concerns:
- Initial content load and re-load synchronization
- Avoiding content update loops between JS and C# state
- Correct script and stylesheet loading order in `Components/App.razor`
- Proper disposal of editor instances on component unmount

## How To Run

From repository root:

```bash
dotnet build src/MarkdownEditorsSample.Blazor/MarkdownEditorsSample.Blazor.csproj
dotnet run --project src/MarkdownEditorsSample.Blazor/MarkdownEditorsSample.Blazor.csproj
```

Then open the app and navigate to the editor test pages.

## AI Disclaimer
100% Vibe coded with GitHub Copilot, mostly Claude Opus 4.6