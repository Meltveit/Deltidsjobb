
// Mock DB
const db = {
    collection: () => ({
        findOne: async () => null,
        insertOne: async (doc) => console.log('Insert job:', doc.title, doc.sector, doc.description ? doc.description.length : 0),
        find: () => ({ limit: () => ({ toArray: async () => [] }) })
    })
};

// Mock Sector Map
const occupationMap = {
    'Butikk': 'Butikk',
    // ... minimal map
};
function getSector(navJob) {
    return 'Butikk'; // simple mock
}

// Imports
const fetch = global.fetch; // Node 18+

// ... Copy paste helper functions from navService ...

function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function extractTags(navJob) {
    return ['TestTag'];
}

async function fetchDescriptionFromPage(uuid) {
    try {
        const url = `https://arbeidsplassen.nav.no/stillinger/stilling/${uuid}`;
        console.log(`Fetching ${url}...`);
        const res = await fetch(url);
        if (!res.ok) return '';
        const html = await res.text();

        // Improved scraping: look for semantic section or role="main" or class containing "description"
        // But since we use regex, let's look for known boundaries.
        // "Om jobben" is good.
        // Let's also look for "job-posting-text" or similar if we knew the class.

        // Simpler: Split by "Om jobben"
        const parts = html.split('Om jobben');
        if (parts.length > 1) {
            // Get content AFTER "Om jobben"
            let content = parts[1];

            // 1. Skip metadata / apply box (Start content AFTER these)
            // The metadata usually ends with a "Søk på jobben" box containing "Gå til søknad".
            const startMarkers = ['Gå til søknad', 'Søk på jobben'];
            for (const marker of startMarkers) {
                const idx = content.indexOf(marker);
                // Only skip if it's found early (e.g. in the first 1500 chars) to avoid false positives deep in text
                if (idx !== -1 && idx < 1500) {
                    content = content.substring(idx + marker.length);
                }
            }

            // 2. Cut off at end markers (Footer sections)
            const endMarkers = ['Om bedriften', 'Kontaktperson', '<footer', 'Annonsedata', 'Du får'];
            let endIndex = content.length;
            for (const marker of endMarkers) {
                const idx = content.indexOf(marker);
                if (idx !== -1 && idx < endIndex) {
                    endIndex = idx;
                }
            }
            content = content.substring(0, endIndex);

            // Strip tags
            return content.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
        }
        return '';
    } catch (e) {
        console.error(`Error scraping description for ${uuid}:`, e.message);
        return '';
    }
}

// ... Main Logic ...
async function run() {
    console.log('Starting debug run for specific UUID...');
    const uuid = '34ea43fc-4aed-4306-b8d8-efa1ecd20872'; // KIWI Lunde

    // Fetch Description
    const desc = await fetchDescriptionFromPage(uuid);
    console.log('---------------------------------------------------');
    console.log('Fetched Description Length:', desc.length);
    console.log('Preview:', desc.substring(0, 500));
    console.log('---------------------------------------------------');
}

run();
