let tiptapLoad = null;

async function ensureTiptap() {
    if (tiptapLoad) return tiptapLoad;

    tiptapLoad = (async () => {
        const [core, starterPkg, mdPkg] = await Promise.all([
            import('https://esm.sh/@tiptap/core@2'),
            import('https://esm.sh/@tiptap/starter-kit@2'),
            import('https://esm.sh/tiptap-markdown@0.8'),
        ]);

        return {
            Editor: core.Editor,
            StarterKit: starterPkg.default,
            Markdown: mdPkg.Markdown,
        };
    })().catch((e) => {
        tiptapLoad = null;
        throw e;
    });

    return tiptapLoad;
}

export async function initTiptap(element, dotNetRef, markdown, heightPx) {
    if (!element) return;

    const { Editor, StarterKit, Markdown } = await ensureTiptap();

    const editor = new Editor({
        element,
        extensions: [
            StarterKit,
            Markdown.configure({
                html: false,
                transformCopiedText: true,
            }),
        ],
        content: markdown ?? '',
        onUpdate: ({ editor }) => {
            const md = editor.storage.markdown.getMarkdown();
            void dotNetRef.invokeMethodAsync('OnEditorChanged', md ?? '');
        },
    });

    element.__tiptapEditor = editor;
}

export async function setTiptapMarkdown(element, markdown) {
    const editor = element?.__tiptapEditor;
    if (!editor) return;

    // Pass false as emitUpdate to suppress onUpdate callback.
    editor.commands.setContent(markdown ?? '', false);
}

export function disposeTiptap(element) {
    const editor = element?.__tiptapEditor;
    if (!editor) return;

    try {
        editor.destroy?.();
    } catch {
        // Ignore teardown errors.
    }

    delete element.__tiptapEditor;
}
