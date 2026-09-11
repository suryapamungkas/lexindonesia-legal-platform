/**
 * Modals Component (Sesuai panduan modern-web-guidance)
 * Mengelola dialog modal modern:
 * 1. Cookie Preferences Modal (<dialog closedby="any">)
 * 2. Authentication Modal (Masuk / Daftar dengan :user-invalid & :user-valid)
 * 3. Corporate Contact & Demo Modal (Hubungi Kami)
 * 4. Document Detail Modal (Pratinjau lengkap peraturan & riwayat)
 * 5. Quick Command Search Modal (Ctrl+K)
 */

import { LEGAL_DOCUMENTS } from '../data/legalDatabase.js';
import { rbacState } from '../state/rbac.js';
import { workspaceState } from '../state/bookmarks.js';
import { getStatusBadgeHTML, getSectorBadgeHTML, getProBadgeHTML, escapeHTML } from '../utils/helpers.js';

const COOKIE_STORAGE_KEY = 'lex_cookie_preferences';

export class ModalsManager {
  constructor(options = {}) {
    this.cookieModal = document.getElementById('cookie-modal');
    this.authModal = document.getElementById('auth-modal');
    this.contactModal = document.getElementById('contact-modal');
    this.docModal = document.getElementById('doc-detail-modal');
    this.searchModal = document.getElementById('search-modal');

    this.onViewDocument = options.onViewDocument || (() => {});
    this.init();
  }

  init() {
    this.setupLightDismissFallbacks();
    this.setupCookieModal();
    this.setupAuthModal();
    this.setupContactModal();
    this.setupQuickSearchModal();
    this.setupGeneralModalTriggers();
  }

