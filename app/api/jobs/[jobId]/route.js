import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getJobById, updateJob } from '@/lib/models/Job';

export async function GET(request, { params }) {
    try {
        const jobId = params.jobId;
        const job = await getJobById(jobId);

        if (!job) {
            return NextResponse.json(
                { error: 'Jobb ikke funnet' },
                { status: 404 }
            );
        }

        return NextResponse.json({ job });
    } catch (error) {
        console.error('Error fetching job:', error);
        return NextResponse.json(
            { error: 'Kunne ikke hente jobb' },
            { status: 500 }
        );
    }
}

export async function PATCH(request, { params }) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Du må være innlogget' },
                { status: 401 }
            );
        }

        const jobId = params.jobId;
        const updates = await request.json();

        // Verify job exists and belongs to user
        const job = await getJobById(jobId);

        if (!job) {
            return NextResponse.json(
                { error: 'Jobb ikke funnet' },
                { status: 404 }
            );
        }

        if (job.userId !== session.user.id) {
            return NextResponse.json(
                { error: 'Du har ikke tilgang til å redigere denne jobben' },
                { status: 403 }
            );
        }

        // Validation
        if (updates.tags && (updates.tags.length === 0 || updates.tags.length > 6)) {
            return NextResponse.json(
                { error: 'Du må velge mellom 1 og 6 tags' },
                { status: 400 }
            );
        }

        // Update job
        await updateJob(jobId, updates);

        return NextResponse.json(
            { message: 'Jobb oppdatert', success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Update job error:', error);
        return NextResponse.json(
            { error: 'Kunne ikke oppdatere jobb' },
            { status: 500 }
        );
    }
}
