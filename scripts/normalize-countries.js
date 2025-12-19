// Script to normalize country names in database
// Run this once to fix jobs that have "Norge" instead of "Norway"

import { getDatabase } from '../lib/mongodb.js';

async function normalizeCountries() {
    const db = await getDatabase();

    console.log('Starting country normalization...');

    // Find all jobs with "Norge"
    const jobsWithNorge = await db.collection('jobs').find({
        country: "Norge"
    }).toArray();

    console.log(`Found ${jobsWithNorge.length} jobs with country: "Norge"`);

    if (jobsWithNorge.length > 0) {
        // Update all to "Norway"
        const result = await db.collection('jobs').updateMany(
            { country: "Norge" },
            { $set: { country: "Norway" } }
        );

        console.log(`✅ Updated ${result.modifiedCount} jobs to country: "Norway"`);
    }

    // Show all jobs with their countries
    const allJobs = await db.collection('jobs').find({}).project({
        title: 1,
        location: 1,
        country: 1,
        status: 1
    }).toArray();

    console.log('\nAll jobs:');
    allJobs.forEach(job => {
        console.log(`- ${job.title} (${job.location}) - Country: ${job.country || 'MISSING'} - Status: ${job.status}`);
    });

    process.exit(0);
}

normalizeCountries().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
