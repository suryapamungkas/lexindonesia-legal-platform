/**
 * Product & Service Grid Component
 * Merender 4 Kategori Produk Ekosistem Hukumonline:
 * 1. PRO (Pusat Data, Analisa Hukum, Premium Stories, Legal Intelligence, My Workspace)
 * 2. SOLUSI (University Solutions, RCS AI, DMS, Perizinan Usaha, Konsultasi Dokumen, Hukumonline 360)
 * 3. INFO HUKUM (Klinik, Stream, Jurnal & Berita, Datapribadi.id)
 * 4. EVENT & AWARDS (Events & Training, PKPA, Awards & Publikasi)
 */

import { PRODUCTS_CATALOG } from '../data/legalDatabase.js';
import { rbacState } from '../state/rbac.js';
import { escapeHTML } from '../utils/helpers.js';

export class ProductGrid {
  constructor(options = {}) {
    this.container = options.container || document.getElementById('products-grid-container');
    this.tabButtons = document.querySelectorAll('[data-category-tab]');
    this.activeCategory = 'all';
    this.onProductClick = options.onProductClick || (() => {});

    this.init();
  }

  init() {
    this.bindTabs();
    this.render();

    // Subscribe to RBAC changes
    rbacState.subscribe(() => {
      this.render();
    });
  }

  bindTabs() {
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.getAttribute('data-category-tab');
        this.render();
      });
    });
  }

  setCategory(category) {
    this.activeCategory = category;
    this.tabButtons.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-category-tab') === category);
    });
    this.render();
  }

  render() {
    if (!this.container) return;

    const isProUser = rbacState.isPro();
    const filteredProducts = this.activeCategory === 'all'
      ? PRODUCTS_CATALOG
      : PRODUCTS_CATALOG.filter(p => p.category === this.activeCategory);

    const html = filteredProducts.map(product => {
      const isLocked = product.isPro && !isProUser;

      return `
        <div class="product-card ${isLocked ? 'product-card-pro' : ''}" data-product-id="${product.id}">
          <div class="product-card-top">
            <div class="product-icon-wrap">
              ${this.getIconSVG(product.icon)}
            </div>
            <div class="product-tag-wrap">
              <span class="product-category-tag">${escapeHTML(product.categoryName)}</span>
              ${product.isPro ? `
                <span class="badge badge-gold">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  PRO
                </span>
              ` : `
                <span class="badge badge-free">GRATIS</span>
              `}
            </div>
          </div>

          <div class="product-card-body">
            <h3 class="product-name">${escapeHTML(product.name)}</h3>
            <h4 class="product-subtitle">${escapeHTML(product.subtitle)}</h4>
            <p class="product-desc">${escapeHTML(product.description)}</p>

            <div class="product-features">
              <span class="features-title">Fitur & Keunggulan:</span>
              <ul class="features-list">
                ${product.features.map(f => `
                  <li>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>${escapeHTML(f)}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>

          <div class="product-card-bottom">
            <div class="product-stat-pill">
              <span class="stat-dot"></span>
              <span>${escapeHTML(product.stats)}</span>
            </div>
            <button 
              type="button" 
              class="btn ${isLocked ? 'btn-gold' : 'btn-primary'} btn-product-action" 
              data-product-id="${product.id}"
              data-is-pro="${product.isPro}"
            >
              ${isLocked ? 'Buka Akses Pro' : escapeHTML(product.actionText)}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    this.container.innerHTML = html;
    this.bindProductEvents();
  }

  bindProductEvents() {
    this.container.querySelectorAll('.btn-product-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-product-id');
        const isPro = btn.getAttribute('data-is-pro') === 'true';
        const isProUser = rbacState.isPro();

        if (id === 'pro-my-workspace') {
          const workspaceDrawer = document.getElementById('workspace-drawer');
          if (workspaceDrawer) workspaceDrawer.showModal();
          return;
        }

        if (isPro && !isProUser) {
          const authModal = document.getElementById('auth-modal');
          if (authModal) authModal.showModal();
          return;
        }

        if (id.startsWith('solusi-') || id === 'events-training' || id === 'events-pkpa') {
          const contactModal = document.getElementById('contact-modal');
          if (contactModal) {
            contactModal.showModal();
            const subjectSelect = document.getElementById('contact-subject');
            const foundProduct = PRODUCTS_CATALOG.find(p => p.id === id);
            if (subjectSelect && foundProduct) {
              subjectSelect.value = id.startsWith('solusi-') ? 'enterprise' : 'events';
            }
          }
          return;
        }

        // Default: trigger custom handler or smooth scroll to search
        this.onProductClick(id);
      });
    });
  }

  getIconSVG(iconName) {
    switch (iconName) {
      case 'database':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`;
      case 'file-text':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
      case 'bookmark':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`;
      case 'radar':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path><path d="M12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4z"></path></svg>`;
      case 'folder':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;
      case 'graduation-cap':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`;
      case 'cpu':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`;
      case 'shield-check':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>`;
      case 'briefcase':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`;
      case 'check-circle':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
      case 'layers':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`;
      case 'help-circle':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
      case 'play-circle':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`;
      case 'newspaper':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8z"></path></svg>`;
      case 'lock':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
      case 'calendar':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`;
      case 'award':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`;
      case 'star':
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
      default:
        return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg>`;
    }
  }
}
