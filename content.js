// content.js

const browser = globalThis.browser || globalThis.chrome;

let debounceTimeout = null;

// Get selected text
function getSelectedText() {
  return window.getSelection().toString().trim();
}
document.addEventListener('mouseup', () => {
  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    const selectedText = getSelectedText();

    if (selectedText.length > 0 && selectedText.split(/\s+/).length === 1) {

      if (!browser?.runtime?.id || !browser?.runtime?.sendMessage) {
        return;
      }

      try {
        browser.runtime.sendMessage(
          {
            action: "getDefinition",
            word: selectedText
          },
          () => {
            if (browser.runtime.lastError) {
              console.warn("Message failed:", browser.runtime.lastError.message);
            }
          }
        );
      } catch (err) {
        console.warn("Message send failed:", err);
      }

    }
  }, 200);
});
browser.runtime.onMessage.addListener((request) => {
  if (request.action === "displayDefinition") {
    displayDefinitionTooltip(request.definition);
  }
});

// Tooltip
function displayDefinitionTooltip(definition) {
  const existingTooltip = document.getElementById("wordDefinitionTooltip");
  if (existingTooltip) existingTooltip.remove();

  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  const tooltip = document.createElement("div");
  tooltip.id = "wordDefinitionTooltip";

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

  tooltip.addEventListener("click", () => tooltip.remove());

  setTimeout(() => {
    if (tooltip.parentNode) tooltip.remove();
  }, 5000);
}