  /**
   * Fallback untuk light-dismiss pada browser yang belum sepenuhnya mengadopsi closedby="any"
   * (Sesuai referensi modern-web-guidance/guides/ui-behaviors/light-dismiss-a-dialog.md)
   */
  setupLightDismissFallbacks() {
    const dialogs = document.querySelectorAll('dialog');
    dialogs.forEach(dialog => {
      dialog.addEventListener('click', (e) => {
        // Cek jika klik berada pada backdrop (di luar area bounding rect dialog)
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isInDialog && dialog.open) {
          dialog.close();
        }
      });

      // Tombol penutup dialog generik
      dialog.querySelectorAll('[data-action="close-modal"]').forEach(btn => {
        btn.addEventListener('click', () => {
          dialog.close();
        });
      });
    });
  }

  setupCookieModal() {
    const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
    const cookieFloatingBtn = document.getElementById('btn-cookie-settings');

    if (cookieFloatingBtn) {
      cookieFloatingBtn.addEventListener('click', () => {
        if (this.cookieModal) this.cookieModal.showModal();
      });
    }

    // Tampilkan pertama kali jika belum disimpan
    if (!saved && this.cookieModal) {
      setTimeout(() => {
        this.cookieModal.showModal();
      }, 1200);
    }

    const acceptAllBtn = document.getElementById('btn-cookie-accept-all');
    const savePrefBtn = document.getElementById('btn-cookie-save-pref');

    if (acceptAllBtn) {
      acceptAllBtn.addEventListener('click', () => {
        localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
          essential: true,
          analytics: true,
          personalization: true,
          marketing: true
        }));
        if (this.cookieModal) this.cookieModal.close();
      });
    }

    if (savePrefBtn) {
      savePrefBtn.addEventListener('click', () => {
        const analytics = document.getElementById('cookie-pref-analytics')?.checked ?? false;
        const personalization = document.getElementById('cookie-pref-personalization')?.checked ?? false;
        const marketing = document.getElementById('cookie-pref-marketing')?.checked ?? false;

        localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({
          essential: true,
          analytics,
          personalization,
          marketing
        }));
        if (this.cookieModal) this.cookieModal.close();
      });
    }
  }

  setupAuthModal() {
    const triggerLoginBtns = document.querySelectorAll('[data-action="open-login"]');
    const triggerRegisterBtns = document.querySelectorAll('[data-action="open-register"]');
    const authTabs = document.querySelectorAll('.auth-tab-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    triggerLoginBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchAuthTab('login');
        if (this.authModal) this.authModal.showModal();
      });
    });

    triggerRegisterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchAuthTab('register');
        if (this.authModal) this.authModal.showModal();
      });
    });

    authTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-auth-tab');
        this.switchAuthTab(target);
      });
    });

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const roleRadio = loginForm.querySelector('input[name="auth-tier"]:checked');
        const chosenRole = roleRadio ? roleRadio.value : 'pro';
        rbacState.setRole(chosenRole);
        if (this.authModal) this.authModal.close();
        alert(`Selamat datang kembali! Anda telah masuk sebagai ${chosenRole === 'pro' ? 'Member Pro Aktif' : 'Pengguna Publik'}.`);
      });
    }

    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const roleRadio = registerForm.querySelector('input[name="reg-tier"]:checked');
        const chosenRole = roleRadio ? roleRadio.value : 'pro';
        rbacState.setRole(chosenRole);
        if (this.authModal) this.authModal.close();
        alert(`Pendaftaran akun ${chosenRole === 'pro' ? 'Pro Subscriber' : 'Gratis'} berhasil! Silakan nikmati akses ke platform.`);
      });
    }
  }

  switchAuthTab(type) {
    document.querySelectorAll('.auth-tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-auth-tab') === type);
    });
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    if (loginForm) loginForm.style.display = type === 'login' ? 'flex' : 'none';
    if (registerForm) registerForm.style.display = type === 'register' ? 'flex' : 'none';
  }

  setupContactModal() {
    const contactForm = document.getElementById('contact-form');
    document.querySelectorAll('[data-action="open-contact"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.contactModal) this.contactModal.showModal();
      });
    });

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Terima kasih! Permintaan konsultasi/demo produk hukum telah kami terima. Tim Corporate Solutions kami akan menghubungi Anda dalam 1x24 jam.');
        if (this.contactModal) this.contactModal.close();
        contactForm.reset();
      });
    }
  }

  setupQuickSearchModal() {
    if (!this.searchModal) return;

    // Trigger klik tombol Search di header atau tombol manapun dengan [data-action="open-search-modal"]
    const openSearchBtns = document.querySelectorAll('#btn-header-search, [data-action="open-search-modal"]');
    openSearchBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openQuickSearchModal();
      });
    });

    const modalInput = document.getElementById('modal-search-input');
    const resultsContainer = document.getElementById('modal-search-results');

    if (modalInput && resultsContainer) {
      modalInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        if (!q) {
          resultsContainer.innerHTML = '<p class="modal-search-hint">Ketik nama undang-undang, putusan, nomor, atau istilah hukum...</p>';
          return;
        }

        const matches = LEGAL_DOCUMENTS.filter(doc => {
          return doc.title.toLowerCase().includes(q) ||
                 doc.summary.toLowerCase().includes(q) ||
                 (doc.tags && doc.tags.some(t => t.toLowerCase().includes(q)));
        });

        if (matches.length === 0) {
          resultsContainer.innerHTML = '<p class="modal-search-hint">Tidak ada peraturan atau putusan yang cocok.</p>';
          return;
        }

        resultsContainer.innerHTML = matches.slice(0, 5).map(doc => `
          <div class="modal-search-item" data-modal-doc="${doc.id}">
            <div class="modal-search-item-header">
              <span class="badge badge-type">${escapeHTML(doc.type)}</span>
              ${getStatusBadgeHTML(doc.status)}
              <span class="modal-search-item-year">${doc.year}</span>
            </div>
            <h5 class="modal-search-item-title">${escapeHTML(doc.title)}</h5>
            <p class="modal-search-item-summary">${escapeHTML(doc.summary)}</p>
          </div>
        `).join('');

        resultsContainer.querySelectorAll('[data-modal-doc]').forEach(item => {
          item.addEventListener('click', () => {
            const id = item.getAttribute('data-modal-doc');
            this.searchModal.close();
            this.openDocumentDetail(id);
          });
        });
      });
    }
  }

  setupGeneralModalTriggers() {
    // Tombol CTA Hero Demo
    document.querySelectorAll('[data-action="open-demo"]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.contactModal) this.contactModal.showModal();
      });
    });
  }

  openQuickSearchModal() {
    if (!this.searchModal) return;
    if (typeof this.searchModal.showModal === 'function') {
      this.searchModal.showModal();
    } else {
      this.searchModal.setAttribute('open', '');
    }
    const modalInput = document.getElementById('modal-search-input');
    if (modalInput) {
      setTimeout(() => {
        modalInput.focus();
        modalInput.select();
      }, 60);
    }
  }

  openDocumentDetail(docId) {
    const doc = LEGAL_DOCUMENTS.find(d => d.id === docId);
    if (!doc || !this.docModal) return;

    const isProUser = rbacState.isPro();
    const isLocked = doc.isProOnly && !isProUser;
    const isBookmarked = workspaceState.isBookmarked(doc.id);

    const titleEl = document.getElementById('modal-doc-title');
    const badgesEl = document.getElementById('modal-doc-badges');
    const summaryEl = document.getElementById('modal-doc-summary');
    const articlesEl = document.getElementById('modal-doc-articles');
    const fullTextEl = document.getElementById('modal-doc-fulltext');
    const bookmarkBtn = document.getElementById('modal-doc-bookmark-btn');

    if (titleEl) titleEl.textContent = doc.title;
    if (badgesEl) {
      badgesEl.innerHTML = `
        <span class="badge badge-type">${escapeHTML(doc.type)}</span>
        ${getStatusBadgeHTML(doc.status)}
        ${getSectorBadgeHTML(doc.sector)}
        ${getProBadgeHTML(doc.isProOnly)}
        <span class="badge badge-neutral">Diundangkan: ${escapeHTML(doc.promulgatedDate)}</span>
      `;
    }

    if (summaryEl) {
      summaryEl.textContent = doc.summary;
    }

    if (articlesEl) {
      if (doc.keyArticles && doc.keyArticles.length > 0) {
        articlesEl.innerHTML = `
          <h4 class="detail-section-title">Pasal-Pasal Krusial & Ketentuan Kunci</h4>
          <div class="detail-articles-list">
            ${doc.keyArticles.map(a => `
              <div class="detail-article-card">
                <span class="article-badge">${escapeHTML(a.article)}</span>
                <p class="article-text">${escapeHTML(a.text)}</p>
              </div>
            `).join('')}
          </div>
        `;
      } else {
        articlesEl.innerHTML = '';
      }
    }

    if (fullTextEl) {
      if (isLocked) {
        fullTextEl.innerHTML = `
          <div class="pro-locked-banner">
            <div class="lock-icon">🔒</div>
            <h3>Konten Khusus Berlangganan Pro</h3>
            <p>Teks lengkap peraturan konsolidasi, riwayat uji materi, matriks kewajiban sanksi, dan perbandingan pasal tersedia secara eksklusif bagi pelanggan Pro.</p>
            <button type="button" class="btn btn-gold btn-unlock-now" id="btn-modal-unlock-pro">
              Buka Akses Pro Sekarang
            </button>
          </div>
        `;
        const unlockBtn = fullTextEl.querySelector('#btn-modal-unlock-pro');
        if (unlockBtn) {
          unlockBtn.addEventListener('click', () => {
            this.docModal.close();
            if (this.authModal) this.authModal.showModal();
          });
        }
      } else {
        fullTextEl.innerHTML = `
          <div class="fulltext-preview-box">
            <div class="fulltext-toolbar">
              <span class="toolbar-title">Pratinjau Teks Konsolidasi Resmi:</span>
              <div class="toolbar-actions">
                <button type="button" class="btn btn-sm btn-outline" id="btn-copy-citation">Salin Kutipan</button>
                <button type="button" class="btn btn-sm btn-primary" id="btn-download-sample-pdf">Unduh PDF</button>
              </div>
            </div>
            <div class="fulltext-content-sample">
              <h5>BAB I: KETENTUAN UMUM</h5>
              <p>Dalam Undang-Undang / Peraturan ini yang dimaksud dengan ketentuan hukum terkait adalah segala instrumen yuridis yang mengatur hak, kewajiban, dan tata kelola di wilayah kedaulatan Negara Kesatuan Republik Indonesia.</p>
              <h5>BAB II: ASAS DAN TUJUAN</h5>
              <p>Pengaturan ini berasaskan kepastian hukum, kemanfaatan, keadilan, transparansi, akuntabilitas, dan pelindungan hak asasi warga negara.</p>
              <p class="fulltext-note"><em>Catatan Sistem: Anda sedang melihat naskah digital berotentikasi resmi yang telah diverifikasi oleh Tim Ahli Hukumonline.</em></p>
            </div>
          </div>
        `;

        const copyBtn = fullTextEl.querySelector('#btn-copy-citation');
        if (copyBtn) {
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(`${doc.title} (${doc.promulgatedDate}). Diakses melalui LexIndonesia Legal Platform.`);
            alert('Kutipan referensi hukum berhasil disalin ke clipboard!');
          });
        }

        const downloadBtn = fullTextEl.querySelector('#btn-download-sample-pdf');
        if (downloadBtn) {
          downloadBtn.addEventListener('click', () => {
            alert(`Mengunduh salinan resmi ${doc.shortTitle}...`);
          });
        }
      }
    }

    if (bookmarkBtn) {
      bookmarkBtn.setAttribute('data-id', doc.id);
      bookmarkBtn.classList.toggle('active', isBookmarked);
      bookmarkBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        ${isBookmarked ? 'Tersimpan di Workspace' : 'Simpan ke Workspace'}
      `;
      bookmarkBtn.onclick = () => {
        const nextState = workspaceState.toggleBookmark(doc.id);
        bookmarkBtn.classList.toggle('active', nextState);
        bookmarkBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${nextState ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
          ${nextState ? 'Tersimpan di Workspace' : 'Simpan ke Workspace'}
        `;
      };
    }

    this.docModal.showModal();
  }
}
