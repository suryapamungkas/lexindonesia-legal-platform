/**
 * Database Hukum Komprehensif Platform Hukum Indonesia
 * Mencakup Peraturan, Putusan, Artikel Analisis, Tanya Jawab Klinik,
 * serta Katalog Produk & Layanan (PRO, SOLUSI, INFO HUKUM, EVENTS & AWARDS).
 */

export const PRODUCTS_CATALOG = [
  // --- KATEGORI 1: PRO (Premium Legal Intelligence & Data) ---
  {
    id: 'pro-pusat-data',
    category: 'pro',
    categoryName: 'PRO',
    name: 'Pusat Data',
    subtitle: 'Database Peraturan & Putusan Terlengkap di Indonesia',
    description: 'Akses lebih dari 180.000+ peraturan perundang-undangan (UU, PP, Perpres, Permen) dan putusan Mahkamah Agung & MK dengan status keberlakuan realtime, uji materi, dan perbandingan pasal demi pasal.',
    badge: 'Flagship Data',
    isPro: true,
    features: [
      '180.000+ Peraturan & Putusan terindeks',
      'Pelacak riwayat perubahan & pencabutan hukum',
      'Fitur komparasi pasal berdampingan (side-by-side)',
      'Ekspor PDF resmi & teks konsolidasi'
    ],
    stats: '180.000+ Dokumen',
    actionText: 'Buka Pusat Data',
    icon: 'database'
  },
  {
    id: 'pro-analisa-hukum',
    category: 'pro',
    categoryName: 'PRO',
    name: 'Analisa Hukum (Legal Analysis)',
    subtitle: 'Kajian Mendalam Bilingual atas Regulasi Baru',
    description: 'Analisis hukum dwibahasa (Indonesia & Inggris) komprehensif yang disusun oleh pakar hukum senior dan praktisi untuk membedah dampak bisnis dari regulasi terbaru.',
    badge: 'Bilingual',
    isPro: true,
    features: [
      'Format dwibahasa ID & EN',
      'Analisis dampak sektoral bisnis (Banking, Tech, Mining, dll)',
      'Ringkasan eksekutif (Executive Summary)',
      'Daftar kewajiban & sanksi hukum bagi korporasi'
    ],
    stats: '3.500+ Kajian Terbit',
    actionText: 'Pelajari Analisa',
    icon: 'file-text'
  },
  {
    id: 'pro-premium-stories',
    category: 'pro',
    categoryName: 'PRO',
    name: 'Premium Stories',
    subtitle: 'Rujukan Praktis & Investigasi Praktisi Hukum',
    description: 'Artikel eksklusif dan laporan investigasi yang menyoroti tren litigasi, transaksi M&A, dinamika kantor hukum, dan panduan taktis bagi in-house counsel.',
    badge: 'Eksklusif',
    isPro: true,
    features: [
      'Wawancara eksklusif General Counsel terkemuka',
      'Panduan taktis kepatuhan & mitigasi risiko',
      'Analisis tren transaksi pasar modal & merger',
      'Arsip rujukan strategi litigasi komersial'
    ],
    stats: 'Update Mingguan',
    actionText: 'Baca Stories',
    icon: 'bookmark'
  },
  {
    id: 'pro-legal-intelligence',
    category: 'pro',
    categoryName: 'PRO',
    name: 'Legal Intelligence Updates',
    subtitle: 'Early Intelligence Draf RUU & Kebijakan Strategis',
    description: 'Pemantauan dini terhadap draf Rancangan Undang-Undang, kebijakan kementerian, serta sinyal regulasi sebelum resmi diundangkan untuk kesiapan bisnis.',
    badge: 'Early Access',
    isPro: true,
    features: [
      'Pelacakan Prolegnas (Program Legislasi Nasional)',
      'Akses draf RUU & naskah akademik',
      'Notifikasi radar regulasi berbasis sektor',
      'Analisis sentimen regulator & timeline pengesahan'
    ],
    stats: 'Early Bird Alert',
    actionText: 'Akses Intelligence',
    icon: 'radar'
  },
  {
    id: 'pro-my-workspace',
    category: 'pro',
    categoryName: 'PRO',
    name: 'My Workspace',
    subtitle: 'Ruang Kerja Virtual Riset & Manajemen Hukum',
    description: 'Pusat manajemen riset hukum personal dan tim: simpan bookmark peraturan, beri catatan anotasi pada pasal, buat folder proyek riset, dan sinkronkan dengan ekstensi browser.',
    badge: 'Kolaborasi',
    isPro: true,
    features: [
      'Anotasi & penandaan pasal interaktif',
      'Folder proyek riset bersama tim legal',
      'Ekspor laporan riset terintegrasi',
      'Sinkronisasi langsung dengan Chrome Extension'
    ],
    stats: 'Fitur Produktivitas',
    actionText: 'Buka Workspace',
    icon: 'folder'
  },

  // --- KATEGORI 2: SOLUSI (Enterprise & Tech Solutions) ---
  {
    id: 'solusi-university',
    category: 'solusi',
    categoryName: 'SOLUSI',
    name: 'University Solutions',
    subtitle: 'Hub Pengetahuan Hukum untuk Jaringan Akademik',
    description: 'Portal akses terintegrasi khusus civitas akademika, mahasiswa, dan dosen Fakultas Hukum untuk riset ilmiah, studi kasus peradilan, dan kurikulum hukum modern.',
    badge: 'Akademik',
    isPro: false,
    features: [
      'Akses kampus terintegrasi IP Whitelist / SSO',
      'Repository putusan & jurnal terindeks SINTA',
      'Modul pelatihan riset hukum bersertifikasi',
      'Diskon lisensi mahasiswa & dosen'
    ],
    stats: '70+ Universitas Mitra',
    actionText: 'Solusi Kampus',
    icon: 'graduation-cap'
  },
  {
    id: 'solusi-rcs',
    category: 'solusi',
    categoryName: 'SOLUSI',
    name: 'Regulatory Compliance System (RCS)',
    subtitle: 'Platform Pelacak Kepatuhan Hukum Berbasis AI',
    description: 'Sistem otomasi kepatuhan hukum berbasis kecerdasan buatan untuk memetakan seluruh kewajiban hukum korporasi, memantau tenggat izin, dan menilai skor risiko kepatuhan secara otomatis.',
    badge: 'AI-Powered',
    isPro: true,
    features: [
      'Matriks kewajiban hukum spesifik industri',
      'Peringatan otomatis perubahan regulasi yang berdampak',
      'Dashboard audit risiko kepatuhan (Compliance Score)',
      'Delegasi tugas kepatuhan lintas departemen'
    ],
    stats: 'Otomasi Kepatuhan',
    actionText: 'Minta Demo RCS',
    icon: 'cpu'
  },
  {
    id: 'solusi-dms',
    category: 'solusi',
    categoryName: 'SOLUSI',
    name: 'Document Management System',
    subtitle: 'Repositori & Manajemen Siklus Kontrak Korporasi',
    description: 'Solusi manajemen kontrak cerdas dari tahap penyusunan, review kolaboratif, penandatanganan elektronik tersertifikasi, hingga pemantauan masa berlaku kontrak korporasi.',
    badge: 'Enterprise',
    isPro: true,
    features: [
      'Penyimpanan kontrak aman dengan enkripsi militer',
      'Version control & riwayat audit tanpa batas',
      'Integrasi tanda tangan elektronik resmi (PSrE)',
      'Notifikasi otomatis menjelang masa kedaluwarsa'
    ],
    stats: 'Audit Trail Aman',
    actionText: 'Eksplorasi DMS',
    icon: 'shield-check'
  },
  {
    id: 'solusi-perizinan-usaha',
    category: 'solusi',
    categoryName: 'SOLUSI',
    name: 'Perizinan Usaha',
    subtitle: 'Pendirian Badan Usaha & Lisensi Operasional OSS-RBA',
    description: 'Layanan terintegrasi pendirian PT, CV, PMA, pendaftaran merek HKI, izin lingkungan, dan pengurusan NIB melalui sistem OSS Risk-Based Approach dengan pendampingan profesional.',
    badge: 'Legal Services',
    isPro: false,
    features: [
      'Pendirian PT & legalitas lengkap dalam 3 hari',
      'Pengurusan NIB & sertifikasi standar OSS RBA',
      'Pendaftaran Hak Cipta & Merek ke Ditjen KI',
      'Konsultasi struktur kepemilikan saham & modal'
    ],
    stats: '5.000+ PT Didirikan',
    actionText: 'Mulai Perizinan',
    icon: 'briefcase'
  },
  {
    id: 'solusi-konsultasi-dokumen',
    category: 'solusi',
    categoryName: 'SOLUSI',
    name: 'Konsultasi & Pembuatan Dokumen',
    subtitle: 'Draft Kontrak On-Demand Terverifikasi Advokat PERADI',
    description: 'Pembuatan perjanjian kerja (PKWT/PKWTT), NDA, Perjanjian Pemegang Saham (SHA), dan konsultasi hukum instan bersama advokat berlisensi berpengalaman.',
    badge: 'On-Demand',
    isPro: false,
    features: [
      'Template kontrak tervalidasi hukum positif Indonesia',
      'Review kontrak oleh advokat berlisensi resmi',
      'Konsultasi video privat dengan praktisi spesialis',
      'Revisi dokumen cepat dengan jaminan kepatuhan'
    ],
    stats: '100% Advokat Berlisensi',
    actionText: 'Pesan Dokumen',
    icon: 'check-circle'
  },
  {
    id: 'solusi-hukumonline-360',
    category: 'solusi',
    categoryName: 'SOLUSI',
    name: 'Hukumonline 360',
    subtitle: 'Suite Terpadu Solusi Hukum Korporasi All-in-One',
    description: 'Paket ekosistem komprehensif yang menyatukan Pusat Data, RCS, Analisa Hukum, DMS, dan pelatihan in-house khusus divisi legal korporasi dan institusi keuangan.',
    badge: 'All-In-One Suite',
    isPro: true,
    features: [
      'Akses tanpa batas ke seluruh produk platform',
      'Dedicated Account Manager & Legal Research Assistant',
      'Sesi in-house training bulanan untuk divisi hukum',
      'Integrasi API database hukum ke sistem internal perusahaan'
    ],
    stats: 'Solusi Korporat Utama',
    actionText: 'Konsultasi Korporat',
    icon: 'layers'
  },

  // --- KATEGORI 3: INFO HUKUM (Research & Media) ---
  {
    id: 'info-klinik',
    category: 'info-hukum',
    categoryName: 'INFO HUKUM',
    name: 'Klinik Hukum',
    subtitle: 'Konsultasi Tanya-Jawab Masalah Hukum Gratis untuk Masyarakat',
    description: 'Platform edukasi dan konsultasi tanya jawab hukum interaktif pertama dan terbesar di Indonesia, dijawab langsung oleh pakar hukum berdasarkan peraturan perundang-undangan terkini.',
    badge: 'Akses Publik Gratis',
    isPro: false,
    features: [
      '50.000+ Arsip tanya-jawab hukum masyarakat',
      'Kategori lengkap: Pidana, Perdata, Waris, Ketenagakerjaan, Siber',
      'Formulir pengajuan pertanyaan hukum baru gratis',
      'Referensi pasal dan yurisprudensi langsung'
    ],
    stats: '50.000+ Tanya Jawab',
    actionText: 'Cari di Klinik',
    icon: 'help-circle'
  },
  {
    id: 'info-stream',
    category: 'info-hukum',
    categoryName: 'INFO HUKUM',
    name: 'Hukumonline Stream',
    subtitle: 'Video Streaming, Podcast & Bedah Kasus Terkini',
    description: 'Konten audio-visual edukatif menyajikan wawancara eksklusif hakim agung, menteri, akademisi terkemuka, serta bedah pasal hukum populer dengan gaya informatif dan mudah dipahami.',
    badge: 'Video & Audio',
    isPro: false,
    features: [
      'Serial video podcast mingguan "Bincang Hukum"',
      'Liputan mendalam sidang penting Mahkamah Konstitusi',
      'Animasi penjelasan pasal UU untuk masyarakat awam',
      'Klip highlight berita regulasi harian'
    ],
    stats: '1.200+ Episode',
    actionText: 'Tonton Sekarang',
    icon: 'play-circle'
  },
  {
    id: 'info-jurnal-berita',
    category: 'info-hukum',
    categoryName: 'INFO HUKUM',
    name: 'Jurnal & Berita Hukum',
    subtitle: 'Jurnal Ilmiah Peer-Reviewed & Portal Berita Harian',
    description: 'Portal berita hukum independen terlengkap yang mengabarkan dinamika peradilan, kebijakan tata negara, serta jurnal ilmiah terakreditasi untuk referensi akademis.',
    badge: 'Jurnalisme Terpercaya',
    isPro: false,
    features: [
      'Liputan berita hukum dan peradilan 24/7',
      'Indonesian Journal of Legal Studies (Peer-reviewed)',
      'Opini pakar dan kolom guru besar hukum nasional',
      'Indeks putusan penting pengadilan niaga dan tindak pidana'
    ],
    stats: 'Ratusan Berita/Bulan',
    actionText: 'Baca Berita',
    icon: 'newspaper'
  },
  {
    id: 'info-datapribadi',
    category: 'info-hukum',
    categoryName: 'INFO HUKUM',
    name: 'Datapribadi.id',
    subtitle: 'Pusat Kepatuhan UU Pelindungan Data Pribadi (PDP)',
    description: 'Portal spesialisasi pelindungan data pribadi di Indonesia: panduan implementasi UU No. 27 Tahun 2022, standar audit kepatuhan DPO (Data Protection Officer), dan mitigasi kebocoran siber.',
    badge: 'Spesialis PDP',
    isPro: false,
    features: [
      'Panduan langkah demi langkah implementasi UU PDP',
      'Kalkulator self-assessment kepatuhan privasi data',
      'Template Data Protection Impact Assessment (DPIA)',
      'Sertifikasi & komunitas profesi Data Protection Officer'
    ],
    stats: 'Toolkit UU PDP',
    actionText: 'Pelajari UU PDP',
    icon: 'lock'
  },

  // --- KATEGORI 4: EVENTS & AWARDS (Education & Recognition) ---
  {
    id: 'events-training',
    category: 'events-awards',
    categoryName: 'EVENT & AWARDS',
    name: 'Events & Training / Online Course',
    subtitle: 'Webinar Profesional, Masterclass & Sertifikasi CPD',
    description: 'Program pendidikan berkelanjutan hukum (Continuing Professional Development) dengan narasumber praktisi papan atas untuk mengasah keahlian legal drafting, arbitrase, dan negosiasi kontrak.',
    badge: 'Bersertifikat',
    isPro: false,
    features: [
      'Legal Drafting & Contract Negotiation Masterclass',
      'Sertifikat digital terverifikasi dengan QR Code',
      'Materi softcopy lengkap & rekaman video seumur hidup',
      'Diskusi interaktif studi kasus bersama praktisi'
    ],
    stats: '250+ Pelatihan/Tahun',
    actionText: 'Daftar Event',
    icon: 'calendar'
  },
  {
    id: 'events-pkpa',
    category: 'events-awards',
    categoryName: 'EVENT & AWARDS',
    name: 'PKPA (Pendidikan Khusus Profesi Advokat)',
    subtitle: 'Program Resmi Kerjasama DPN PERADI & Fakultas Hukum Ternama',
    description: 'Penyelenggaraan PKPA resmi berkualitas tinggi dengan kurikulum terstandarisasi PERADI, diajar oleh praktisi advokat senior, kurator kepailitan, dan hakim berpengalaman.',
    badge: 'Program Resmi PERADI',
    isPro: false,
    features: [
      'Kerjasama resmi dengan DPN PERADI & FH Universitas Negeri ternama',
      'Tingkat kelulusan Ujian Profesi Advokat (UPA) tertinggi',
      'Simulasi ujian UPA dan bimbingan bedah soal',
      'Opsi kelas online interaktif dan offline hybrid'
    ],
    stats: '15.000+ Alumni Advokat',
    actionText: 'Daftar PKPA',
    icon: 'award'
  },
  {
    id: 'events-awards',
    category: 'events-awards',
    categoryName: 'EVENT & AWARDS',
    name: 'Awards & Publikasi Online',
    subtitle: 'Pemeringkatan Industri Hukum Terkemuka di Indonesia',
    description: 'Ajang bergengsi tahunan pemeringkatan firma hukum (Top 100 Indonesian Law Firms), In-House Counsel Leaders, serta publikasi profil kepemimpinan hukum di Indonesia.',
    badge: 'Penghargaan Bergengsi',
    isPro: false,
    features: [
      'Top 100 Indonesian Law Firms Awards',
      'Indonesia In-House Counsel Summit & Awards',
      'Metodologi riset independen & teruji',
      'Publikasi profil khusus firma hukum terkemuka'
    ],
    stats: 'Tradisi Prestise Tahunan',
    actionText: 'Lihat Peringkat',
    icon: 'star'
  }
];

