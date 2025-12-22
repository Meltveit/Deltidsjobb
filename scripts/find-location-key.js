// Find location key
async function inspect() {
    const url = 'https://arbeidsplassen.nav.no/stillinger/api/search?q=deltid&size=1';
    console.log(`Fetching ${url}...`);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.hits && data.hits.hits && data.hits.hits.length > 0) {
            const hit = data.hits.hits[0];
            const src = hit._source;

            console.log('Hit Keys:', Object.keys(hit));
            console.log('Source Keys:', Object.keys(src));

            // Check for potential location fields
            console.log('hit.locations:', JSON.stringify(hit.locations, null, 2));
            console.log('src.locations:', JSON.stringify(src.locations, null, 2));
            console.log('src.workLocations:', JSON.stringify(src.workLocations, null, 2));
            console.log('src.location:', JSON.stringify(src.location, null, 2));
            console.log('src.jobLocation:', JSON.stringify(src.jobLocation, null, 2));
        }
    } catch (e) {
        console.error(e);
    }
}

inspect();
