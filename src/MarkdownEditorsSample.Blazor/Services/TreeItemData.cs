#nullable disable
using MudBlazor;

namespace MarkdownEditorsSample.Blazor.Services;

public sealed class MarkdownTestTreeItemData<T> : ITreeItemData<T>
{
    public T Value { get; set; }
    public string Text { get; set; }
    public string Icon { get; set; }
    public bool Expanded { get; set; }
    public bool Expandable { get; set; }
    public bool Selected { get; set; }
    public bool Visible { get; set; } = true;
    public bool HasChildren => Expandable || Children.Count > 0;
    public IReadOnlyCollection<ITreeItemData<T>> Children { get; set; } = [];
}
