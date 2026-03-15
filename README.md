# Word Definition Browser Extension

A browser extension that lets users highlight a single word on any webpage and instantly view its dictionary definition in a tooltip, enhancing reading and comprehension without leaving the page.

## Features

- **Instant Definitions**: Highlight a single word to see its definition in a tooltip.
- **Merriam-Webster Integration**: Uses the Merriam-Webster Dictionary API for reliable definitions and suggestions.
- **Non-Intrusive**: Tooltip auto-dismisses after a few seconds or on click.
- **Cross-Site Compatibility**: Works on all websites.

## Installation

### Chrome / Chromium
1. Download or clone this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the folder containing the extension files.
5. The extension should now be installed and visible in your extensions list.

### For Firefox
1. Download or clone this repository.
2. Open Firefox and navigate to `about:debugging`.
3. Click "This Firefox" in the left sidebar.
4. Click "Load Temporary Add-on" and select the `Manifest.json` file from the extension folder.
5. The extension will be temporarily installed.

## Setup

### API Key Configuration
This extension uses the Merriam-Webster Dictionary API. To set up your API key:

1. Obtain an API key from [Merriam-Webster Developer Center](https://dictionaryapi.com/).
2. Open `background.js` and replace the placeholder key:
   ```
   const MERRIAM_WEBSTER_API_KEY = "your_api_key_here";
   ```

**Note**: Since this is a client-side browser extension, the API key will be visible in the extension's code. Keep this in mind for security considerations.

## Usage

1. Install the extension as described above.
2. Navigate to any webpage.
3. Highlight (select) a single word by double-clicking or dragging your mouse over it.
4. A tooltip will appear showing the word's definition or suggestions.
5. Click the tooltip to dismiss it, or wait a few seconds for it to auto-close.

## Development

### Prerequisites
- Basic knowledge of JavaScript and browser extension development.
- A text editor or IDE (e.g., VS Code).

### File Structure
```
WordDefinitionExtension/
|-- background.js          # Service worker for API calls
|-- content.js             # Content script for tooltip injection
|-- Manifest.json          # Extension manifest
|-- .env                   # Environment variables (optional)
|-- .gitignore             # Git ignore file
|-- icons/                 # Extension icons
|   `-- icon128.png
`-- README.md              # This file
```

### Building and Testing
1. Make changes to the source files.
2. Reload the extension in your browser's extension manager.
3. Test the functionality on various websites.

## API Reference

This extension uses the Merriam-Webster Dictionary API:
- Base URL: `https://www.dictionaryapi.com/api/v3/references/sd3/json/`
- Documentation: [Merriam-Webster API Docs](https://dictionaryapi.com/)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This extension is not affiliated with Merriam-Webster. Please refer to Merriam-Webster's terms of service for API usage guidelines.

## Support

If you encounter any issues or have questions:
- Ensure your API key is correctly configured.
- Verify that the extension has the necessary permissions.

---

**Version**: 1.0.0
**Last Updated**: March 15, 2026
