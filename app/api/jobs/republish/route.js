import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getJobById, updateJob } from '@/lib/models/Job';
import { JOB_LISTING_DURATION_DAYS } from '@/lib/constants';

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Du må være innlogget' },
                { status: 401 }
            );
        }

        const { jobId } = await request.json();

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
                { error: 'Du har ikke tilgang til denne jobben' },
                { status: 403 }
            );
        }

        // Reset the job to pending payment status
        // This allows the user to pay again for another 60 days
        const updates = {
            status: 'pending_payment',
            expiresAt: null,
        };

        await updateJob(jobId, updates);

        return NextResponse.json(
            {
                message: 'Jobb klar for republisering',
                jobId: jobId,
                success: true
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Republish job error:', error);
        return NextResponse.json(
            { error: 'Kunne ikke republisere jobb' },
            { status: 500 }
        );
    }
}
