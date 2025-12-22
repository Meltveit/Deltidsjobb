const fetch = global.fetch;

async function run() {
    const uuid = '34ea43fc-4aed-4306-b8d8-efa1ecd20872';
    const url = `https://arbeidsplassen.nav.no/stillinger/stilling/${uuid}`;
    console.log(`Fetching ${url}...`);
    const res = await fetch(url);
    const html = await res.text();

    const startM = 'Om jobben';
    const idx = html.indexOf(startM);
    const fs = require('fs');
    if (idx !== -1) {
        console.log('Found "Om jobben".');
        const snippet = html.substring(idx, idx + 10000);
        fs.writeFileSync('debug_html_full.txt', snippet, 'utf8');
        console.log('Written to debug_html_full.txt');
    } else {
        console.log('"Om jobben" not found.');
    }
}

run();
