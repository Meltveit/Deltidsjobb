import { NextResponse } from 'next/server';
import { getAllTags } from '@/lib/models/Tag';

export async function GET() {
    try {
        const tags = await getAllTags();
        return NextResponse.json({ tags });
    } catch (error) {
        console.error('Error fetching tags:', error);
        return NextResponse.json(
            { error: 'Could not fetch tags' },
            { status: 500 }
        );
    }
}
