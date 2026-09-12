/**
 * Main Application Entry Point
 * LexIndonesia / Hukumku Legal Platform
 */

import { rbacState, USER_ROLES } from './state/rbac.js';
import { i18nState } from './state/i18n.js';
import { themeState } from './state/theme.js';
import { SearchEngine } from './components/searchEngine.js';
import { ProductGrid } from './components/productGrid.js';
import { WorkspaceUI } from './components/workspaceUI.js';
import { ModalsManager } from './components/modals.js';
import { PromoBanner } from './components/banner.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inisialisasi Floating Promo Banner
  const promoBanner = new PromoBanner();

  // 2. Inisialisasi Modals Manager
  const modals = new ModalsManager();

  // 3. Inisialisasi My Workspace UI
  const workspaceUI = new WorkspaceUI({
    onViewDocument: (docId) => modals.openDocumentDetail(docId)
  });

  // 4. Inisialisasi Search Engine
  const searchEngine = new SearchEngine({
    onDocumentClick: (docId) => modals.openDocumentDetail(docId)
  });

  // 5. Inisialisasi Product & Services Catalog Grid
  const productGrid = new ProductGrid({
    onProductClick: (productId) => {
      // Jika produk adalah Pusat Data, scroll ke pencarian regulasi
      if (productId === 'pro-pusat-data') {
        const searchSec = document.getElementById('section-search');
        if (searchSec) searchSec.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // 6. Header Top Utility Bar Controls
  setupHeaderControls(modals, productGrid);

  // 7. Megamenu Navigation Dropdowns
  setupMegaMenu(productGrid);

  // 8. Mobile Navigation Toggle
  setupMobileNav();

  console.log('🏛️ LexIndonesia Legal Platform initialized successfully.');
});

function setupHeaderControls(modals, productGrid) {
  // A. RBAC Tier Switcher Badge (Free vs Pro Live Simulator)
  const tierToggleBtn = document.getElementById('btn-tier-toggle');
  const tierBadgeText = document.getElementById('tier-badge-text');

  if (tierToggleBtn) {
    rbacState.subscribe((currentRole) => {
      const isPro = currentRole === USER_ROLES.PRO;
      tierToggleBtn.setAttribute('data-current-tier', currentRole);
      tierToggleBtn.classList.toggle('tier-pro', isPro);
      tierToggleBtn.classList.toggle('tier-free', !isPro);

      if (tierBadgeText) {
        tierBadgeText.textContent = isPro ? 'Status: Pro Subscriber' : 'Status: Free User';
      }

      // Sync mobile tier badge
      const mobileTierBtn = document.getElementById('btn-mobile-tier-toggle');
      const mobileTierBadgeText = document.getElementById('mobile-tier-badge-text');
      if (mobileTierBtn) {
        mobileTierBtn.classList.toggle('tier-pro', isPro);
        mobileTierBtn.classList.toggle('tier-free', !isPro);
      }
      if (mobileTierBadgeText) {
        mobileTierBadgeText.textContent = isPro ? 'Status: Pro' : 'Status: Free';
      }

      // Update CTA buttons if necessary
      const subscribeCTA = document.getElementById('btn-top-subscribe');
      if (subscribeCTA) {
        subscribeCTA.textContent = isPro ? 'Kelola Paket Pro' : 'Berlangganan Pro';
      }
    });

    const handleTierSwitch = () => {
      const nextRole = rbacState.toggleRole();
      const isPro = nextRole === USER_ROLES.PRO;
      const toastMsg = isPro
        ? '🌟 Anda sekarang beralih ke mode PRO SUBSCRIBER! Seluruh dokumen dan analisis hukum terbuka penuh.'
        : 'ℹ️ Anda sekarang beralih ke mode FREE USER. Fitur eksklusif akan terkunci sebagai demo proteksi.';
      alert(toastMsg);
    };

    tierToggleBtn.addEventListener('click', handleTierSwitch);

    const mobileTierBtn = document.getElementById('btn-mobile-tier-toggle');
    if (mobileTierBtn) {
      mobileTierBtn.addEventListener('click', handleTierSwitch);
    }
  }

  // B. Language Switcher (ID / EN)
  const langToggleBtn = document.getElementById('btn-lang-toggle');
  const langLabel = document.getElementById('lang-label');
  const mobileLangBtn = document.getElementById('btn-mobile-lang-toggle');
  const mobileLangLabel = document.getElementById('mobile-lang-label');

  if (langToggleBtn || mobileLangBtn) {
    i18nState.subscribe((currentLang) => {
      const upper = currentLang.toUpperCase();
      if (langLabel) langLabel.textContent = upper;
      if (mobileLangLabel) mobileLangLabel.textContent = upper;
      updatePageTranslations(currentLang);
    });

    const handleLangToggle = () => i18nState.toggleLang();
    if (langToggleBtn) langToggleBtn.addEventListener('click', handleLangToggle);
    if (mobileLangBtn) mobileLangBtn.addEventListener('click', handleLangToggle);
  }

  // C. Theme Toggle (Dark / Light Mode)
  const themeToggleBtn = document.getElementById('btn-theme-toggle');
  const mobileThemeBtn = document.getElementById('btn-mobile-theme-toggle');
  const handleThemeToggle = () => themeState.toggleTheme();
  if (themeToggleBtn) themeToggleBtn.addEventListener('click', handleThemeToggle);
  if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', handleThemeToggle);

  // D. Global Catalog Quick Matrix Link
  const catalogBtn = document.getElementById('btn-top-catalog');
  if (catalogBtn) {
    catalogBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const productSec = document.getElementById('section-products');
      if (productSec) productSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // E. Subscription CTA
  const subscribeCTA = document.getElementById('btn-top-subscribe');
  if (subscribeCTA) {
    subscribeCTA.addEventListener('click', () => {
      if (modals.authModal) modals.authModal.showModal();
    });
  }

  // F. Header Quick Search Button
  const headerSearchBtn = document.getElementById('btn-header-search');
  if (headerSearchBtn) {
    headerSearchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modals.openQuickSearchModal();
    });
  }
}

function updatePageTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translated = i18nState.t(key);
    if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
      el.setAttribute('placeholder', translated);
    } else {
      el.textContent = translated;
    }
  });
}

function setupMegaMenu(productGrid) {
  // Category navigation links (Pro, Solusi, Info Hukum, Event & Awards)
  document.querySelectorAll('[data-nav-category]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.getAttribute('data-nav-category');
      productGrid.setCategory(category);
      const productSec = document.getElementById('section-products');
      if (productSec) {
        productSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function setupMobileNav() {
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mainNav = document.getElementById('main-nav-menu');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('btn-close-mobile-nav');

  function closeNav() {
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    if (mainNav) mainNav.classList.remove('nav-open');
    if (overlay) overlay.classList.remove('overlay-open');
    document.body.style.overflow = '';
  }

  function openNav() {
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    if (mainNav) mainNav.classList.add('nav-open');
    if (overlay) overlay.classList.add('overlay-open');
    document.body.style.overflow = 'hidden';
  }

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeNav);
  }

  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  // Close mobile drawer when clicking navigation links or action buttons inside it
  if (mainNav) {
    mainNav.querySelectorAll('a, [data-action]').forEach(el => {
      el.addEventListener('click', () => {
        if (window.innerWidth <= 880) {
          closeNav();
        }
      });
    });
  }
}
