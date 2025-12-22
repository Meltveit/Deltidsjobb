const { importNavJobs } = require('../services/navService');
// We need to handle the alias in navService too OR register it. 
// Easier to just use a script that doesn't rely on the service if the service uses aliases.
// Wait, navService uses 'import' (ESM) and aliases. 
// We should use a different approach or registers.
// Let's create a trigger script that hits the API, so we run in Next.js context.
const path = require('path');
const fs = require('fs');

// Load environment variables
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
} else {
    require('dotenv').config();
}

async function run() {
    console.log('Force updating jobs with new logic...');
    const db = await getDatabase();

    // Optional: clear existing NAV jobs to re-import them correctly
    // or we can just rely on the script to upsert/update if we change logic slightly
    // but the import script usually checks for existence and skips. 
    // Let's delete NAV jobs to force fresh import with new tags/locations.

    console.log('Clearing old NAV jobs to allow fresh import...');
    await db.collection('jobs').deleteMany({ source: 'nav' });
    console.log('Old jobs cleared.');

    const count = await importNavJobs(50);
    console.log(`Successfully re-imported ${count} jobs.`);
    process.exit(0);
}

run();
