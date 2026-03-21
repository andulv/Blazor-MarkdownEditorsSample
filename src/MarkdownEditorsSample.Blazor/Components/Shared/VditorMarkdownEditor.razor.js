function waitForVditor(maxWaitMs = 4000) {
    const started = Date.now();

    return new Promise((resolve, reject) => {
        function check() {
            if (window.Vditor) {
                resolve(window.Vditor);
                return;
            }

            if (Date.now() - started > maxWaitMs) {
                reject(new Error("Vditor script was not loaded in time."));
                return;
            }

            setTimeout(check, 25);
        }

        check();
    });
}

export async function initVditor(element, elementId, dotNetRef, markdown, heightPx) {
    if (!element) {
        return;
    }

    const Vditor = await waitForVditor();

    const host = document.createElement("div");
    host.id = elementId;
    element.replaceChildren(host);

    const editor = new Vditor(elementId, {
        lang: "en_US",
        mode: "wysiwyg",
        height: heightPx,
        // Some Vditor builds call this unguarded; keep default toolbar by returning input.
        customWysiwygToolbar: (toolbarElements) => toolbarElements,
        cache: {
            enable: false
        },
        value: markdown ?? "",
        after: () => {
            editor.setValue(markdown ?? "");
        },
        input: (value) => {
            void dotNetRef.invokeMethodAsync("OnEditorChanged", value ?? "");
        }
    });

    element.__vditorEditor = editor;
}

export function setVditorMarkdown(element, markdown) {
    const editor = element?.__vditorEditor;
    if (!editor) {
        return;
    }

    editor.setValue(markdown ?? "");
}

export function disposeVditor(element) {
    const editor = element?.__vditorEditor;
    if (!editor) {
        return;
    }

    try {
        editor.destroy?.();
    } catch {
        // Ignore teardown errors during navigation.
    }

    delete element.__vditorEditor;
}
