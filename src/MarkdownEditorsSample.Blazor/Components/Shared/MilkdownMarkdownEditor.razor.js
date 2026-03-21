let milkdownLoad = null;

async function ensureMilkdown() {
    if (milkdownLoad) return milkdownLoad;

    milkdownLoad = (async () => {
        const [core, commonmarkPkg, listenerPkg, utilsPkg] = await Promise.all([
            import('https://esm.sh/@milkdown/core@7'),
            import('https://esm.sh/@milkdown/preset-commonmark@7'),
            import('https://esm.sh/@milkdown/plugin-listener@7'),
            import('https://esm.sh/@milkdown/utils@7'),
        ]);

        return {
            Editor: core.Editor,
            rootCtx: core.rootCtx,
            defaultValueCtx: core.defaultValueCtx,
            commonmark: commonmarkPkg.commonmark,
            listener: listenerPkg.listener,
            listenerCtx: listenerPkg.listenerCtx,
            replaceAll: utilsPkg.replaceAll,
        };
    })().catch((e) => {
        milkdownLoad = null;
        throw e;
    });

    return milkdownLoad;
}

export async function initMilkdown(element, dotNetRef, markdown, heightPx) {
    if (!element) return;

    element.style.minHeight = `${heightPx}px`;

    const { Editor, rootCtx, defaultValueCtx, commonmark, listener, listenerCtx } = await ensureMilkdown();

    const editor = await Editor.make()
        .config((ctx) => {
            ctx.set(rootCtx, element);
            ctx.set(defaultValueCtx, markdown ?? '');
            ctx.get(listenerCtx).markdownUpdated((_ctx, md) => {
                if (element.__milkdownIgnore) return;
                void dotNetRef.invokeMethodAsync('OnEditorChanged', md ?? '');
            });
        })
        .use(listener)
        .use(commonmark)
        .create();

    element.__milkdownEditor = editor;
}

export async function setMilkdownMarkdown(element, markdown) {
    const editor = element?.__milkdownEditor;
    if (!editor) return;

    const { replaceAll } = await ensureMilkdown();

    element.__milkdownIgnore = true;
    try {
        editor.action(replaceAll(markdown ?? ''));
    } finally {
        element.__milkdownIgnore = false;
    }
}

export function disposeMilkdown(element) {
    const editor = element?.__milkdownEditor;
    if (!editor) return;

    try {
        editor.destroy?.();
    } catch {
        // Ignore teardown errors.
    }

    delete element.__milkdownEditor;
}
