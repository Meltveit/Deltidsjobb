import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { activateJob, getJobById } from '@/lib/models/Job';

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { error: 'Du må være innlogget' },
                { status: 401 }
            );
        }

        const { jobId, amount } = await request.json();

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
                { error: 'Ikke autorisert' },
                { status: 403 }
            );
        }

        // TODO: In production, integrate with Stripe API
        // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        // const paymentIntent = await stripe.paymentIntents.create({...});

        // Mock payment success - activate the job
        await activateJob(jobId);

        return NextResponse.json(
            { message: 'Betaling vellykket', success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Payment processing error:', error);
        return NextResponse.json(
            { error: 'Betaling feilet' },
            { status: 500 }
        );
    }
}