export const LEGAL_DOCUMENTS = [
  // --- UNDANG-UNDANG (UU) ---
  {
    id: 'doc-uu-27-2022',
    title: 'Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi',
    shortTitle: 'UU No. 27/2022 (UU PDP)',
    type: 'Undang-Undang',
    typeCode: 'uu',
    number: '27',
    year: 2022,
    sector: 'Privasi Data & Siber',
    sectorCode: 'siber',
    status: 'Berlaku',
    statusCode: 'berlaku',
    promulgatedDate: '17 Oktober 2022',
    isProOnly: false,
    summary: 'Undang-Undang payung hukum yang mengatur hak subjek data, kewajiban pengendali data dan prosesor data pribadi, pembentukan lembaga pengawas, serta ancaman sanksi administratif dan pidana atas pelanggaran data.',
    keyArticles: [
      { article: 'Pasal 20', text: 'Pengendali Data Pribadi wajib memiliki dasar pemrosesan Data Pribadi yang sah.' },
      { article: 'Pasal 53', text: 'Pengendali Data Pribadi dan Prosesor Data Pribadi wajib menunjuk pejabat atau petugas yang menjalankan fungsi Pelindungan Data Pribadi (DPO).' },
      { article: 'Pasal 57', text: 'Sanksi administratif bagi pelanggar dapat berupa peringatan tertulis, penghentian sementara kegiatan, hingga denda administratif paling tinggi 2% dari total pendapatan tahunan.' }
    ],
    fullTextAvailable: true,
    tags: ['PDP', 'Data Pribadi', 'DPO', 'Privasi', 'Siber', 'Kominfo']
  },
  {
    id: 'doc-uu-6-2023',
    title: 'Undang-Undang Nomor 6 Tahun 2023 tentang Penetapan Perppu No. 2 Tahun 2022 tentang Cipta Kerja Menjadi Undang-Undang',
    shortTitle: 'UU No. 6/2023 (UU Cipta Kerja)',
    type: 'Undang-Undang',
    typeCode: 'uu',
    number: '6',
    year: 2023,
    sector: 'Ketenagakerjaan & Korporasi',
    sectorCode: 'ketenagakerjaan',
    status: 'Berlaku',
    statusCode: 'berlaku',
    promulgatedDate: '31 Maret 2023',
    isProOnly: true,
    summary: 'Ketentuan omnibus law yang menyederhanakan perizinan berusaha berbasis risiko (OSS RBA), ketentuan ketenagakerjaan (PKWT, alih daya, pesangon), tata kelola perseroan perorangan, dan kemudahan investasi.',
    keyArticles: [
      { article: 'Pasal 81 Klaster Ketenagakerjaan', text: 'Mengubah ketentuan dalam UU No. 13/2003 mengenai penggunaan tenaga kerja asing, perjanjian kerja waktu tertentu (PKWT), waktu kerja, dan kompensasi PHK.' },
      { article: 'Pasal 153B', text: 'Pengusaha wajib memberikan uang kompensasi kepada pekerja yang hubungan kerjanya berdasarkan PKWT.' }
    ],
    fullTextAvailable: true,
    tags: ['Cipta Kerja', 'Omnibus Law', 'PKWT', 'Pesangon', 'OSS', 'Ketenagakerjaan']
  },
  {
    id: 'doc-uu-4-2023',
    title: 'Undang-Undang Nomor 4 Tahun 2023 tentang Pengembangan dan Penguatan Sektor Keuangan',
    shortTitle: 'UU No. 4/2023 (UU P2SK)',
    type: 'Undang-Undang',
    typeCode: 'uu',
    number: '4',
    year: 2023,
    sector: 'Perbankan & Fintech',
    sectorCode: 'keuangan',
    status: 'Berlaku',
    statusCode: 'berlaku',
    promulgatedDate: '12 Januari 2023',
    isProOnly: true,
    summary: 'Omnibus law sektor keuangan yang memperkuat wewenang Bank Indonesia, OJK, dan LPS, mengatur inovasi teknologi sektor keuangan (Fintech & Aset Kripto), serta perlindungan konsumen jasa keuangan.',
    keyArticles: [
      { article: 'Pasal 213', text: 'Pengaturan Inovasi Teknologi Sektor Keuangan (ITSK) termasuk aset kripto di bawah pengawasan Otoritas Jasa Keuangan.' },
      { article: 'Pasal 304', text: 'Ketentuan tindak pidana sektor keuangan dan penegakan hukum satu pintu oleh penyidik OJK.' }
    ],
    fullTextAvailable: true,
    tags: ['P2SK', 'Fintech', 'Kripto', 'OJK', 'Bank Indonesia', 'Perbankan']
  },
  {
    id: 'doc-uu-1-2024',
    title: 'Undang-Undang Nomor 1 Tahun 2024 tentang Perubahan Kedua atas UU No. 11/2008 tentang Informasi dan Transaksi Elektronik',
    shortTitle: 'UU No. 1/2024 (UU ITE Revisi Kedua)',
    type: 'Undang-Undang',
    typeCode: 'uu',
    number: '1',
    year: 2024,
    sector: 'Privasi Data & Siber',
    sectorCode: 'siber',
    status: 'Berlaku',
    statusCode: 'berlaku',
    promulgatedDate: '04 Januari 2024',
    isProOnly: false,
    summary: 'Penyempurnaan pasal-pasal krusial UU ITE, khususnya perumusan norma pencemaran nama baik (Pasal 27 ayat 3), ujaran kebencian, perlindungan anak di ranah digital, serta penyelenggaraan sertifikasi elektronik.',
    keyArticles: [
      { article: 'Pasal 27A', text: 'Setiap orang dengan sengaja menyerang kehormatan atau nama baik orang lain dengan menuduhkan suatu hal melalui Sistem Elektronik dipidana penjara paling lama 2 tahun.' },
      { article: 'Pasal 40A', text: 'Pemerintah berwenang mewajibkan PSE untuk melakukan moderasi konten demi menciptakan ruang siber yang aman dan ramah anak.' }
    ],
    fullTextAvailable: true,
    tags: ['UU ITE', 'Siber', 'Pencemaran Nama Baik', 'PSE', 'Transaksi Elektronik']
  },
  {
    id: 'doc-uu-40-2007',
    title: 'Undang-Undang Nomor 40 Tahun 2007 tentang Perseroan Terbatas',
    shortTitle: 'UU No. 40/2007 (UU PT)',
    type: 'Undang-Undang',
    typeCode: 'uu',
    number: '40',
    year: 2007,
    sector: 'Korporasi & Bisnis',
    sectorCode: 'korporasi',
    status: 'Diubah',
    statusCode: 'diubah',
    promulgatedDate: '16 Agustus 2007',
    isProOnly: false,
    summary: 'Fondasi utama hukum perusahaan di Indonesia yang mengatur pendirian, anggaran dasar, organ perseroan (Direksi, Dewan Komisaris, RUPS), penggabungan, peleburan, dan pembubaran PT.',
    keyArticles: [
      { article: 'Pasal 97', text: 'Direksi bertanggung jawab penuh secara pribadi atas kerugian Perseroan apabila yang bersangkutan bersalah atau lalai menjalankan tugasnya.' },
      { article: 'Pasal 104', text: 'Dalam hal kepailitan terjadi karena kesalahan Direksi, anggota Direksi bertanggung jawab secara tanggung renteng atas seluruh kewajiban yang tidak dilunasi.' }
    ],
    fullTextAvailable: true,
    tags: ['PT', 'Perseroan Terbatas', 'Direksi', 'Komisaris', 'RUPS', 'Corporate Governance']
  },
  {
    id: 'doc-uu-1-2023',
    title: 'Undang-Undang Nomor 1 Tahun 2023 tentang Kitab Undang-Undang Hukum Pidana',
    shortTitle: 'UU No. 1/2023 (KUHP Nasional)',
    type: 'Undang-Undang',
    typeCode: 'uu',
    number: '1',
    year: 2023,
    sector: 'Hukum Pidana',
    sectorCode: 'pidana',
    status: 'Berlaku',
    statusCode: 'berlaku',
    promulgatedDate: '02 Januari 2023',
    isProOnly: true,
    summary: 'Rekodifikasi hukum pidana nasional menggantikan Wetboek van Strafrecht warisan kolonial. Memperkenalkan konsep pertanggungjawaban pidana korporasi, pidana alternatif kerja sosial, dan keadilan restoratif.',
    keyArticles: [
      { article: 'Pasal 45', text: 'Korporasi merupakan subjek tindak pidana dan dapat dijatuhi pidana pokok denda serta pidana tambahan berupa penutupan perusahaan atau ganti rugi.' }
    ],
    fullTextAvailable: true,
    tags: ['KUHP', 'Pidana', 'Pidana Korporasi', 'Restorative Justice']
  },

  // --- PERATURAN PEMERINTAH (PP) ---
  {
    id: 'doc-pp-35-2021',
    title: 'Peraturan Pemerintah Nomor 35 Tahun 2021 tentang Perjanjian Kerja Waktu Tertentu, Alih Daya, Waktu Kerja dan Waktu Istirahat, dan Pemutusan Hubungan Kerja',
    shortTitle: 'PP No. 35/2021 (PKWT & PHK)',
    type: 'Peraturan Pemerintah',
    typeCode: 'pp',
    number: '35',
    year: 2021,
    sector: 'Ketenagakerjaan & Korporasi',
    sectorCode: 'ketenagakerjaan',
    status: 'Berlaku',
    statusCode: 'berlaku',
    promulgatedDate: '02 Februari 2021',
    isProOnly: false,
    summary: 'Peraturan pelaksanaan turunan UU Cipta Kerja yang memuat formula perhitungan uang pesangon, uang penghargaan masa kerja, dan uang kompensasi PKWT secara terperinci.',
    keyArticles: [
      { article: 'Pasal 15', text: 'Pengusaha wajib memberikan uang kompensasi yang besarannya dihitung proporsional sesuai masa kerja pekerja PKWT yang telah berlangsung minimal 1 bulan.' }
    ],
    fullTextAvailable: true,
    tags: ['PP 35/2021', 'PKWT', 'PHK', 'Uang Kompensasi', 'Pesangon']
  },
  {
    id: 'doc-pp-5-2021',
    title: 'Peraturan Pemerintah Nomor 5 Tahun 2021 tentang Penyelenggaraan Perizinan Berusaha Berbasis Risiko',
    shortTitle: 'PP No. 5/2021 (OSS RBA)',
    type: 'Peraturan Pemerintah',
    typeCode: 'pp',
    number: '5',
    year: 2021,
    sector: 'Korporasi & Bisnis',
    sectorCode: 'korporasi',
    status: 'Berlaku',
    statusCode: 'berlaku',
    promulgatedDate: '02 Februari 2021',
    isProOnly: true,
    summary: 'Regulasi utama penetapan klasifikasi risiko usaha (Rendah, Menengah Rendah, Menengah Tinggi, dan Tinggi) dan dokumen perizinan berusaha yang dibutuhkan pada portal OSS RBA.',
    keyArticles: [
      { article: 'Pasal 10', text: 'Perizinan berusaha untuk tingkat risiko rendah cukup berupa NIB yang berlaku sebagai legalitas operasional dan izin edar.' }
    ],
    fullTextAvailable: true,
    tags: ['OSS RBA', 'NIB', 'Izin Usaha', 'Klasifikasi Risiko', 'BKPM']
  },

  // --- PUTUSAN PENGADILAN (MA & MK) ---
  {
    id: 'doc-putusan-mk-91-2020',
    title: 'Putusan Mahkamah Konstitusi Nomor 91/PUU-XVIII/2020 perihal Pengujian Formil UU No. 11 Tahun 2020 tentang Cipta Kerja',
    shortTitle: 'Putusan MK No. 91/PUU-XVIII/2020',
    type: 'Putusan Pengadilan',
    typeCode: 'putusan',
    number: '91/PUU-XVIII/2020',
    year: 2021,
    sector: 'Tata Negara & Ketenagakerjaan',
    sectorCode: 'tatanegara',
    status: 'Selesai',
    statusCode: 'berlaku',
    promulgatedDate: '25 November 2021',
    isProOnly: true,
    summary: 'Putusan monumental MK yang menyatakan pembentukan UU Cipta Kerja inkonstitusional bersyarat karena tidak memenuhi tata cara pembentukan peraturan perundang-undangan dan asas meaningful participation.',
    keyArticles: [
      { article: 'Amar Putusan', text: 'Menyatakan pembentukan UU Cipta Kerja bertentangan dengan UUD 1945 dan tidak mempunyai kekuatan hukum mengikat secara bersyarat jika tidak diperbaiki dalam waktu 2 tahun.' }
    ],
    fullTextAvailable: true,
    tags: ['Putusan MK', 'Inkonstitusional Bersyarat', 'Meaningful Participation', 'Cipta Kerja']
  },
  {
    id: 'doc-putusan-ma-123-2023',
    title: 'Putusan Mahkamah Agung Nomor 123 K/Pdt.Sus-HKI/2023 perihal Pembatalan Pendaftaran Merek Terkenal Internasional',
    shortTitle: 'Putusan MA No. 123 K/Pdt.Sus-HKI/2023',
    type: 'Putusan Pengadilan',
    typeCode: 'putusan',
    number: '123 K/Pdt.Sus-HKI/2023',
    year: 2023,
    sector: 'Hak Kekayaan Intelektual (HKI)',
    sectorCode: 'hki',
    status: 'Berkekuatan Hukum Tetap',
    statusCode: 'berlaku',
    promulgatedDate: '14 Juli 2023',
    isProOnly: true,
    summary: 'Yurisprudensi penting terkait pembatalan merek beritikad buruk (bad faith) yang mendompleng ketenaran merek asing yang belum terdaftar di kelas barang tertentu di Indonesia.',
    keyArticles: [
      { article: 'Pertimbangan Hukum', text: 'Pendaftaran merek yang memiliki persamaan pada pokoknya dengan merek terkenal asing yang diajukan oleh pemohon beritikad buruk harus dibatalkan demi hukum.' }
    ],
    fullTextAvailable: true,
    tags: ['Merek', 'HKI', 'Bad Faith', 'Itikad Buruk', 'Mahkamah Agung']
  },

  // --- ARTIKEL ANALISIS HUKUM & PREMIUM STORIES ---
  {
    id: 'art-analisa-ai-governance',
    title: 'Analisis Yuridis Surat Edaran Menkominfo No. 9/2023 tentang Etika Kecerdasan Artifisial (AI)',
    shortTitle: 'Analisis Panduan Etika AI Indonesia',
    type: 'Analisa Hukum',
    typeCode: 'analisa',
    number: '-',
    year: 2024,
    sector: 'Privasi Data & Siber',
    sectorCode: 'siber',
    status: 'Terbit',
    statusCode: 'berlaku',
    promulgatedDate: '15 Februari 2024',
    isProOnly: true,
    summary: 'Kajian komprehensif mengenai implikasi kepatuhan korporasi terhadap pemanfaatan AI generatif, transparansi algoritma, hak cipta output AI, dan mitigasi bias diskriminatif.',
    keyArticles: [
      { article: 'Kewajiban Etis', text: 'Pengembang dan pengguna AI wajib memastikan akuntabilitas hasil olah data, menjaga kerahasiaan data pribadi, dan menyediakan hak bantahan manusia.' }
    ],
    fullTextAvailable: true,
    tags: ['AI', 'Kecerdasan Artifisial', 'Etika AI', 'Kominfo', 'Siber', 'Teknologi']
  },
  {
    id: 'art-premium-ma-antitrust',
    title: 'Tren Penegakan Hukum Persaingan Usaha Pasca UU Cipta Kerja: Telaah Kasus Merger & Notifikasi KPPU',
    shortTitle: 'Telaah Notifikasi Merger KPPU',
    type: 'Premium Stories',
    typeCode: 'analisa',
    number: '-',
    year: 2024,
    sector: 'Korporasi & Bisnis',
    sectorCode: 'korporasi',
    status: 'Terbit',
    statusCode: 'berlaku',
    promulgatedDate: '02 Januari 2024',
    isProOnly: true,
    summary: 'Ulasan praktis panduan batas waktu pelaporan notifikasi post-merger ke KPPU, penghitungan aset gabungan, serta potensi denda keterlambatan hingga ratusan miliar rupiah.',
    keyArticles: [
      { article: 'Rujukan Praktik', text: 'Korporasi wajib menyampaikan notifikasi tertulis ke KPPU maksimal 30 hari kerja sejak penggabungan berlaku efektif secara yuridis.' }
    ],
    fullTextAvailable: true,
    tags: ['KPPU', 'Merger', 'Antitrust', 'Persaingan Usaha', 'M&A']
  },

  // --- KLINIK HUKUM (TANYA JAWAB GRATIS) ---
  {
    id: 'klinik-phk-pesangon',
    title: 'Bagaimana Cara Menghitung Uang Pesangon dan Kompensasi PHK bagi Karyawan Kontrak (PKWT)?',
    shortTitle: 'Cara Hitung Pesangon & Kompensasi PKWT',
    type: 'Klinik Hukum',
    typeCode: 'klinik',
    number: 'K-0921',
    year: 2024,
    sector: 'Ketenagakerjaan & Korporasi',
    sectorCode: 'ketenagakerjaan',
    status: 'Terjawab',
    statusCode: 'berlaku',
    promulgatedDate: '10 Januari 2024',
    isProOnly: false,
    summary: 'Penjelasan lengkap dan mudah dipahami mengenai hak pekerja kontrak saat masa kontraknya berakhir atau diputus di tengah jalan sesuai PP No. 35 Tahun 2021.',
    keyArticles: [
      { article: 'Rumus Kompensasi', text: 'Kompensasi = (Masa Kerja dalam bulan / 12) x 1 bulan Upah. Wajib dibayarkan setiap kali kontrak PKWT berakhir.' }
    ],
    fullTextAvailable: true,
    tags: ['Klinik', 'PHK', 'PKWT', 'Pesangon', 'Ketenagakerjaan']
  },
  {
    id: 'klinik-pembagian-waris',
    title: 'Aturan Pembagian Warisan untuk Anak Angkat Menurut Hukum Perdata Barat dan Kompilasi Hukum Islam',
    shortTitle: 'Hak Waris Anak Angkat',
    type: 'Klinik Hukum',
    typeCode: 'klinik',
    number: 'K-0844',
    year: 2023,
    sector: 'Perdata & Keluarga',
    sectorCode: 'perdata',
    status: 'Terjawab',
    statusCode: 'berlaku',
    promulgatedDate: '18 November 2023',
    isProOnly: false,
    summary: 'Ulasan yuridis perbandingan hak waris anak angkat dalam KUHPerdata melalui adopsi sah dan ketentuan wasiat wajibah dalam Kompilasi Hukum Islam (KHI).',
    keyArticles: [
      { article: 'Pasal 209 KHI', text: 'Anak angkat yang tidak menerima wasiat diberi wasiat wajibah sebanyak-banyaknya 1/3 dari harta warisan orang tua angkatnya.' }
    ],
    fullTextAvailable: true,
    tags: ['Klinik', 'Waris', 'Anak Angkat', 'KHI', 'KUHPerdata', 'Keluarga']
  }
];

