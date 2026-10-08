// URL helpers for image fields

export function isValidHttpUrl(value) {
    try {
        const u = new URL(value);
        return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
        return false;
    }
}

// Normalize common share links to a direct-view image URL when possible
export function normalizeImageUrl(url) {
    if (!url) return url;
    let v = url.trim();
    try {
        const u = new URL(v);
        const host = u.hostname;

        // Google Drive patterns
        // 1) https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing
        // 2) https://drive.google.com/open?id=<FILE_ID>
        // 3) https://drive.google.com/uc?id=<FILE_ID>&export=download
        if (host.endsWith('drive.google.com')) {
            // file/d/<id>
            const fileMatch = u.pathname.match(/\/file\/d\/([^/]+)/);
            let id = fileMatch ? fileMatch[1] : null;
            if (!id) {
                // open?id= or uc?id=
                id = u.searchParams.get('id');
            }
            if (id) {
                // Use thumbnail endpoint; generally more reliable for <img> embedding
                // You can adjust size via sz= (e.g., w1000)
                return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
            }
        }

        // If it's already a valid http(s) URL and not a known shortener, return as-is
        return v;
    } catch {
        return v;
    }
}
