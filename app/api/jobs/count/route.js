import { NextResponse } from 'next/server';
import { getJobCountByCountry } from '@/lib/models/Job';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country') || 'Norway';

        const count = await getJobCountByCountry(country);

        return NextResponse.json({ count, country });
    } catch (error) {
        console.error('Error getting job count:', error);
        return NextResponse.json({ error: 'Failed to get job count' }, { status: 500 });
    }
}
