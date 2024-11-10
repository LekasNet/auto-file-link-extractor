const { Plugin, Modal, MarkdownView } = require('obsidian');

class MyPlugin extends Plugin {
    async onload() {
        // Register a command
        this.addCommand({
            id: 'open-file-picker',
            name: 'Insert link to file',
            callback: () => this.openFilePicker(),
            hotkeys: [{ modifiers: ["Ctrl", "Shift"], key: "L" }],
        });

        // Load settings if needed
        await this.loadSettings();
    }

    onunload() {
        console.log('Plugin unloaded');
    }

    async loadSettings() {
        this.settings = Object.assign({}, this.defaultSettings, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    openFilePicker() {
        const files = this.app.vault.getFiles();
        const filesByPath = this.groupFilesByPath(files);

        // Create a modal with a list of files
        new FilePickerModal(this.app, filesByPath, (selectedFile) => {
            this.insertLink(selectedFile);
        }).open();
    }

    insertLink(fileName) {
        const activeLeaf = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!activeLeaf) {
            new Notice('No active markdown editor found.');
            return;
        }

        const editor = activeLeaf.editor;
        const selectedText = editor.getSelection();
        const link = selectedText
            ? `[[${fileName}|${selectedText}]]`
            : `[[${fileName}]]`; // If no text is selected, insert a simple link

        editor.replaceSelection(link);
    }

    groupFilesByPath(files) {
        const grouped = {};
        files.forEach(file => {
            const pathParts = file.path.split('/');
            const fileName = pathParts.pop();
            const dirPath = pathParts.join('/');
            if (!grouped[dirPath]) {
                grouped[dirPath] = [];
            }
            grouped[dirPath].push(fileName);
        });
        return grouped;
    }
}

// Modal for selecting a file
class FilePickerModal extends Modal {
    constructor(app, filesByPath, onChoose) {
        super(app);
        this.filesByPath = filesByPath;
        this.onChoose = onChoose;
        this.collapsedStateKey = 'file-picker-collapsed-state'; // Key for localStorage
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl('h2', { text: 'Select a file' });

        const collapsedState = JSON.parse(localStorage.getItem(this.collapsedStateKey)) || {};

        for (const [path, files] of Object.entries(this.filesByPath)) {
            // Create a collapsible section for each path
            const collapsible = contentEl.createEl('details', { cls: 'file-section' });
            if (collapsedState[path]) {
                collapsible.setAttribute('open', 'true');
            }
            const summary = collapsible.createEl('summary', { text: path });
            summary.style.cursor = 'pointer';

            const divider = collapsible.createEl('hr');
            divider.style.margin = '0.5em 0';

            const list = collapsible.createEl('ul');
            files.forEach(fileName => {
                const listItem = list.createEl('li');
                const link = listItem.createEl('a', { href: '#', text: fileName, cls: 'file-link' });

                // Add click event
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.onChoose(fileName);
                    this.close();
                });
            });
            contentEl.appendChild(collapsible);

            // Save the collapsed state when toggled
            collapsible.addEventListener('toggle', () => {
                collapsedState[path] = collapsible.open;
                localStorage.setItem(this.collapsedStateKey, JSON.stringify(collapsedState));
            });
        }
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

module.exports = MyPlugin;
