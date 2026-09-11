/**
 * Helper Utilities
 */

export function escapeHTML(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function highlightMatches(text, query) {
  if (!query || !query.trim() || !text) return escapeHTML(text);
  const words = query.trim().split(/\s+/).filter(w => w.length > 1).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (words.length === 0) return escapeHTML(text);
  const regex = new RegExp(`(${words.join('|')})`, 'gi');
  return escapeHTML(text).replace(regex, '<mark class="search-highlight">$1</mark>');
}

export function getStatusBadgeHTML(status) {
  const s = (status || '').toLowerCase();
  if (s.includes('berlaku') || s.includes('selesai') || s.includes('terbit') || s.includes('terjawab') || s.includes('tetap')) {
    return `<span class="badge badge-success"><span class="badge-dot"></span>${escapeHTML(status)}</span>`;
  }
  if (s.includes('diubah')) {
    return `<span class="badge badge-warning"><span class="badge-dot"></span>${escapeHTML(status)}</span>`;
  }
  if (s.includes('dicabut') || s.includes('batal')) {
    return `<span class="badge badge-danger"><span class="badge-dot"></span>${escapeHTML(status)}</span>`;
  }
  return `<span class="badge badge-neutral">${escapeHTML(status)}</span>`;
}

export function getSectorBadgeHTML(sector) {
  return `<span class="badge badge-sector">${escapeHTML(sector)}</span>`;
}

export function getProBadgeHTML(isPro) {
  if (isPro) {
    return `<span class="badge badge-pro"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>PRO</span>`;
  }
  return `<span class="badge badge-free">GRATIS</span>`;
}
