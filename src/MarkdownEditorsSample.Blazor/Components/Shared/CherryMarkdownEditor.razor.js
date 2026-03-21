function waitForCherry(maxWaitMs = 4000) {
    const started = Date.now();

    return new Promise((resolve, reject) => {
        function check() {
            if (window.Cherry) {
                resolve(window.Cherry);
                return;
            }

            if (Date.now() - started > maxWaitMs) {
                reject(new Error("Cherry markdown script was not loaded in time."));
                return;
            }

            setTimeout(check, 25);
        }

        check();
    });
}

export async function initCherryEditor(element, elementId, dotNetRef, markdown, heightPx) {
    if (!element) {
        return;
    }

    const Cherry = await waitForCherry();

    const config = {
        id: elementId,
        value: markdown ?? "",
        editor: {
            id: `${elementId}_txtarea`,
            name: `${elementId}_txtarea_name`
        },
        previewer: {
            enablePreviewerBubble: false
        },
        toolbars: {
            theme: "light",
            toolbar: [
                "bold",
                "italic",
                "strikethrough",
                "|",
                "header",
                "quote",
                "code",
                "table",
                "link",
                "image",
                "|",
                "ol",
                "ul",
                "checklist",
                "|",
                "togglePreview",
                "fullScreen"
            ],
            toolbarRight: []
        }
    };

    element.style.minHeight = `${heightPx}px`;

    const editor = new Cherry(config);
    element.__cherryEditor = editor;

    const onChange = ({ markdown: changedMarkdown }) => {
        void dotNetRef.invokeMethodAsync("OnEditorChanged", changedMarkdown ?? "");
    };

    editor.onChange(onChange);
    element.__cherryChangeHandler = onChange;
}

export function setCherryMarkdown(element, markdown) {
    const editor = element?.__cherryEditor;
    if (!editor) {
        return;
    }

    editor.setValue(markdown ?? "", true);
}

export function disposeCherryEditor(element) {
    if (!element) {
        return;
    }

    const editor = element.__cherryEditor;
    if (!editor) {
        return;
    }

    try {
        editor.destroy?.();
    } catch {
        // Cherry can throw during navigation teardown; swallow to keep Blazor circuit alive.
    }

    delete element.__cherryChangeHandler;
    delete element.__cherryEditor;
}
