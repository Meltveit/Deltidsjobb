
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

        // Regex logic copy-paste
        let description = '';
        const startMarker = 'Om jobben';
        const startIndex = html.indexOf(startMarker);

        if (startIndex !== -1) {
            const potentialEnds = ['Søk på jobben', 'Om bedriften', 'Kontaktperson', 'Arbeidssted', 'Du får'];
            let endIndex = html.length;
            for (const end of potentialEnds) {
                const idx = html.indexOf(end, startIndex + startMarker.length);
                if (idx !== -1 && idx < endIndex) {
                    endIndex = idx;
                }
            }
            let rawChunk = html.substring(startIndex + startMarker.length, endIndex);
            description = rawChunk.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
        }
        return description;
    } catch (e) {
        console.error(`Error scraping description for ${uuid}:`, e.message);
        return '';
    }
}

// ... Main Logic ...
async function run() {
    console.log('Starting debug run...');

    // 1. Fetch search
    const NAV_API_URL = 'https://arbeidsplassen.nav.no/stillinger/api/search';
    const query = 'deltid';
    const url = `${NAV_API_URL}?q=${encodeURIComponent(query)}&size=1&sort=published:desc`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const hits = data.hits.hits.map(h => h._source);

        console.log(`Found ${hits.length} hits.`);

        for (const navJob of hits) {
            console.log('Processing:', navJob.title);

            // Map
            // Simulate mapNavJobToInternal logic locally
            // ...

            // Fetch Description
            const desc = await fetchDescriptionFromPage(navJob.uuid);
            console.log('Fetched Description:', desc ? desc.substring(0, 50) + '...' : 'EMPTY');

            // Simulate DB insert
            // ...
        }

    } catch (e) {
        console.error('Debug run error:', e);
    }
}

run();
