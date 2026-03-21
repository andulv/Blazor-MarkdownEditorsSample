using MudBlazor;
using Microsoft.AspNetCore.Components;

namespace MarkdownEditorsSample.Blazor.Components.Shared;

public partial class RepositoryFileBrowser
{
    private IReadOnlyCollection<ITreeItemData<string>> _items = Array.Empty<ITreeItemData<string>>();

    [Parameter]
    public string? SelectedPath { get; set; }

    [Parameter]
    public EventCallback<string?> SelectedPathChanged { get; set; }

    [Parameter]
    public IReadOnlyCollection<string> AllowedExtensions { get; set; } = [".md", ".markdown", ".txt", ".text", ".yaml", ".yml", ".json", ".xml"];

    protected override void OnInitialized()
    {
        _items = FileBrowserService.GetFileTree(AllowedExtensions);
    }

    private async Task OnSelectedPathChanged(string? path)
    {
        await SelectedPathChanged.InvokeAsync(path);
    }
}
