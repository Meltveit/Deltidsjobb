import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getJobById, activateJob, getJobCountByCountry } from '@/lib/models/Job';
import { CITY_TO_COUNTRY, getPriceByLocale } from '@/lib/constants';
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

        const { jobId, locale = 'no' } = await request.json();

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

        // --- FREE PROMOTION LOGIC ---
        // Determine country from city
        const country = job.country || CITY_TO_COUNTRY[job.location] || 'Norway';
        const activeJobCount = await getJobCountByCountry(country);

        if (activeJobCount < 50) {
            console.log(`🎁 Promotion applies! Country: ${country}, Count: ${activeJobCount}. Activating job ${jobId} for free.`);
            await activateJob(jobId);
            return NextResponse.json({ isFree: true });
        }
        // ----------------------------

        // Get price info based on locale
        const priceInfo = getPriceByLocale(locale);
        console.log(`💰 Creating checkout session for locale: ${locale}, price: ${priceInfo.display}`);

        // Create Stripe checkout session
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceInfo.priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXTAUTH_URL}/${locale}/dashboard?payment_success=true&jobId=${jobId}`,
            cancel_url: `${process.env.NEXTAUTH_URL}/${locale}/betaling/${jobId}?canceled=true`,
            metadata: {
                jobId: jobId,
                userId: session.user.id,
                locale: locale,
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

