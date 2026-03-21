const ToastAssets = {
    codeMirrorCss: "https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.min.css",
    codeMirrorJs: "https://cdn.jsdelivr.net/npm/codemirror@5.65.16/lib/codemirror.min.js",
    toastCss: "https://cdn.jsdelivr.net/npm/@toast-ui/editor@2.5.3/dist/toastui-editor.min.css",
    toastJs: "https://cdn.jsdelivr.net/npm/@toast-ui/editor@2.5.3/dist/toastui-editor.min.js"
};

let toastLoadPromise = null;

function ensureStyle(href, id) {
    if (document.getElementById(id)) {
        return;
    }

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}

function loadScript(src, id) {
    return new Promise((resolve, reject) => {
        const existing = document.getElementById(id);
        if (existing) {
            if (existing.dataset.loaded === "true") {
                resolve();
                return;
            }

            existing.addEventListener("load", () => resolve(), { once: true });
            existing.addEventListener("error", () => reject(new Error(`Failed to load script: ${src}`)), { once: true });
            return;
        }

        const script = document.createElement("script");
        script.id = id;
        script.src = src;
        script.defer = true;
        script.onload = () => {
            script.dataset.loaded = "true";
            resolve();
        };
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

        document.head.appendChild(script);
    });
}

function waitForToast(maxWaitMs = 4000) {
    const started = Date.now();

    return new Promise((resolve, reject) => {
        function check() {
            if (window.toastui?.Editor) {
                resolve(window.toastui.Editor);
                return;
            }

            if (Date.now() - started > maxWaitMs) {
                reject(new Error("TOAST UI script was not loaded in time."));
                return;
            }

            setTimeout(check, 25);
        }

        check();
    });
}

async function ensureToastLoaded() {
    if (window.toastui?.Editor) {
        return window.toastui.Editor;
    }

    if (!toastLoadPromise) {
        ensureStyle(ToastAssets.codeMirrorCss, "cm-css");
        ensureStyle(ToastAssets.toastCss, "toast-css");

        toastLoadPromise = (async () => {
            await loadScript(ToastAssets.codeMirrorJs, "cm-js");
            await loadScript(ToastAssets.toastJs, "toast-js");
            return waitForToast();
        })().catch((error) => {
            toastLoadPromise = null;
            throw error;
        });
    }

    return toastLoadPromise;
}

export async function initToastEditor(element, elementId, dotNetRef, markdown, heightPx) {
    if (!element) {
        return;
    }

    const ToastEditor = await ensureToastLoaded();

    const editor = new ToastEditor({
        el: element,
        height: `${heightPx}px`,
        initialEditType: "wysiwyg",
        previewStyle: "vertical",
        usageStatistics: false,
        initialValue: markdown ?? ""
    });

    editor.on("change", () => {
        const nextMarkdown = editor.getMarkdown?.() ?? "";
        void dotNetRef.invokeMethodAsync("OnEditorChanged", nextMarkdown);
    });

    element.__toastEditor = editor;
    element.id = elementId;
}

export function setToastMarkdown(element, markdown) {
    const editor = element?.__toastEditor;
    if (!editor) {
        return;
    }

    editor.setMarkdown(markdown ?? "", false);
}

export function disposeToastEditor(element) {
    const editor = element?.__toastEditor;
    if (!editor) {
        return;
    }

    try {
        editor.destroy?.();
    } catch {
        // Ignore teardown errors during navigation.
    }

    delete element.__toastEditor;
}
