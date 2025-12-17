import { NextResponse } from 'next/server';
import { getActiveJobs } from '@/lib/models/Job';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const filters = {
            search: searchParams.get('search') || undefined,
            location: searchParams.get('location') || undefined,
            sector: searchParams.get('sector') || undefined,
            tags: searchParams.getAll('tags') || undefined,
        };

        const jobs = await getActiveJobs(filters);

        return NextResponse.json({ jobs });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }
}
