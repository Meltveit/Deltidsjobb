const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

async function testConnection() {
    // Read .env.local manually
    const envPath = path.join(__dirname, '..', '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/MONGODB_URI=(.+)/);

    if (!match) {
        console.error('Error: Could not find MONGODB_URI in .env.local');
        return;
    }

    const uri = match[1].trim();
    console.log('Testing connection...');

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Successfully connected to MongoDB!');
        const db = client.db('deltidsjobb');
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));
    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
        await client.close();
    }
}

testConnection();
