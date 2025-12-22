// Inspect the jobs in DB to see if description is populated
import { getDatabase } from '@/lib/mongodb';

async function inspect() {
    const db = await getDatabase();
    const jobs = await db.collection('jobs').find({ source: 'nav' }).limit(5).toArray();

    console.log(`Found ${jobs.length} jobs.`);
    jobs.forEach(job => {
        console.log(`Title: ${job.title}`);
        console.log(`Sector: ${job.sector}`);
        console.log(`Desc Len: ${job.description ? job.description.length : 0}`);
        console.log(`Desc Preview: ${job.description ? job.description.substring(0, 100) : 'N/A'}`);
        console.log('---');
    });
}

inspect();