export const FILTER_METADATA = {
  types: [
    { label: 'Semua Dokumen', value: 'all' },
    { label: 'Undang-Undang (UU)', value: 'uu' },
    { label: 'Peraturan Pemerintah (PP)', value: 'pp' },
    { label: 'Putusan Pengadilan (MA & MK)', value: 'putusan' },
    { label: 'Analisa Hukum & Stories', value: 'analisa' },
    { label: 'Klinik Hukum (Q&A)', value: 'klinik' }
  ],
  sectors: [
    { label: 'Semua Bidang Hukum', value: 'all' },
    { label: 'Privasi Data & Siber', value: 'siber' },
    { label: 'Ketenagakerjaan', value: 'ketenagakerjaan' },
    { label: 'Perbankan & Fintech', value: 'keuangan' },
    { label: 'Korporasi & Bisnis', value: 'korporasi' },
    { label: 'Hak Kekayaan Intelektual (HKI)', value: 'hki' },
    { label: 'Perdata & Keluarga', value: 'perdata' },
    { label: 'Hukum Pidana', value: 'pidana' }
  ],
  years: [
    { label: 'Semua Tahun', value: 'all' },
    { label: '2024 - 2026', value: 'recent' },
    { label: '2021 - 2023', value: 'mid' },
    { label: '2000 - 2020', value: 'past' }
  ],
  accessTiers: [
    { label: 'Semua Tingkat Akses', value: 'all' },
    { label: 'Terbuka / Gratis', value: 'free' },
    { label: 'Khusus Berlangganan Pro', value: 'pro' }
  ]
};

