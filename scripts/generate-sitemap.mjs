import { writeFileSync } from 'fs';
const base = 'https://your-domain';
const routes = ['/', '/about', '/events', '/gallery', '/resources'];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(r => `  <url><loc>${base}${r}</loc></url>`).join('\n')}\n</urlset>`;
writeFileSync('public/sitemap.xml', xml);