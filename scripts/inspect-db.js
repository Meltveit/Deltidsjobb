const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

// Load env correctly
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
} else {
    require('dotenv').config();
}

async function inspectDb() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI not found");
        return;
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('deltidsjobb'); // Default for Mongoose often 'test'

        const count = await db.collection('jobs').countDocuments({ source: 'nav' });
        console.log(`Found ${count} NAV jobs in 'test' database.`);

        // Show one to see structure
        if (count > 0) {
            const job = await db.collection('jobs').findOne({ source: 'nav' });
            console.log('Sample Job:', JSON.stringify(job, null, 2));
        }

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

inspectDb();
