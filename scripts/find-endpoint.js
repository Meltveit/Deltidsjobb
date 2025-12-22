// Try to find the correct single job endpoint
async function testEndpoints() {
    // We need a fresh UUID from search first
    const searchUrl = 'https://arbeidsplassen.nav.no/stillinger/api/search?q=deltid&size=1';
    let uuid;
    try {
        const sRes = await fetch(searchUrl);
        const sData = await sRes.json();
        if (sData.hits && sData.hits.hits.length > 0) {
            uuid = sData.hits.hits[0]._id;
            console.log('Found UUID:', uuid);
        }
    } catch (e) {
        console.error('Search failed', e);
        return;
    }

    if (!uuid) return;

    const endpoints = [
        `https://arbeidsplassen.nav.no/stillinger/api/stilling/${uuid}`,
        `https://arbeidsplassen.nav.no/stillinger/api/ad/${uuid}`,
        `https://arbeidsplassen.nav.no/api/v1/ads/${uuid}`,
        `https://arbeidsplassen.nav.no/public-feed/api/v1/ads/${uuid}`,
        `https://arbeidsplassen.nav.no/api/stilling/${uuid}`,
        `https://arbeidsplassen.nav.no/api/ad/${uuid}`,
        `https://arbeidsplassen.nav.no/stillinger/api/stillinger/${uuid}`,
        // Maybe it uses the integer ID if it has one? But the UUID is standard.
    ];

    for (const url of endpoints) {
        console.log(`Trying ${url}...`);
        try {
            const res = await fetch(url);
            console.log(`Status: ${res.status}`);
            if (res.ok) {
                const data = await res.json();
                const src = data._source || data;
                const adtext = src.properties?.adtext || src.description;
                console.log(`SUCCESS! Found adtext length: ${adtext ? adtext.length : 'null'}`);
                // console.log(JSON.stringify(src, null, 2));
                return; // Found it
            }
        } catch (e) {
            console.log(`Error fetching ${url}:`, e.message);
        }
    }
}

testEndpoints();
