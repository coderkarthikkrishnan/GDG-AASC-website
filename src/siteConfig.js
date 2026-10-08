// src/siteConfig.js
export const site = {
    name: 'GDG on Campus — Alpha Arts And Science College',
    mission: 'Connecting Student Developers Through Talks, Workshops, and Projects.',
    // Set to true to always show admin links (New/Seed/Edit/Delete). For ad-hoc, use
    // ?admin=1 in the URL or set VITE_SHOW_ADMIN=1, or toggle via localStorage (see admin.js).
    showAdminNav: false,
    adminEmail: import.meta.env.VITE_ADMIN_EMAIL,
    socials: {
        discord: 'https://discord.com',
        instagram: 'https://instagram.com',
        twitter: 'https://twitter.com',
        email: 'mailto:chapter@example.com',
    },
    team: [
        { name: 'Organizer Name', role: 'Organizer', link: 'https://linkedin.com' },
        { name: 'Co-organizer Name', role: 'Co-organizer', link: 'https://github.com' },
        { name: 'Core Team', role: 'Core Member', link: 'https://example.com' },
    ],
};
