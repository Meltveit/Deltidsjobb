import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const db = await getDatabase();

        // Get total active jobs
        const totalJobs = await db.collection('jobs').countDocuments({
            status: 'active',
            expiresAt: { $gt: new Date() }
        });

        // Get job counts by tag (aggregation)
        const tagCounts = await db.collection('jobs').aggregate([
            {
                $match: {
                    status: 'active',
                    expiresAt: { $gt: new Date() }
                }
            },
            { $unwind: '$tags' },
            {
                $group: {
                    _id: { $toLower: '$tags' }, // Case-insensitive grouping
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 20 } // Top 20 tags
        ]).toArray();

        // Get job counts by sector
        const sectorCounts = await db.collection('jobs').aggregate([
            {
                $match: {
                    status: 'active',
                    expiresAt: { $gt: new Date() }
                }
            },
            {
                $group: {
                    _id: '$sector',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]).toArray();

        // Get job counts by city
        const cityCounts = await db.collection('jobs').aggregate([
            {
                $match: {
                    status: 'active',
                    expiresAt: { $gt: new Date() }
                }
            },
            {
                $group: {
                    _id: '$location',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 10 } // Top 10 cities
        ]).toArray();

        return NextResponse.json({
            totalJobs,
            tagCounts: tagCounts.map(t => ({ tag: t._id, count: t.count })),
            sectorCounts: sectorCounts.map(s => ({ sector: s._id, count: s.count })),
            cityCounts: cityCounts.map(c => ({ city: c._id, count: c.count }))
        });
    } catch (error) {
        console.error('Error getting job stats:', error);
        return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 });
    }
}
