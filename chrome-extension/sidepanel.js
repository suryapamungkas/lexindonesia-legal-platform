/**
 * Side Panel Script
 */

const MINI_LAWS = [
  {
    id: 'uu-27-2022',
    title: 'UU No. 27 Tahun 2022 (Pelindungan Data Pribadi)',
    status: 'Berlaku',
    summary: 'Kewajiban Pengendali Data, penunjukan DPO, dan sanksi denda hingga 2% omzet tahunan.'
  },
  {
    id: 'uu-6-2023',
    title: 'UU No. 6 Tahun 2023 (Cipta Kerja)',
    status: 'Berlaku',
    summary: 'Penyederhanaan OSS RBA, aturan PKWT & pesangon, serta kemudahan pendirian PT perorangan.'
  },
  {
    id: 'uu-1-2024',
    title: 'UU No. 1 Tahun 2024 (Perubahan Kedua UU ITE)',
    status: 'Berlaku',
    summary: 'Pasal 27A pencemaran nama baik, moderasi konten, dan perlindungan anak di ranah siber.'
  },
  {
    id: 'pp-35-2021',
    title: 'PP No. 35 Tahun 2021 (PKWT, Alih Daya & PHK)',
    status: 'Berlaku',
    summary: 'Tata cara kompensasi PKWT dan formula perhitungan pesangon.'
  }
];

document.addEventListener('DOMContentLoaded', async () => {
  const searchInput = document.getElementById('side-search-input');
  const searchBtn = document.getElementById('btn-side-search');
  const resultsList = document.getElementById('side-results-list');
  const selectionBox = document.getElementById('selection-box');
  const selectionTextEl = document.getElementById('selected-text-preview');
  const saveSelectionBtn = document.getElementById('btn-save-selection-to-ws');
  const syncStatus = document.getElementById('side-sync-status');

  // Cek apakah ada query terakhir
  const stored = await chrome.storage.local.get(['lastQuery', 'lastSelection']);
  if (stored.lastSelection) {
    selectionBox.style.display = 'block';
    selectionTextEl.textContent = `"${stored.lastSelection}"`;
  }

  if (stored.lastQuery) {
    searchInput.value = stored.lastQuery;
    renderResults(stored.lastQuery);
  } else {
    renderResults('');
  }

  searchBtn.addEventListener('click', () => {
    renderResults(searchInput.value.trim());
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      renderResults(searchInput.value.trim());
    }
  });

  saveSelectionBtn.addEventListener('click', async () => {
    const text = selectionTextEl.textContent;
    const currentNotes = (await chrome.storage.local.get('extensionNotes')).extensionNotes || [];
    currentNotes.push({ text, timestamp: new Date().toISOString() });
    await chrome.storage.local.set({ extensionNotes: currentNotes });
    syncStatus.textContent = 'Anotasi Tersimpan!';
    setTimeout(() => { syncStatus.textContent = 'Workspace Siap'; }, 2000);
  });

  function renderResults(q) {
    const query = q.toLowerCase();
    const filtered = query
      ? MINI_LAWS.filter(l => l.title.toLowerCase().includes(query) || l.summary.toLowerCase().includes(query))
      : MINI_LAWS;

    if (filtered.length === 0) {
      resultsList.innerHTML = '<p style="font-size: 0.8125rem; color: #64748B; text-align: center; padding: 1.5rem;">Tidak ada peraturan terkait ditemukan.</p>';
      return;
    }

    resultsList.innerHTML = filtered.map(item => `
      <div class="card">
        <div class="card-header">
          <span class="badge badge-success">${item.status}</span>
          <span class="badge badge-pro">PRO</span>
        </div>
        <h4 class="card-title">${item.title}</h4>
        <p class="card-summary">${item.summary}</p>
        <div class="card-actions">
          <button type="button" class="btn-sm" data-action="open-full" data-id="${item.id}">Buka di Platform</button>
        </div>
      </div>
    `).join('');

    resultsList.querySelectorAll('[data-action="open-full"]').forEach(btn => {
      btn.addEventListener('click', () => {
        chrome.tabs.create({ url: 'http://localhost:3000#section-search' });
      });
    });
  }
});
