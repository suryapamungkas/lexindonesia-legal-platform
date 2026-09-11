# LexIndonesia - Platform Hukum Terintegrasi & Terpercaya di Indonesia

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Author](https://img.shields.io/badge/Author-Nur%20Hidayat%20Surya%20Pamungkas-002147.svg)](https://github.com/)
[![Built With](https://img.shields.io/badge/Built%20With-Vite%20%7C%20Vanilla%20ES%20Modules-FFB800.svg)](https://vitejs.dev/)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-4285F4.svg)](chrome-extension/)

> **LexIndonesia** adalah platform ekosistem katalog produk intelijen hukum dan kepatuhan regulasi terpadu modern yang dimodelkan berdasarkan ekosistem terkemuka seperti Hukumonline. Platform ini menyajikan pusat data peraturan, analisis hukum mendalam, sistem kepatuhan AI, repositori kontrak, konsultasi publik, dan program edukasi advokat berkelanjutan.

---

## 👤 Kepemilikan & Pengembang (Author & Owner)

* **Pemilik & Arsitek Utama (Author / Owner)**: **Nur Hidayat Surya Pamungkas**
* **Hak Cipta**: © 2026 Nur Hidayat Surya Pamungkas. Seluruh Hak Cipta Dilindungi.
* **Lisensi Proyek**: [MIT License](LICENSE)

---

## ✨ Fitur-Fitur Utama Platform

### 1. 🔍 Mesin Pencari Regulasi Berindeks (*Indexed Global Search Engine*)
* **Filter Multi-Dimensi Instan**: Pencarian kata kunci dengan penyorotan teks (*keyword highlighting*), rentang tahun pengundangan, jenis dokumen hukum (Undang-Undang, Peraturan Pemerintah, Putusan MA & MK, Analisa Hukum, Klinik), serta 7 sektor bidang hukum (Siber & PDP, Ketenagakerjaan, Keuangan/Perbankan, Korporasi, HKI, Perdata, Pidana).
* **Indikator Status Keberlakuan Realtime**: Menampilkan status resmi keberlakuan regulasi (*Berlaku*, *Diubah*, *Dicabut*).
* **Pencarian Cepat Modal (`Ctrl+K`)**: Menggunakan dialog modal instan untuk penelusuran cepat dari halaman mana pun.

### 2. 🔐 Role-Based Access Control (RBAC) System
* **Mode Pengguna Bebas (Free User Tier)**: Akses terbuka ke berita peradilan, artikel konsultasi Klinik, dan daftar regulasi publik.
* **Mode Berlangganan (Pro Subscriber Tier)**: Membuka naskah peraturan konsolidasi resmi, matriks pasal krusial, analisis yuridis mendalam, dan integrasi fitur riset lanjutan.
* **Simulator Interaktif**: Tombol *live switcher* di bilah atas untuk menguji transisi hak akses pengguna secara langsung.

### 3. 🏛️ Katalog 4 Kategori Produk Ekosistem Hukum
* **PRO (Premium Legal Intelligence)**: Pusat Data 180.000+ regulasi, Analisa Hukum dwibahasa (ID/EN), Premium Stories praktisi, Radar draf RUU Prolegnas (*Legal Intelligence Updates*), dan My Workspace.
* **SOLUSI (Enterprise & Tech Solutions)**: Regulatory Compliance System (RCS) berbasis AI, Document Management System (DMS), University Solutions bagi civitas akademika, Perizinan Usaha OSS-RBA, Pembuatan Kontrak on-demand bersama advokat berlisensi PERADI, dan paket suite Hukumonline 360.
* **INFO HUKUM (Media & Riset)**: Klinik Hukum (tanya-jawab gratis 50.000+ arsip), Hukumonline Stream (video podcast), Jurnal hukum terakreditasi & warta harian, serta portal spesialisasi UU Pelindungan Data Pribadi (Datapribadi.id).
* **EVENT & AWARDS (Edukasi & Rekognisi)**: Sertifikasi Continuing Professional Development (CPD), Pendidikan Khusus Profesi Advokat (PKPA) resmi kerjasama DPN PERADI, dan pemeringkatan tahunan Indonesian Law Awards.

### 4. 💼 My Workspace & Manajemen Riset Virtual
* Penandaan dokumen (*bookmark*) dengan satu klik.
* Editor catatan riset dan anotasi pasal perorangan/tim dengan penyimpanan otomatis (*auto-save*) berbasis `localStorage`.
* Fitur ekspor ringkasan berkas riset hukum ke file teks (`.txt`).

### 5. 🎨 Standar Desain Modern (Sesuai `modern-web-guidance`)
* **Palet Warna Resmi**: Deep Navy Blue (`#002147` / `#0B192C`), Gold Accent (`#FFB800` / `#FFC107`), Pure White (`#FFFFFF`), Light Off-White (`#F8F9FA`), dan Charcoal (`#1A1A1A`).
* **Dark Theme Bawaan**: Beralih antara tema gelap dan terang secara instan dengan sinkronisasi preferensi lokal.
* **Komponen Standar W3C Terkini**: Menggunakan native `<dialog closedby="any">`, `@starting-style`, `transition-behavior: allow-discrete`, dan validasi form ramah pengguna (`:user-invalid` & `:user-valid`).

### 6. 🧩 Companion Chrome Extension (Manifest V3)
* Ekstensi browser mandiri di folder [`chrome-extension/`](chrome-extension/) untuk mendampingi riset hukum di situs web eksternal (JDIH, Mahkamah Agung, portal berita).
* Menggunakan teknologi **Side Panel API** (`sidepanel.html`) untuk memeriksa keabsahan pasal berdampingan dengan halaman web.
* Mendukung penandaan teks seleksi dan penyimpanan anotasi langsung ke Workspace.

---

## 📂 Struktur Direktori Proyek

```
web-law/
├── index.html                    # Halaman Utama Platform Hukum
├── package.json                  # Konfigurasi npm, dependensi Vite & Metadata Author
├── vite.config.js                # Konfigurasi bundler Vite
├── LICENSE                       # Lisensi MIT atas nama Nur Hidayat Surya Pamungkas
├── README.md                     # Dokumentasi resmi proyek
├── .gitignore                    # Pengabaian direktori build & node_modules untuk Git
├── src/
│   ├── css/
│   │   ├── variables.css         # Palet warna resmi, token tema gelap/terang
│   │   ├── reset.css             # CSS reset & tipografi Inter
│   │   ├── components.css        # Dialogs, Badges, Buttons, Transisi Top Layer
│   │   ├── forms.css             # Form validasi :user-invalid & :user-valid
│   │   ├── header.css            # Top utility bar, logo, search button, megamenu
│   │   ├── hero.css              # Hero section, high-contrast dark motif, chips
│   │   ├── products.css          # Card-based grid 4 kategori produk & layanan
│   │   ├── search.css            # Filter multi-facet, hasil pencarian, kartu regulasi
│   │   ├── workspace.css         # Drawer My Workspace, catatan anotasi pasal
│   │   └── footer.css            # Footer multi-kolom, alamat kantor, lencana ISO & PSE
│   └── js/
│       ├── main.js               # Entry point aplikasi web
│       ├── data/
│       │   └── legalDatabase.js  # Dataset 60+ peraturan, putusan, artikel & produk
│       ├── state/
│       │   ├── rbac.js           # Pengelola hak akses Free vs Pro Tier
│       │   ├── i18n.js           # Sistem dwibahasa (ID & EN)
│       │   ├── theme.js          # Pengatur tema Dark & Light mode
│       │   └── bookmarks.js      # Penyimpanan bookmark & catatan di localStorage
│       ├── components/
│       │   ├── searchEngine.js   # Logika indeks mesin pencari & facet
│       │   ├── modals.js         # Dialog Cookie, Auth, Demo, Detail Regulasi
│       │   ├── banner.js         # Floating promotional announcement banner
│       │   ├── productGrid.js    # Perender grid katalog 18 produk hukum
│       │   └── workspaceUI.js    # Antarmuka slide-over My Workspace
│       └── utils/
│           └── helpers.js        # Utilitas format teks, status badge & sorotan
└── chrome-extension/             # Ekstensi Browser Companion (Manifest V3)
    ├── manifest.json             # Manifest V3 terverifikasi
    ├── service-worker.js         # Background worker & context menu listener
    ├── popup.html & popup.js     # Antarmuka pencarian cepat toolbar
    ├── sidepanel.html & .js      # Panel samping riset hukum
    ├── content-script.js         # Pendeteksi seleksi pasal pada halaman web
    └── icons/                    # Ikon PNG asli (16x16, 48x48, 128x128)
```

---

## 🚀 Panduan Instalasi & Menjalankan Aplikasi

### Kebutuhan Sistem
* [Node.js](https://nodejs.org/) versi 18.0 atau lebih baru.
* NPM (Node Package Manager) atau Yarn/PNPM.

### Langkah Menjalankan Secara Lokal

1. **Clone repositori dari GitHub**:
   ```bash
   git clone https://github.com/nurhidayatsurya/lexindonesia-legal-platform.git
   cd lexindonesia-legal-platform
   ```

2. **Pasang dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (Development Mode)**:
   ```bash
   npm run dev
   ```
   Buka peramban di [http://localhost:3000](http://localhost:3000).

4. **Kompilasi untuk Produksi (Production Build)**:
   ```bash
   npm run build
   ```
   Aset siap saji akan dibuat di dalam direktori `dist/`.

5. **Pratinjau Hasil Kompilasi**:
   ```bash
   npm run preview
   ```

---

## 🧩 Memasang Companion Chrome Extension

1. Buka peramban berbasis Chromium (Google Chrome, Microsoft Edge, Brave).
2. Akses halaman manajemen ekstensi dengan mengetik `chrome://extensions/` pada bilah alamat.
3. Aktifkan sakelar **Mode Pengembang (Developer mode)** di sudut kanan atas.
4. Klik tombol **Muat yang belum dibongkar (Load unpacked)** di sudut kiri atas.
5. Pilih folder `chrome-extension` yang ada di dalam repositori ini (`d:\web-law\chrome-extension`).
6. Ekstensi **LexIndonesia Assistant** kini aktif dan siap digunakan untuk riset hukum berdampingan!

---

## 🌐 Panduan Deploy ke GitHub & Hosting

Proyek ini telah dikonfigurasi sepenuhnya siap deploy (*Ready to Deploy*) ke berbagai platform hosting modern:

### 1. Inisialisasi & Push ke Repositori GitHub
```bash
git init
git add .
git commit -m "feat: initial commit of LexIndonesia Legal Platform by Nur Hidayat Surya Pamungkas"
git branch -M main
git remote add origin https://github.com/USERNAME/lexindonesia-legal-platform.git
git push -u origin main
```

### 2. Deploy ke Vercel / Netlify
* **Build Command**: `npm run build`
* **Output Directory**: `dist`
* **Install Command**: `npm install`

### 3. Deploy ke GitHub Pages
Cukup gunakan GitHub Actions workflow atau jalankan build ke branch `gh-pages` dengan basis `dist/`.

---

## 📄 Lisensi (License)

Proyek ini dilisensikan di bawah lisensi **MIT License** - lihat file [LICENSE](LICENSE) untuk ketentuan lengkap.

```
Copyright (c) 2026 Nur Hidayat Surya Pamungkas
```
