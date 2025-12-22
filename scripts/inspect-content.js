// Inspect description fields
async function inspect() {
    const url = 'https://arbeidsplassen.nav.no/stillinger/api/search?q=startet&size=1'; // 'startet' might find newer ones, or just use 'deltid'

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.hits && data.hits.hits && data.hits.hits.length > 0) {
            const hit = data.hits.hits[0];
            const src = hit._source;
            console.log('Title:', src.title);
            console.log('Description (len):', src.description ? src.description.length : 0);
            console.log('Properties:', JSON.stringify(src.properties, null, 2));
            console.log('Occupation List:', JSON.stringify(src.occupationList, null, 2));
            console.log('Category List:', JSON.stringify(src.categoryList, null, 2));
        }
    } catch (e) {
        console.error(e);
    }
}

inspect();
