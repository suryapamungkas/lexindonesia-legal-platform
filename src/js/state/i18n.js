/**
 * Internationalization (i18n) State Manager
 * Mendukung dwibahasa Bahasa Indonesia (ID) & English (EN)
 */

const STORAGE_KEY = 'lex_language';

export const TRANSLATIONS = {
  id: {
    topCatalog: 'Katalog Produk Global',
    subscribePro: 'Berlangganan Pro',
    searchPlaceholder: 'Cari peraturan, putusan, artikel analisis...',
    navPro: 'Pro',
    navSolusi: 'Solusi',
    navInfoHukum: 'Info Hukum',
    navEvents: 'Event & Awards',
    login: 'Masuk',
    register: 'Daftar',
    heroTitle: 'Platform Hukum Terintegrasi & Terpercaya di Indonesia',
    heroSubtitle: 'Solusi terlengkap kecerdasan hukum, pusat data 180.000+ regulasi, sistem kepatuhan AI, dan program edukasi profesional.',
    ctaContact: 'Hubungi Kami',
    ctaExplore: 'Eksplorasi Solusi',
    popularSearch: 'Pencarian Populer:',
    categoryProTitle: 'PRO (Premium Legal Intelligence & Data)',
    categoryProDesc: 'Layanan intelijen data hukum komprehensif, pelacak regulasi, dan analisis praktis bagi profesional hukum.',
    categorySolusiTitle: 'SOLUSI (Enterprise & Tech Solutions)',
    categorySolusiDesc: 'Sistem kepatuhan korporasi berbasis AI, manajemen siklus kontrak, dan perizinan badan usaha terintegrasi.',
    categoryInfoTitle: 'INFO HUKUM (Research & Media)',
    categoryInfoDesc: 'Kanal edukasi publik gratis, media jurnalisme peradilan terpercaya, dan panduan regulasi siber.',
    categoryEventsTitle: 'EVENTS & AWARDS (Education & Recognition)',
    categoryEventsDesc: 'Pendidikan berkelanjutan profesi advokat, masterclass perancangan kontrak, dan penghargaan industri.',
    quickSearchBtn: 'Cari Regulasi',
    myWorkspace: 'My Workspace',
    tierFreeLabel: 'Akun Publik (Gratis)',
    tierProLabel: 'Member Pro Aktif',
    upgradeToPro: 'Upgrade ke Pro',
    lockedProNotice: 'Konten ini memerlukan akses langganan Pro.',
    unlockCTA: 'Buka Akses Pro Sekarang',
    cookieNotice: 'Kami menggunakan cookies untuk meningkatkan pengalaman penelusuran Anda.',
    cookieSettings: 'Pengaturan Cookie',
    cookieAcceptAll: 'Setujui Semua',
    cookieSave: 'Simpan Pilihan',
    bannerPromo: '🎉 Penawaran Q3: Diskon 30% Akses Hukumonline 360 & Regulatory Compliance System (RCS) untuk Perusahaan.',
    claimOffer: 'Klaim Penawaran →',
    searchFilterYear: 'Tahun',
    searchFilterType: 'Jenis Regulasi',
    searchFilterSector: 'Bidang Hukum',
    searchFilterAccess: 'Akses',
    searchFilterAll: 'Semua'
  },
  en: {
    topCatalog: 'Global Product Catalog',
    subscribePro: 'Subscribe Pro',
    searchPlaceholder: 'Search laws, court rulings, legal analyses...',
    navPro: 'Pro',
    navSolusi: 'Solutions',
    navInfoHukum: 'Legal Insights',
    navEvents: 'Events & Awards',
    login: 'Sign In',
    register: 'Register',
    heroTitle: "Indonesia’s One-Stop Integrated Legal Platform",
    heroSubtitle: 'The premier ecosystem for legal intelligence, 180,000+ statutes database, AI regulatory compliance, and accredited professional education.',
    ctaContact: 'Contact Us',
    ctaExplore: 'Explore Solutions',
    popularSearch: 'Popular Searches:',
    categoryProTitle: 'PRO (Premium Legal Intelligence & Data)',
    categoryProDesc: 'Comprehensive legal data intelligence, regulatory tracking, and tactical analysis for legal practitioners.',
    categorySolusiTitle: 'SOLUTIONS (Enterprise & Tech Solutions)',
    categorySolusiDesc: 'AI-driven compliance management, corporate document repository, and integrated business licensing.',
    categoryInfoTitle: 'LEGAL INSIGHTS (Research & Media)',
    categoryInfoDesc: 'Free public legal Q&A clinic, independent judicial journalism, and specialized personal data compliance.',
    categoryEventsTitle: 'EVENTS & AWARDS (Education & Recognition)',
    categoryEventsDesc: 'Continuing legal education for advocates, contract drafting masterclasses, and prestigious industry awards.',
    quickSearchBtn: 'Search Laws',
    myWorkspace: 'My Workspace',
    tierFreeLabel: 'Public Tier (Free)',
    tierProLabel: 'Active Pro Member',
    upgradeToPro: 'Upgrade to Pro',
    lockedProNotice: 'This document requires an active Pro subscription.',
    unlockCTA: 'Unlock Pro Access Now',
    cookieNotice: 'We use cookies to enhance your browsing experience and personalize legal research.',
    cookieSettings: 'Cookie Preferences',
    cookieAcceptAll: 'Accept All',
    cookieSave: 'Save Settings',
    bannerPromo: '🎉 Q3 Special: 30% Off Hukumonline 360 Suite & Regulatory Compliance System (RCS) for Enterprises.',
    claimOffer: 'Claim Offer →',
    searchFilterYear: 'Year',
    searchFilterType: 'Document Type',
    searchFilterSector: 'Practice Area',
    searchFilterAccess: 'Access Tier',
    searchFilterAll: 'All'
  }
};

class I18nManager {
  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    this.currentLang = (saved === 'en') ? 'en' : 'id';
    this.listeners = new Set();
  }

  getLang() {
    return this.currentLang;
  }

  setLang(lang) {
    if (lang !== 'id' && lang !== 'en') return;
    this.currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    this.notify();
  }

  toggleLang() {
    const nextLang = this.currentLang === 'id' ? 'en' : 'id';
    this.setLang(nextLang);
    return nextLang;
  }

  t(key) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.id;
    return dict[key] || key;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.currentLang);
    return () => this.listeners.delete(callback);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.currentLang);
      } catch (err) {
        console.error('i18n listener error:', err);
      }
    }
  }
}

export const i18nState = new I18nManager();
