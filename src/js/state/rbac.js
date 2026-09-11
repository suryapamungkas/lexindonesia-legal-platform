/**
 * Role-Based Access Control (RBAC) State Manager
 * Mengelola status tingkatan pengguna: 'free' (Tingkat Gratis) vs 'pro' (Berlangganan Pro).
 * Menyediakan event listener reaktif agar seluruh UI memperbarui status akses seketika.
 */

const STORAGE_KEY = 'lex_user_role';

export const USER_ROLES = {
  FREE: 'free',
  PRO: 'pro'
};

class RBACManager {
  constructor() {
    // Muat role tersimpan atau default ke 'free'
    const saved = localStorage.getItem(STORAGE_KEY);
    this.currentRole = saved === USER_ROLES.PRO ? USER_ROLES.PRO : USER_ROLES.FREE;
    this.listeners = new Set();
  }

  getRole() {
    return this.currentRole;
  }

  isPro() {
    return this.currentRole === USER_ROLES.PRO;
  }

  setRole(role) {
    if (role !== USER_ROLES.FREE && role !== USER_ROLES.PRO) return;
    this.currentRole = role;
    localStorage.setItem(STORAGE_KEY, role);
    this.notify();
  }

  toggleRole() {
    const nextRole = this.isPro() ? USER_ROLES.FREE : USER_ROLES.PRO;
    this.setRole(nextRole);
    return nextRole;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    // Jalankan segera saat subscribe
    callback(this.currentRole);
    return () => this.listeners.delete(callback);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.currentRole);
      } catch (err) {
        console.error('RBAC listener error:', err);
      }
    }
  }

  canAccessDocument(doc) {
    if (!doc.isProOnly) return true;
    return this.isPro();
  }
}

export const rbacState = new RBACManager();
