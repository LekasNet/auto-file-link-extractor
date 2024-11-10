# Auto File Link Extractor

Auto File Link Extractor is a plugin for Obsidian that allows users to quickly insert links to files in their vault into selected text using a customizable hotkey. This can be particularly useful for building connections between notes, quickly referencing files, and improving navigation within your notes.

## Features

- Insert links to files within your Obsidian vault into selected text with a single hotkey.
- Customizable hotkey (default: `Ctrl+Shift+L`).
- Modal with a list of files grouped by directory.
- Collapsible sections for directories to keep the list organized.
- State persistence for expanded or collapsed directories between modal openings.

## Installation

### Manual Installation

1. Download the `main.js` and `manifest.json` files from the repository.
2. Place these files into a folder named `auto-file-link-extractor` within your Obsidian plugins directory:
   - On most systems, this can be found at `.obsidian/plugins/auto-file-link-extractor`.
3. Restart Obsidian (or refresh the plugins).
4. Enable the plugin in the **Community Plugins** section of Obsidian’s settings.

### Community Plugin Installation (Recommended)

Once the plugin is accepted into the community plugin list:

1. Open Obsidian and go to **Settings** → **Community Plugins**.
2. Click on **Browse** and search for **Auto File Link Extractor**.
3. Click **Install** and then **Enable**.

## Usage

1. Highlight the text where you want to insert a link.
2. Press the default hotkey (`Ctrl+Shift+L`) or your customized hotkey to open the file picker.
3. Browse through the list of files, which are grouped by directory.
4. Click on the desired file to insert a link to it in the format `[[fileName|selectedText]]` if text is highlighted, or `[[fileName]]` if no text is selected.
5. Directories can be expanded and collapsed, and their state is remembered between usages.

## Customization

You can customize the hotkey by going to **Settings** → **Hotkeys** and searching for **Insert link to file**. Assign a new hotkey if desired.

## Known Limitations

- **Currently, the plugin is guaranteed to work only within regular Markdown files.** Files created with other plugins, such as Kanban, may not function correctly. I am actively working on resolving this issue. If you encounter any compatibility issues, please notify me in the comments section of the plugin's release page.

## Contributing

Contributions are welcome! If you find any bugs, have feature requests, or would like to improve the plugin, please feel free to open an issue or submit a pull request.

## License

This plugin is open-source and available under the [MIT License](./LICENSE).

---

Thank you for using **Auto File Link Extractor**! If you enjoy using this plugin, consider giving it a star on [GitHub](https://github.com/LekasNet/auto-file-link-extractor.git).
