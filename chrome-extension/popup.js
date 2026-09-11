/**
 * Popup Script
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('popup-search-input');
  const openSidePanelBtn = document.getElementById('btn-open-sidepanel');
  const openWebPlatformBtn = document.getElementById('btn-open-web-platform');

  // Trigger pencarian saat tekan Enter
  if (searchInput) {
    searchInput.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          await chrome.storage.local.set({ lastQuery: query });
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tab && chrome.sidePanel && typeof chrome.sidePanel.open === 'function') {
            await chrome.sidePanel.open({ windowId: tab.windowId });
            window.close();
          }
        }
      }
    });
  }

  // Buka side panel
  if (openSidePanelBtn) {
    openSidePanelBtn.addEventListener('click', async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && chrome.sidePanel && typeof chrome.sidePanel.open === 'function') {
        try {
          await chrome.sidePanel.open({ windowId: tab.windowId });
          window.close();
        } catch (err) {
          console.error('Failed to open side panel:', err);
        }
      }
    });
  }

  // Buka platform web lokal
  if (openWebPlatformBtn) {
    openWebPlatformBtn.addEventListener('click', () => {
      chrome.tabs.create({ url: 'http://localhost:3000' });
      window.close();
    });
  }
});
