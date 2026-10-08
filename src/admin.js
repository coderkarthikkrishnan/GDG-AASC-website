// src/admin.js
import { site } from './siteConfig';
import { getAuth } from 'firebase/auth';

export function isAdmin() {
    try {
        const url = new URL(window.location.href);
        const queryAdmin = url.searchParams.get('admin');
        const envAdmin = import.meta.env.VITE_SHOW_ADMIN === '1';
        const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('gdg_admin') === '1' : false;
        const auth = getAuth();
        const email = auth?.currentUser?.email;
        const emailMatch = email && site.adminEmail && email.toLowerCase() === site.adminEmail.toLowerCase();
        return !!(emailMatch || site.showAdminNav || envAdmin || stored || queryAdmin === '1');
    } catch {
        return !!site.showAdminNav; // SSR-safe fallback
    }
}

export function setAdminMode(on) {
    try {
        if (on) localStorage.setItem('gdg_admin', '1');
        else localStorage.removeItem('gdg_admin');
    } catch {
        // ignore
    }
}
