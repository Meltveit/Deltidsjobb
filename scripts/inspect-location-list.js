// Inspect locationList structure
async function inspect() {
    const url = 'https://arbeidsplassen.nav.no/stillinger/api/search?q=deltid&size=1';

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.hits && data.hits.hits && data.hits.hits.length > 0) {
            const hit = data.hits.hits[0];
            const src = hit._source;
            console.log('locationList:', JSON.stringify(src.locationList, null, 2));
        }
    } catch (e) {
        console.error(e);
    }
}

inspect();