export const REVIEWS_AND_STATS = {
  totalRegulations: '180.000+',
  corporateClients: '1.500+',
  courtDecisions: '3.200.000+',
  accuracyRate: '99.8%',
  testimonials: [
    {
      name: 'Dr. Arifin Wijaya, S.H., LL.M.',
      role: 'Senior Partner, Wijaya & Rekan Law Firm',
      quote: 'Pusat Data dan Analisa Hukum platform ini menjadi rujukan utama tim litigasi kami sebelum menyusun memori kasasi. Kecepatan indeks dan keakuratan status keberlakuan peraturan sungguh tak tertandingi.',
      avatar: 'AW'
    },
    {
      name: 'Nathania Putri, S.H.',
      role: 'Head of Legal & Compliance, PT Finansial Digital Nusantara',
      quote: 'Regulatory Compliance System (RCS) telah memotong waktu audit kepatuhan perusahaan kami hingga 60%. Peringatan dini atas perubahan regulasi OJK dan BI sangat membantu mitigasi risiko.',
      avatar: 'NP'
    },
    {
      name: 'Prof. Budi Santoso, S.H., M.Hum.',
      role: 'Dekan Fakultas Hukum, Universitas Terkemuka',
      quote: 'University Solutions membuka gerbang riset tak terbatas bagi para mahasiswa dan peneliti kami. Sangat terstruktur, kredibel, dan esensial bagi pendidikan hukum nasional.',
      avatar: 'BS'
    }
  ]
};
