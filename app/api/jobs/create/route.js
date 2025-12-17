import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { createJob } from '@/lib/models/Job';

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Du må være innlogget' },
                { status: 401 }
            );
        }

        const jobData = await request.json();

        // Validation
        if (!jobData.title || !jobData.description || !jobData.tags || !jobData.sector || !jobData.location || !jobData.email) {
            return NextResponse.json(
                { error: 'Alle feltene er påkrevd' },
                { status: 400 }
            );
        }

        if (jobData.tags.length === 0 || jobData.tags.length > 6) {
            return NextResponse.json(
                { error: 'Du må velge mellom 1 og 6 tags' },
                { status: 400 }
            );
        }

        // Create job with user ID
        const job = await createJob({
            ...jobData,
            userId: session.user.id,
            companyName: session.user.companyName,
        });

        return NextResponse.json(
            { message: 'Jobb opprettet', jobId: job._id },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create job error:', error);
        return NextResponse.json(
            { error: 'Kunne ikke opprette jobb' },
            { status: 500 }
        );
    }
}
