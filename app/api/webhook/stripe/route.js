import { NextResponse } from 'next/server';
import { activateJob } from '@/lib/models/Job';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
    const body = await request.text();
    const sig = headers().get('stripe-signature');

    let event;

    try {
        if (!sig || !endpointSecret) {
            console.warn('Missing stripe signature or webhook secret');
            return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
        }
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const jobId = session.metadata.jobId;

            if (jobId) {
                try {
                    console.log(`Payment successful for job ${jobId}, activating...`);
                    await activateJob(jobId);
                } catch (error) {
                    console.error('Error activating job:', error);
                    return NextResponse.json({ error: 'Error activating job' }, { status: 500 });
                }
            }
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
