import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

// This endpoint helps fix country names in database
// Run once: GET /api/fix-countries
export async function GET() {
    try {
        const db = await getDatabase();

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

            return NextResponse.json({
                success: true,
                message: `Updated ${result.modifiedCount} jobs from "Norge" to "Norway"`,
                jobsUpdated: result.modifiedCount
            });
        }

        return NextResponse.json({
            success: true,
            message: 'No jobs found with country: "Norge"',
            jobsUpdated: 0
        });
    } catch (error) {
        console.error('Error fixing countries:', error);
        return NextResponse.json({ error: 'Failed to fix countries' }, { status: 500 });
    }
}
