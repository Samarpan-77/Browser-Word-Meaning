// background.js

// Polyfill for browser compatibility
const browser = globalThis.browser || globalThis.chrome;

const MERRIAM_WEBSTER_API_KEY = "API-KEY"; // Replace with your actual API key
const MW_API_URL_BASE = 'https://www.dictionaryapi.com/api/v3/references/sd3/json/';

browser.runtime.onStartup.addListener(() => {});
browser.runtime.onInstalled.addListener(() => {});

// Listen for messages from the content script
browser.runtime.onMessage.addListener(async (request, sender) => {
  if (request.action === "getDefinition") {
    const word = request.word;
    const url = `${MW_API_URL_BASE}${encodeURIComponent(word)}?key=${MERRIAM_WEBSTER_API_KEY}`;
    let definition = "Definition not found for this word.";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          definition = "No definition found.";
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          if (typeof data[0] === 'string') {
            definition = `Did you mean: ${data.slice(0, 5).join(', ')}?`;
          } else if (typeof data[0] === 'object' && data[0] !== null) {
            const entry = data[0];
            if (entry.shortdef && Array.isArray(entry.shortdef) && entry.shortdef.length > 0) {
              definition = entry.shortdef[0];
            }
          }
        }
      }
    } catch (error) {
      console.error("Error fetching definition:", error);
      definition = "Error fetching definition. Please check your API key or network.";
    }

    if (sender.tab && sender.tab.id) {
      browser.tabs.sendMessage(sender.tab.id, {
        action: "displayDefinition",
        definition
      });
    }
    return true;
  }
});