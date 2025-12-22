// Test scraping description from public URL
const { JSDOM } = require('jsdom');

async function scrapeDescription() {
    const uuid = 'd64a8258-0d3d-4aa9-afd8-624ace433626'; // Example UUID
    const url = `https://arbeidsplassen.nav.no/stillinger/stilling/${uuid}`;
    console.log(`Scraping ${url}...`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log(`Failed to fetch: ${response.status}`);
            return;
        }
        const html = await response.text();
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        // Next.js sites often have __NEXT_DATA__
        const nextDataScript = doc.getElementById('__NEXT_DATA__');
        if (nextDataScript) {
            console.log('Found __NEXT_DATA__!');
            const json = JSON.parse(nextDataScript.textContent);
            console.log('Next Data Keys:', Object.keys(json));
            console.log('Props PageProps:', Object.keys(json.props?.pageProps || {}));

            // Try to find ad in pageProps
            const pageProps = json.props?.pageProps || {};
            const ad = pageProps.stilling || pageProps.ad || pageProps.job;

            if (ad) {
                console.log('Found Ad object in Props!');
                console.log('Ad keys:', Object.keys(ad));
                if (ad.properties?.adtext) {
                    console.log('FOUND ADTEXT in JSON! Length:', ad.properties.adtext.length);
                }
            } else {
                // Might be in queries/dehydratedState if using React Query
                console.log('Ad object not found directly. Checking dehydratedState...');
            }
        } else {
            console.log('__NEXT_DATA__ not found.');
        }

    } catch (e) {
        console.error(e);
    }
}

scrapeDescription();
