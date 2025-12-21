import { NextResponse } from 'next/server';
import { getActiveJobs } from '@/lib/models/Job';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Pagination parameters
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');

        const filters = {
            search: searchParams.get('search') || undefined,
            location: searchParams.get('location') || undefined,
            country: undefined, // Don't filter by country, show all Norwegian jobs
            sector: searchParams.get('sector') || undefined,
            employmentType: searchParams.get('employmentType') || undefined,
            tags: searchParams.getAll('tags') || undefined,
            page,
            limit,
        };

        const result = await getActiveJobs(filters);

        return NextResponse.json({
            jobs: result.jobs,
            total: result.total,
            page: result.page,
            totalPages: result.totalPages,
            hasMore: result.hasMore
        });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }
}
