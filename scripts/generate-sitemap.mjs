import { writeFileSync } from 'fs';

const base = process.env.VITE_SITE_URL || 'https://gdgaasc.com';
const routes = ['/', '/about', '/events', '/gallery', '/team', '/projects', '/blog'];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(r => `  <url><loc>${base}${r}</loc></url>`).join('\n')}\n</urlset>`;

writeFileSync('public/sitemap.xml', xml);