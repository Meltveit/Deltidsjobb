const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

async function checkUser(email) {
    // Read .env.local manually
    const envPath = path.join(__dirname, '..', '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/MONGODB_URI=(.+)/);

    if (!match) {
        console.error('Error: Could not find MONGODB_URI in .env.local');
        return;
    }

    const uri = match[1].trim();
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('deltidsjobb');
        console.log(`Checking for user: ${email}`);

        const user = await db.collection('users').findOne({ email: email.toLowerCase() });

        if (user) {
            console.log('User FOUND in database:', {
                _id: user._id,
                email: user.email,
                companyName: user.companyName,
                createdAt: user.createdAt
            });
        } else {
            console.log('User NOT found in database.');

            // Try to list all users to see if there are any
            const count = await db.collection('users').countDocuments();
            console.log(`Total users in database: ${count}`);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

// Check with the email from your screenshot
checkUser('christopher@strjona.eu');
