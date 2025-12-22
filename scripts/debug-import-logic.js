
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

        let content = '';

        // Strategy 1: Look for "job-posting-text" class (common in NAV internal apps)
        const jobTextClass = 'job-posting-text';
        const classIdx = html.indexOf(jobTextClass);

        if (classIdx !== -1) {
            console.log('Strategy 1: Found job-posting-text at', classIdx);
            // Find the end of the opening tag
            const tagEnd = html.indexOf('>', classIdx);
            if (tagEnd !== -1) {
                content = html.substring(tagEnd + 1);
                console.log('Strategy 1 Raw Start:', content.substring(0, 100));
            }
        } else {
            console.log('Strategy 1: job-posting-text NOT FOUND');
        }

        // Strategy 2: Fallback to "Om jobben" split
        if (!content) {
            console.log('Strategy 2: Fallback to Om jobben');
            const parts = html.split('Om jobben');
            if (parts.length > 1) {
                content = parts[1];
                // 1. Skip metadata / apply box (Start content AFTER these)
                const startMarkers = ['Gå til søknad', 'Søk på jobben'];
                for (const marker of startMarkers) {
                    const idx = content.indexOf(marker);
                    if (idx !== -1 && idx < 5000) {
                        console.log('Strategy 2: Found marker', marker, 'at', idx);
                        content = content.substring(idx + marker.length);
                        break;
                    }
                }
            }
        }

        if (content) {
            // Cut off at end markers (Footer sections)
            const endMarkers = ['Om bedriften', 'Kontaktperson', '<footer', 'Annonsedata', 'Du får'];
            let endIndex = content.length;
            for (const marker of endMarkers) {
                const idx = content.indexOf(marker);
                if (idx !== -1 && idx < endIndex) {
                    console.log('Found End Marker:', marker, 'at', idx);
                    endIndex = idx;
                }
            }
            content = content.substring(0, endIndex);

            // Strip tags and normalize whitespace
            const striped = content.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
            console.log('Final Strip Start:', striped.substring(0, 100));
            return striped;
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
