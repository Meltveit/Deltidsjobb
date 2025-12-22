const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function clearNavJobs() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();
        // The DB name is often part of the URI or default. Let's try connecting and listing.
        // Or assume 'test' or get from URI.
        const db = client.db();
        console.log(`Connected to database: ${db.databaseName}`);

        const result = await db.collection('jobs').deleteMany({ source: 'nav' });
        console.log(`Deleted ${result.deletedCount} NAV jobs.`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

clearNavJobs();
