/**
 * Global Search Engine & Indexed Filtering Component
 * Menyediakan pencarian cepat berindeks multi-kriteria:
 * - Kata Kunci (Query)
 * - Jenis Regulasi / Putusan
 * - Bidang Hukum / Sektor
 * - Rentang Tahun
 * - Tingkat Akses (Free vs Pro)
 */

import { LEGAL_DOCUMENTS, FILTER_METADATA } from '../data/legalDatabase.js';
import { rbacState } from '../state/rbac.js';
import { workspaceState } from '../state/bookmarks.js';
import { highlightMatches, getStatusBadgeHTML, getSectorBadgeHTML, getProBadgeHTML, escapeHTML } from '../utils/helpers.js';

export class SearchEngine {
  constructor(options = {}) {
    this.container = options.container || document.getElementById('search-results-container');
    this.totalCountEl = options.totalCountEl || document.getElementById('search-results-count');
    this.queryInput = options.queryInput || document.getElementById('global-search-input');
    this.yearFilter = options.yearFilter || document.getElementById('filter-year');
    this.typeFilter = options.typeFilter || document.getElementById('filter-type');
    this.sectorFilter = options.sectorFilter || document.getElementById('filter-sector');
    this.accessFilter = options.accessFilter || document.getElementById('filter-access');
    this.onDocumentClick = options.onDocumentClick || (() => {});

    this.filters = {
      query: '',
      year: 'all',
      type: 'all',
      sector: 'all',
      access: 'all'
    };

    this.init();
  }

  init() {
    this.bindInputs();
    this.bindShortcuts();
    this.render();

    // Subscribe to RBAC changes to update locks/actions dynamically
    rbacState.subscribe(() => {
      this.render();
    });

    // Subscribe to workspace bookmarks changes
    workspaceState.subscribe(() => {
      this.render();
    });
  }

  bindInputs() {
    if (this.queryInput) {
      this.queryInput.addEventListener('input', (e) => {
        this.filters.query = e.target.value;
        this.render();
      });
    }

    if (this.yearFilter) {
      this.yearFilter.addEventListener('change', (e) => {
        this.filters.year = e.target.value;
        this.render();
      });
    }

    if (this.typeFilter) {
      this.typeFilter.addEventListener('change', (e) => {
        this.filters.type = e.target.value;
        this.render();
      });
    }

    if (this.sectorFilter) {
      this.sectorFilter.addEventListener('change', (e) => {
        this.filters.sector = e.target.value;
        this.render();
      });
    }

    if (this.accessFilter) {
      this.accessFilter.addEventListener('change', (e) => {
        this.filters.access = e.target.value;
        this.render();
      });
    }

    // Quick search tags in Hero section
    document.querySelectorAll('[data-search-tag]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tag = btn.getAttribute('data-search-tag');
        this.setQuery(tag);
        // Scroll to search section
        const searchSec = document.getElementById('section-search');
        if (searchSec) {
          searchSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  bindShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K or pressing '/' outside of form inputs
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isSearchShortcut = (isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === 'k';
      const isSlash = e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);

      if (isSearchShortcut || isSlash) {
        e.preventDefault();
        const searchDialog = document.getElementById('search-modal');
        if (searchDialog && typeof searchDialog.showModal === 'function') {
          searchDialog.showModal();
          const modalInput = document.getElementById('modal-search-input');
          if (modalInput) modalInput.focus();
        } else if (this.queryInput) {
          this.queryInput.focus();
          this.queryInput.select();
        }
      }
    });
  }

  setQuery(query) {
    this.filters.query = query;
    if (this.queryInput) this.queryInput.value = query;
    this.render();
  }

  resetFilters() {
    this.filters = {
      query: '',
      year: 'all',
      type: 'all',
      sector: 'all',
      access: 'all'
    };
    if (this.queryInput) this.queryInput.value = '';
    if (this.yearFilter) this.yearFilter.value = 'all';
    if (this.typeFilter) this.typeFilter.value = 'all';
    if (this.sectorFilter) this.sectorFilter.value = 'all';
    if (this.accessFilter) this.accessFilter.value = 'all';
    this.render();
  }

  filterDocuments() {
    const q = this.filters.query.toLowerCase().trim();
    const queryWords = q ? q.split(/\s+/).filter(w => w.length > 0) : [];

    return LEGAL_DOCUMENTS.filter(doc => {
      // 1. Text Query Match
      if (queryWords.length > 0) {
        const fullSearchableText = [
          doc.title,
          doc.shortTitle,
          doc.summary,
          doc.type,
          doc.sector,
          ...(doc.tags || []),
          ...(doc.keyArticles || []).map(a => `${a.article} ${a.text}`)
        ].join(' ').toLowerCase();

        const matchesAllWords = queryWords.every(word => fullSearchableText.includes(word));
        if (!matchesAllWords) return false;
      }

      // 2. Type Filter
      if (this.filters.type !== 'all') {
        if (doc.typeCode !== this.filters.type) return false;
      }

      // 3. Sector Filter
      if (this.filters.sector !== 'all') {
        if (doc.sectorCode !== this.filters.sector) return false;
      }

      // 4. Year Filter
      if (this.filters.year !== 'all') {
        if (this.filters.year === 'recent' && (doc.year < 2024 || doc.year > 2026)) return false;
        if (this.filters.year === 'mid' && (doc.year < 2021 || doc.year > 2023)) return false;
        if (this.filters.year === 'past' && doc.year > 2020) return false;
      }

      // 5. Access Tier Filter
      if (this.filters.access !== 'all') {
        if (this.filters.access === 'free' && doc.isProOnly) return false;
        if (this.filters.access === 'pro' && !doc.isProOnly) return false;
      }

      return true;
    });
  }

