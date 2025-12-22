// Inspect Search API response again to check location structure
const fs = require('fs');

async function inspect() {
    const url = 'https://arbeidsplassen.nav.no/stillinger/api/search?q=deltid&size=5';
    console.log(`Fetching ${url}...`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Failed:', response.status, response.statusText);
            return;
        }
        const data = await response.json();

        if (data.hits && data.hits.hits && data.hits.hits.length > 0) {
            data.hits.hits.forEach((hit, i) => {
                const src = hit._source;
                console.log(`Job ${i}: ${src.title}`);
                console.log('  Locations:', JSON.stringify(src.workLocations, null, 2));
            });
        } else {
            console.log('No hits found.');
        }
    } catch (e) {
        console.error(e);
    }
}

inspect();
