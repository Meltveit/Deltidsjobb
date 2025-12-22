// Inspect description fields
async function inspect() {
    const url = 'https://arbeidsplassen.nav.no/stillinger/api/search?q=deltid&size=1';

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.hits && data.hits.hits && data.hits.hits.length > 0) {
            const hit = data.hits.hits[0];
            const src = hit._source;
            const props = src.properties;

            console.log('Props keys:', Object.keys(props));
            if (props.adtext) console.log('adtext len:', props.adtext.length);
            if (props.text) console.log('text len:', props.text.length);
            if (props.jobtext) console.log('jobtext len:', props.jobtext.length);
        }
    } catch (e) {
        console.error(e);
    }
}

inspect();