  render() {
    if (!this.container) return;

    const filtered = this.filterDocuments();
    const isProUser = rbacState.isPro();

    if (this.totalCountEl) {
      this.totalCountEl.textContent = `${filtered.length} Dokumen Ditemukan`;
    }

    if (filtered.length === 0) {
      this.container.innerHTML = `
        <div class="search-empty-state">
          <div class="empty-icon">🔍</div>
          <h4 class="empty-title">Tidak ada dokumen hukum yang cocok</h4>
          <p class="empty-desc">Coba gunakan kata kunci yang lebih umum atau sesuaikan pilihan filter di atas.</p>
          <button type="button" class="btn btn-outline btn-reset-filters">Reset Semua Filter</button>
        </div>
      `;
      const resetBtn = this.container.querySelector('.btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => this.resetFilters());
      }
      return;
    }

    const html = filtered.map(doc => {
      const isBookmarked = workspaceState.isBookmarked(doc.id);
      const isLocked = doc.isProOnly && !isProUser;

      return `
        <article class="doc-card ${isLocked ? 'doc-card-locked' : ''}" data-doc-id="${doc.id}">
          <div class="doc-card-header">
            <div class="doc-badges">
              <span class="badge badge-type">${escapeHTML(doc.type)}</span>
              ${getStatusBadgeHTML(doc.status)}
              ${getSectorBadgeHTML(doc.sector)}
              ${getProBadgeHTML(doc.isProOnly)}
            </div>
            <div class="doc-header-actions">
              <span class="doc-year">${doc.year}</span>
              <button 
                type="button" 
                class="btn-icon btn-bookmark ${isBookmarked ? 'active' : ''}" 
                data-action="bookmark" 
                data-id="${doc.id}" 
                title="${isBookmarked ? 'Hapus dari Workspace' : 'Simpan ke Workspace'}"
                aria-label="${isBookmarked ? 'Hapus dari Workspace' : 'Simpan ke Workspace'}"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>

          <h3 class="doc-title">
            <a href="javascript:void(0)" class="doc-title-link" data-action="view-doc" data-id="${doc.id}">
              ${highlightMatches(doc.title, this.filters.query)}
            </a>
          </h3>

          <p class="doc-summary">
            ${highlightMatches(doc.summary, this.filters.query)}
          </p>

          ${doc.keyArticles && doc.keyArticles.length > 0 ? `
            <div class="doc-key-articles">
              <span class="articles-label">Pasal Krusial:</span>
              <ul class="articles-list">
                ${doc.keyArticles.slice(0, 2).map(a => `
                  <li><strong>${escapeHTML(a.article)}:</strong> ${highlightMatches(a.text, this.filters.query)}</li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          <div class="doc-card-footer">
            <div class="doc-meta-info">
              <span>Diundangkan: ${escapeHTML(doc.promulgatedDate)}</span>
              ${doc.number && doc.number !== '-' ? `<span>• No: ${escapeHTML(doc.number)}</span>` : ''}
            </div>

            <div class="doc-footer-actions">
              ${isLocked ? `
                <button type="button" class="btn btn-sm btn-pro-lock" data-action="unlock-pro" data-id="${doc.id}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  Buka Akses Pro
                </button>
              ` : `
                <button type="button" class="btn btn-sm btn-primary" data-action="view-doc" data-id="${doc.id}">
                  Baca Selengkapnya →
                </button>
              `}
              <button type="button" class="btn btn-sm btn-outline" data-action="quick-note" data-id="${doc.id}">
                Catatan
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    this.container.innerHTML = html;
    this.bindCardEvents();
  }

  bindCardEvents() {
    this.container.querySelectorAll('[data-action="view-doc"]').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = el.getAttribute('data-id');
        this.onDocumentClick(id);
      });
    });

    this.container.querySelectorAll('[data-action="bookmark"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        workspaceState.toggleBookmark(id);
      });
    });

    this.container.querySelectorAll('[data-action="unlock-pro"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const authModal = document.getElementById('auth-modal');
        if (authModal && typeof authModal.showModal === 'function') {
          authModal.showModal();
        }
      });
    });

    this.container.querySelectorAll('[data-action="quick-note"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        // Open workspace drawer with this document focused
        const workspaceDrawer = document.getElementById('workspace-drawer');
        if (workspaceDrawer) {
          workspaceDrawer.showModal();
          const noteTextarea = document.querySelector(`[data-note-doc="${id}"]`);
          if (noteTextarea) noteTextarea.focus();
        }
      });
    });
  }
}
