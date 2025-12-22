const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function inspect() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('Missing MONGODB_URI');
        return;
    }
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('deltidsjobb'); // Hardcoded based on previous success

        const jobs = await db.collection('jobs').find({ source: 'nav' }).limit(5).sort({ _id: -1 }).toArray();

        console.log(`Found ${jobs.length} NAV jobs (showing latest 5).`);
        jobs.forEach(job => {
            console.log(`Title: ${job.title}`);
            console.log(`Sector: ${job.sector}`);
            console.log(`Desc Len: ${job.description ? job.description.length : 0}`);
            const preview = job.description ? job.description.substring(0, 150) : 'N/A';
            console.log(`Desc Preview: ${preview.replace(/\n/g, ' ')}...`);
            console.log('---');
        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

inspect();
