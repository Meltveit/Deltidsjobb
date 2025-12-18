// Script to add missing country field to existing jobs
// Run this once to fix jobs that don't have a country field

import { getDatabase } from '../lib/mongodb.js';

async function fixMissingCountries() {
    const db = await getDatabase();

    // Find all jobs without a country field
    const jobsWithoutCountry = await db.collection('jobs').find({
        country: { $exists: false }
    }).toArray();

    console.log(`Found ${jobsWithoutCountry.length} jobs without country field`);

    if (jobsWithoutCountry.length > 0) {
        // Update all jobs without country to have Norway as default
        const result = await db.collection('jobs').updateMany(
            { country: { $exists: false } },
            { $set: { country: 'Norway' } }
        );

        console.log(`✅ Updated ${result.modifiedCount} jobs with country: Norway`);
    }

    // Show updated jobs
    const updatedJobs = await db.collection('jobs').find({}).toArray();
    console.log('\nAll jobs now:');
    updatedJobs.forEach(job => {
        console.log(`- ${job.title} (${job.location}) - Country: ${job.country || 'MISSING'} - Status: ${job.status}`);
    });

    process.exit(0);
}

fixMissingCountries().catch(console.error);
