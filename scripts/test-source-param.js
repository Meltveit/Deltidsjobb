// Test _source param
async function inspect() {
    const url = 'https://arbeidsplassen.nav.no/stillinger/api/search?q=deltid&size=1&_source=properties.adtext,title,properties.jobtext';
    console.log(`Fetching ${url}...`);

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.hits && data.hits.hits && data.hits.hits.length > 0) {
            const hit = data.hits.hits[0];
            const src = hit._source;
            console.log('Title:', src.title);
            if (src.properties) {
                console.log('Adtext len:', src.properties.adtext ? src.properties.adtext.length : 'missing');
                console.log('Jobtext len:', src.properties.jobtext ? src.properties.jobtext.length : 'missing');
            } else {
                console.log('Properties missing');
            }
        }
    } catch (e) {
        console.error(e);
    }
}

inspect();
