/**
 * Content Script (Manifest V3)
 * Mendeteksi seleksi teks hukum pada halaman eksternal
 */

document.addEventListener('mouseup', () => {
  const selection = window.getSelection().toString().trim();
  if (selection.length > 3 && selection.length < 500) {
    try {
      chrome.storage.local.set({ lastSelection: selection, lastQuery: selection });
    } catch {
      // Ignore if extension context is reloaded
    }
  }
});
