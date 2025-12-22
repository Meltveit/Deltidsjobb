// Inspect FULL hit structure
async function inspect() {
    const url = 'https://arbeidsplassen.nav.no/stillinger/api/search?q=deltid&size=1';
    console.log(`Fetching ${url}...`);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.hits && data.hits.hits && data.hits.hits.length > 0) {
            console.log(JSON.stringify(data.hits.hits[0], null, 2));
        } else {
            console.log('No hits found.');
        }
    } catch (e) {
        console.error(e);
    }
}

inspect();
