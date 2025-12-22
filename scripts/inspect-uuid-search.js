// Inspect frontend data fetching (simulate frontend behavior)
async function inspect() {
    // When we visit a job page, Next.js or client fetches data.
    // The link in the UI is `/stilling/${uuid}`.
    // Let's try to fetch what the browser fetches. 
    // Usually it hits an internal API `api/stilling/[uuid]` which proxies to NAV.

    // But for IMPORT, we need direct access. 
    // Let's check if the UUID in search result is the same as the one used in the URL.

    const uuid = 'd64a8258-0d3d-4aa9-afd8-624ace433626';

    // Try the "provider" API if exists or just standard search with ID
    const url = `https://arbeidsplassen.nav.no/stillinger/api/search?q=${uuid}&_source=properties.adtext,title`;

    console.log(`Fetching ${url}...`);
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.hits && data.hits.hits.length > 0) {
            const hit = data.hits.hits[0];
            const src = hit._source;
            console.log('Title:', src.title);
            console.log('Adtext len:', src.properties?.adtext ? src.properties.adtext.length : 'missing');
        } else {
            console.log('No hits for UUID query');
        }
    } catch (e) {
        console.error(e);
    }
}

inspect();
