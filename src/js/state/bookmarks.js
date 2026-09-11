/**
 * Bookmarks & Workspace State Manager
 * Menyimpan dokumen favorit, catatan anotasi, dan riwayat penelusuran.
 */

const BOOKMARKS_KEY = 'lex_bookmarks';
const NOTES_KEY = 'lex_workspace_notes';

class WorkspaceManager {
  constructor() {
    this.bookmarks = this.loadBookmarks();
    this.notes = this.loadNotes();
    this.listeners = new Set();
  }

  loadBookmarks() {
    try {
      const data = localStorage.getItem(BOOKMARKS_KEY);
      return data ? JSON.parse(data) : ['doc-uu-27-2022', 'doc-uu-6-2023'];
    } catch {
      return ['doc-uu-27-2022'];
    }
  }

  loadNotes() {
    try {
      const data = localStorage.getItem(NOTES_KEY);
      return data ? JSON.parse(data) : {
        'doc-uu-27-2022': 'Catatan Tim: Evaluasi penunjukan DPO internal sebelum audit Q4 sesuai Pasal 53.'
      };
    } catch {
      return {};
    }
  }

  isBookmarked(docId) {
    return this.bookmarks.includes(docId);
  }

  toggleBookmark(docId) {
    if (this.isBookmarked(docId)) {
      this.bookmarks = this.bookmarks.filter(id => id !== docId);
    } else {
      this.bookmarks.push(docId);
    }
    this.saveBookmarks();
    this.notify();
    return this.isBookmarked(docId);
  }

  saveBookmarks() {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(this.bookmarks));
  }

  getNote(docId) {
    return this.notes[docId] || '';
  }

  saveNote(docId, noteText) {
    if (!noteText.trim()) {
      delete this.notes[docId];
    } else {
      this.notes[docId] = noteText.trim();
    }
    localStorage.setItem(NOTES_KEY, JSON.stringify(this.notes));
    this.notify();
  }

  getAllBookmarks() {
    return [...this.bookmarks];
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback({ bookmarks: this.bookmarks, notes: this.notes });
    return () => this.listeners.delete(callback);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener({ bookmarks: this.bookmarks, notes: this.notes });
      } catch (err) {
        console.error('Workspace listener error:', err);
      }
    }
  }
}

export const workspaceState = new WorkspaceManager();
