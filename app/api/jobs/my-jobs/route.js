import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getJobsByUserId } from '@/lib/models/Job';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Du må være innlogget' },
                { status: 401 }
            );
        }

        const jobs = await getJobsByUserId(session.user.id);

        return NextResponse.json({ jobs });
    } catch (error) {
        console.error('Error fetching user jobs:', error);
        return NextResponse.json(
            { error: 'Kunne ikke hente jobber' },
            { status: 500 }
        );
    }
}
