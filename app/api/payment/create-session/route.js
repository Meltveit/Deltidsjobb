import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getJobById } from '@/lib/models/Job';
import { JOB_LISTING_PRICE } from '@/lib/constants';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
                { error: 'Ikke autorisert' },
                { status: 403 }
            );
        }

        // Create Stripe checkout session
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: 'price_1SfR9pCq59oBRtBTVOfeUjsT',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXTAUTH_URL}/dashboard?payment_success=true&jobId=${jobId}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/betaling/${jobId}?canceled=true`,
            metadata: {
                jobId: jobId,
                userId: session.user.id,
            },
            customer_email: session.user.email,
        });

        return NextResponse.json({ sessionId: checkoutSession.id });
    } catch (error) {
        console.error('Stripe session creation error:', error);
        return NextResponse.json(
            { error: 'Kunne ikke opprette betalingssesjon' },
            { status: 500 }
        );
    }
}
