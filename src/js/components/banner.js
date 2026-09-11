/**
 * Floating Promotional Announcement Banner Component
 * Menampilkan banner promo mengambang di atas header dengan kemampuan dismiss halus.
 */

const BANNER_STORAGE_KEY = 'lex_promo_banner_dismissed';

export class PromoBanner {
  constructor() {
    this.banner = document.getElementById('floating-promo-banner');
    this.closeBtn = document.getElementById('btn-close-promo');
    this.init();
  }

  init() {
    if (!this.banner) return;

    // Cek apakah pernah ditutup pada sesi saat ini
    const isDismissed = sessionStorage.getItem(BANNER_STORAGE_KEY);
    if (isDismissed === 'true') {
      this.banner.style.display = 'none';
      return;
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        this.dismiss();
      });
    }

    // CTA in banner
    const ctaBtn = this.banner.querySelector('.banner-cta');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        const contactModal = document.getElementById('contact-modal');
        if (contactModal && typeof contactModal.showModal === 'function') {
          contactModal.showModal();
        }
      });
    }
  }

  dismiss() {
    if (!this.banner) return;
    this.banner.classList.add('banner-exiting');
    sessionStorage.setItem(BANNER_STORAGE_KEY, 'true');
    setTimeout(() => {
      this.banner.style.display = 'none';
    }, 300);
  }
}
