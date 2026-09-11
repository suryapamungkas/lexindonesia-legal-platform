/**
 * Service Worker (Manifest V3)
 * LexIndonesia Legal Assistant Extension
 */

chrome.runtime.onInstalled.addListener(() => {
  // Buat context menu item untuk pencarian hukum instan
  chrome.contextMenus.create({
    id: 'lex-search-selection',
    title: 'Cari di LexIndonesia: "%s"',
    contexts: ['selection']
  });

  // Konfigurasi side panel behavior jika didukung
  if (chrome.sidePanel && typeof chrome.sidePanel.setPanelBehavior === 'function') {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch(() => {});
  }
});

// Listener saat context menu diklik
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'lex-search-selection' && tab && tab.id) {
    const selectedText = (info.selectionText || '').trim();
    if (selectedText) {
      // Simpan query pencarian sementara
      await chrome.storage.local.set({ lastQuery: selectedText });
      // Buka side panel di window tab aktif
      if (chrome.sidePanel && typeof chrome.sidePanel.open === 'function') {
        try {
          await chrome.sidePanel.open({ windowId: tab.windowId });
        } catch (err) {
          console.log('Side panel open info:', err);
        }
      }
    }
  }
});

// Listener pesan runtime
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'OPEN_SIDE_PANEL' && sender.tab) {
    if (chrome.sidePanel && typeof chrome.sidePanel.open === 'function') {
      chrome.sidePanel.open({ windowId: sender.tab.windowId })
        .then(() => sendResponse({ success: true }))
        .catch(err => sendResponse({ success: false, error: err.message }));
      return true; // async response
    }
  }
  return false;
});
