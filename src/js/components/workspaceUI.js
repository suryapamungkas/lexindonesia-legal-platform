/**
 * My Workspace Drawer Component
 * Mengelola antarmuka ruang kerja riset:
 * - Daftar bookmark peraturan & putusan
 * - Editor catatan anotasi hukum
 * - Ekspor rangkuman riset
 * - Integrasi status Chrome Extension
 */

import { LEGAL_DOCUMENTS } from '../data/legalDatabase.js';
import { workspaceState } from '../state/bookmarks.js';
import { rbacState } from '../state/rbac.js';
import { escapeHTML } from '../utils/helpers.js';

export class WorkspaceUI {
  constructor(options = {}) {
    this.drawer = document.getElementById('workspace-drawer');
    this.listContainer = document.getElementById('workspace-items-list');
    this.badgeCount = document.getElementById('workspace-badge-count');
    this.onViewDocument = options.onViewDocument || (() => {});

    this.init();
  }

  init() {
    this.bindEvents();

    workspaceState.subscribe(({ bookmarks, notes }) => {
      this.render(bookmarks, notes);
    });
  }

  bindEvents() {
    // Open drawer buttons
    document.querySelectorAll('[data-action="open-workspace"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.drawer && typeof this.drawer.showModal === 'function') {
          this.drawer.showModal();
        }
      });
    });

    // Close drawer buttons
    if (this.drawer) {
      this.drawer.querySelectorAll('[data-action="close-drawer"]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.drawer.close();
        });
      });
    }

    // Export research summary
    const exportBtn = document.getElementById('btn-export-workspace');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        this.exportResearchSummary();
      });
    }
  }

  render(bookmarks, notes) {
    if (this.badgeCount) {
      this.badgeCount.textContent = bookmarks.length;
      this.badgeCount.style.display = bookmarks.length > 0 ? 'inline-flex' : 'none';
    }

    if (!this.listContainer) return;

    if (bookmarks.length === 0) {
      this.listContainer.innerHTML = `
        <div class="workspace-empty">
          <div class="empty-icon">📁</div>
          <h4>Ruang Riset Masih Kosong</h4>
          <p>Tandai peraturan, putusan, atau artikel analisis dengan ikon bookmark untuk menyimpannya di sini.</p>
        </div>
      `;
      return;
    }

    const docs = bookmarks.map(id => LEGAL_DOCUMENTS.find(d => d.id === id)).filter(Boolean);

    this.listContainer.innerHTML = docs.map(doc => {
      const note = notes[doc.id] || '';
      return `
        <div class="workspace-card" data-ws-doc="${doc.id}">
          <div class="workspace-card-header">
            <span class="badge badge-type">${escapeHTML(doc.type)}</span>
            <span class="workspace-doc-year">${doc.year}</span>
            <button type="button" class="btn-icon btn-remove-bookmark" data-remove-id="${doc.id}" title="Hapus dari Workspace">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <h4 class="workspace-doc-title">
            <a href="javascript:void(0)" data-ws-view="${doc.id}">${escapeHTML(doc.title)}</a>
          </h4>

          <div class="workspace-notes-box">
            <label for="note-${doc.id}" class="notes-label">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              Catatan Riset / Anotasi:
            </label>
            <textarea 
              id="note-${doc.id}" 
              class="workspace-note-input" 
              data-note-doc="${doc.id}" 
              placeholder="Tambahkan catatan analisa hukum untuk tim atau dokumen ini..." 
              rows="2"
            >${escapeHTML(note)}</textarea>
            <span class="note-saved-hint" data-saved-hint="${doc.id}">Tersimpan otomatis</span>
          </div>
        </div>
      `;
    }).join('');

    this.bindCardEvents();
  }

  bindCardEvents() {
    this.listContainer.querySelectorAll('.btn-remove-bookmark').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove-id');
        workspaceState.toggleBookmark(id);
      });
    });

    this.listContainer.querySelectorAll('[data-ws-view]').forEach(link => {
      link.addEventListener('click', () => {
        const id = link.getAttribute('data-ws-view');
        if (this.drawer) this.drawer.close();
        this.onViewDocument(id);
      });
    });

    this.listContainer.querySelectorAll('.workspace-note-input').forEach(textarea => {
      let timeout;
      textarea.addEventListener('input', (e) => {
        const docId = textarea.getAttribute('data-note-doc');
        const text = e.target.value;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          workspaceState.saveNote(docId, text);
          const hint = this.listContainer.querySelector(`[data-saved-hint="${docId}"]`);
          if (hint) {
            hint.classList.add('visible');
            setTimeout(() => hint.classList.remove('visible'), 2000);
          }
        }, 500);
      });
    });
  }

  exportResearchSummary() {
    const bookmarks = workspaceState.getAllBookmarks();
    if (bookmarks.length === 0) {
      alert('Workspace masih kosong. Silakan tambahkan dokumen sebelum mengekspor.');
      return;
    }

    const docs = bookmarks.map(id => LEGAL_DOCUMENTS.find(d => d.id === id)).filter(Boolean);
    let content = `RINGKASAN RISET HUKUM - LEXINDONESIA PLATFORM\n`;
    content += `Tanggal: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}\n`;
    content += `Pengguna: ${rbacState.isPro() ? 'Member Pro Korporasi' : 'Pengguna Publik'}\n`;
    content += `===========================================================\n\n`;

    docs.forEach((doc, idx) => {
      const note = workspaceState.getNote(doc.id);
      content += `[${idx + 1}] ${doc.title}\n`;
      content += `    Jenis       : ${doc.type} (${doc.year})\n`;
      content += `    Sektor      : ${doc.sector}\n`;
      content += `    Status      : ${doc.status}\n`;
      content += `    Ringkasan   : ${doc.summary}\n`;
      if (note) {
        content += `    Catatan Tim : ${note}\n`;
      }
      content += `-----------------------------------------------------------\n\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Riset-Hukum-LexIndonesia-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
