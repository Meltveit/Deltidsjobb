// Fetch single job details
async function inspect() {
    const uuid = 'd64a8258-0d3d-4aa9-afd8-624ace433626'; // Example UUID
    const url = `https://arbeidsplassen.nav.no/stillinger/api/stilling/${uuid}`;
    console.log(`Fetching ${url}...`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log('Failed to fetch single job:', response.status);
            return;
        }
        const data = await response.json();
        const src = data._source || data; // It might be direct object

        console.log('Keys:', Object.keys(src));
        if (src.properties) console.log('Props keys:', Object.keys(src.properties));
        if (src.properties?.adtext) console.log('Adtext found! Len:', src.properties.adtext.length);
    } catch (e) {
        console.error(e);
    }
}

inspect();
