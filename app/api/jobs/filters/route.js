import { NextResponse } from 'next/server';
import { getUniqueCities } from '@/lib/models/Job';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const country = searchParams.get('country') || undefined;

        const cities = await getUniqueCities(country);

        return NextResponse.json({ cities });
    } catch (error) {
        console.error('Error fetching cities:', error);
        return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
    }
}
