using System.IO;
using MudBlazor;

namespace MarkdownEditorsSample.Blazor.Services;

public sealed class FileBrowserService(IConfiguration configuration, IWebHostEnvironment hostEnvironment)
{
    private static readonly string[] DefaultExtensions = [".md", ".markdown", ".txt", ".text", ".yaml", ".yml", ".json", ".xml"];

    private readonly string _repoRoot = ResolveRepoRoot(configuration, hostEnvironment);

    public IReadOnlyCollection<ITreeItemData<string>> GetFileTree(IReadOnlyCollection<string>? allowedExtensions = null)
        => BuildTreeItems(_repoRoot, ".", NormalizeExtensions(allowedExtensions));

    public async Task<string?> ReadFileAsync(string relativePath)
    {
        var absolutePath = ResolveAndValidatePath(relativePath);

        if (Directory.Exists(absolutePath))
            return null;

        return await File.ReadAllTextAsync(absolutePath);
    }

    private string ResolveAndValidatePath(string relativePath)
    {
        var normalizedRelativePath = relativePath.Replace('/', Path.DirectorySeparatorChar);
        var absolutePath = Path.GetFullPath(Path.Combine(_repoRoot, normalizedRelativePath));

        if (!absolutePath.StartsWith(_repoRoot, StringComparison.Ordinal))
            throw new InvalidOperationException("Only files under the configured repository root can be opened.");

        return absolutePath;
    }

    private static IReadOnlyCollection<string> NormalizeExtensions(IReadOnlyCollection<string>? allowedExtensions)
    {
        var source = allowedExtensions is { Count: > 0 } ? allowedExtensions : DefaultExtensions;

        return source
            .Select(e => e.StartsWith('.') ? e : $".{e}")
            .Select(e => e.ToLowerInvariant())
            .Distinct(StringComparer.Ordinal)
            .ToArray();
    }

    private static string ResolveRepoRoot(IConfiguration configuration, IWebHostEnvironment hostEnvironment)
    {
        var configured = configuration["FileBrowser:RootPath"];
        if (!string.IsNullOrWhiteSpace(configured))
        {
            return Path.IsPathRooted(configured)
                ? Path.GetFullPath(configured)
                : Path.GetFullPath(Path.Combine(hostEnvironment.ContentRootPath, configured));
        }

        return Path.GetFullPath(Path.Combine(hostEnvironment.ContentRootPath, "data"));
    }

    private static IReadOnlyCollection<ITreeItemData<string>> BuildTreeItems(string absolutePath, string relativeRoot, IReadOnlyCollection<string> allowedExtensions)
    {
        var root = new DirectoryInfo(absolutePath);
        if (!root.Exists)
            return Array.Empty<MarkdownTestTreeItemData<string>>();

        var visibleChildren = root
            .GetFileSystemInfos()
            .Where(i => i.Name is not ".gitkeep")
            .Where(i => IsVisible(i, allowedExtensions))
            .OrderBy(i => i is FileInfo)
            .ThenBy(i => i.Name, StringComparer.OrdinalIgnoreCase)
            .Select(i => ToTreeItem(i, relativeRoot, allowedExtensions))
            .Where(i => i is not null)
            .Cast<MarkdownTestTreeItemData<string>>()
            .ToArray();

        return visibleChildren;
    }

    private static bool IsVisible(FileSystemInfo info, IReadOnlyCollection<string> allowedExtensions)
    {
        if (info is DirectoryInfo directoryInfo)
        {
            return directoryInfo
                .GetFileSystemInfos()
                .Any(child => child.Name is not ".gitkeep" && IsVisible(child, allowedExtensions));
        }

        var extension = Path.GetExtension(info.Name).ToLowerInvariant();
        return allowedExtensions.Contains(extension);
    }

    private static MarkdownTestTreeItemData<string>? ToTreeItem(FileSystemInfo info, string relativeRoot, IReadOnlyCollection<string> allowedExtensions)
    {
        var relativePath = Path.Combine(relativeRoot, info.Name).Replace('\\', '/');

        if (info is DirectoryInfo directoryInfo)
        {
            var children = directoryInfo
                .GetFileSystemInfos()
                .Where(i => i.Name is not ".gitkeep")
                .Where(i => IsVisible(i, allowedExtensions))
                .OrderBy(i => i is FileInfo)
                .ThenBy(i => i.Name, StringComparer.OrdinalIgnoreCase)
                .Select(i => ToTreeItem(i, Path.Combine(relativeRoot, directoryInfo.Name), allowedExtensions))
                .Where(i => i is not null)
                .Cast<ITreeItemData<string>>()
                .ToArray();

            if (children.Length == 0)
                return null;

            return new MarkdownTestTreeItemData<string>
            {
                Value = relativePath,
                Text = info.Name,
                Icon = Icons.Material.Filled.Folder,
                Expanded = false,
                Children = children
            };
        }

        return new MarkdownTestTreeItemData<string>
        {
            Value = relativePath,
            Text = info.Name,
            Icon = Icons.Material.Filled.Description
        };
    }
}
