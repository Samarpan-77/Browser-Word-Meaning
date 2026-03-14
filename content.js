// content.js

// Polyfill for browser compatibility
window.browser = (function () {
  return window.browser || window.chrome;
})();

let debounceTimeout = null;

// Function to get the selected text
function getSelectedText() {
  return window.getSelection().toString().trim();
}

// Event listener for mouseup event
document.addEventListener('mouseup', () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const selectedText = getSelectedText();
    if (selectedText.length > 0 && selectedText.split(/\s+/).length === 1) {
      // Send the selected text to the background script
      if (browser.runtime) {
        browser.runtime.sendMessage({
          action: "getDefinition",
          word: selectedText
        }).catch(err => {
          console.error("Error sending message to background script:", err.message);
        });
      }
    }
  }, 200);
});

// Listener for messages from the background script
browser.runtime.onMessage.addListener((request) => {
  if (request.action === "displayDefinition") {
    displayDefinitionTooltip(request.definition);
  }
});

// Function to display the definition in a tooltip
function displayDefinitionTooltip(definition) {
  // Remove any existing tooltips to avoid multiple tooltips
  const existingTooltip = document.getElementById('wordDefinitionTooltip');
  if (existingTooltip) existingTooltip.remove();

  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const tooltip = document.createElement('div');
  tooltip.id = 'wordDefinitionTooltip';
  tooltip.style.cssText = `
    position: absolute;
    top: ${window.scrollY + rect.bottom + 8}px;
    left: ${window.scrollX + rect.left}px;
    background: #222;
    color: #fff;
    padding: 10px 14px;
    border-radius: 6px;
    font-size: 15px;
    z-index: 2147483647;
    max-width: 350px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
    cursor: pointer;
    word-break: break-word;
  `;
  tooltip.textContent = definition || "Definition not found.";

  document.body.appendChild(tooltip);

  // Dismiss the tooltip when clicked
  tooltip.addEventListener('click', () => tooltip.remove());
  // Optionally, dismiss after a few seconds
  setTimeout(() => { if (tooltip.parentNode) tooltip.remove(); }, 5000);
}