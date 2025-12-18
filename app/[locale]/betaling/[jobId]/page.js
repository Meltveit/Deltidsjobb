'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { JOB_LISTING_PRICE, formatPrice } from '@/lib/constants';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function PaymentPage() {
    const params = useParams();
    const router = useRouter();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [isFreeEligible, setIsFreeEligible] = useState(false);
    const [showPromotion, setShowPromotion] = useState(true);

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = async () => {
        try {
            const response = await fetch(`/api/jobs/${params.jobId}`);
            const data = await response.json();
            setJob(data.job);

            // Check if job is already active (might have been auto-activated)
            if (data.job?.status === 'active') {
                router.push('/dashboard?payment_success=true');
            }

            // Check if promotion is still active for this country
            if (data.job?.country) {
                const countResponse = await fetch(`/api/jobs/count?country=${data.job.country}`);
                const countData = await countResponse.json();
                setShowPromotion(countData.count < 50);
            }
        } catch (error) {
            console.error('Error fetching job:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        setProcessing(true);

        try {
            // Create Stripe Checkout Session
            const response = await fetch('/api/payment/create-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    jobId: params.jobId,
                    locale: params.locale
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Kunne ikke starte betaling');
            }

            // Handle free promotion
            if (data.isFree) {
                router.push(`/dashboard?payment_success=true&jobId=${params.jobId}`);
                return;
            }

            // Redirect to Stripe
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({
                sessionId: data.sessionId,
            });

            if (error) {
                throw new Error(error.message);
            }
        } catch (error) {
            alert(error.message);
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="container-custom py-20">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="container-custom py-20">
                <div className="glass-card text-center">
                    <h2 className="text-2xl font-bold mb-4">Stilling ikke funnet</h2>
                    <button onClick={() => router.push('/')} className="btn-primary">
                        Gå til hjemmesiden
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container-custom py-20">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Fullfør betaling</h1>
                    <p className="text-gray-400">
                        Betal for å publisere stillingen din i 60 dager
                    </p>

                    {job && job.country && showPromotion && (
                        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl inline-block animate-bounce">
                            <span className="text-green-400 font-bold">
                                🎁 KAMPANJE: De første 50 annonsene i {job.country} er GRATIS!
                            </span>
                        </div>
                    )}
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Job Summary */}
                    <div className="glass-card">
                        <h2 className="text-xl font-semibold mb-4">Stillingsoppsummering</h2>

                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-gray-400">Titel:</span>
                                <p className="font-semibold">{job.title}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Lokasjon:</span>
                                <p>{job.location}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Sektor:</span>
                                <p>{job.sector}</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Tags:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {job.tags.map((tag) => (
                                        <span key={tag} className="tag text-xs">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="glass-card">
                        <h2 className="text-xl font-semibold mb-4">Betalingsoversikt</h2>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>Stillingsannonse (60 dager)</span>
                                <span className="font-semibold">{JOB_LISTING_PRICE} kr</span>
                            </div>

                            <div className="border-t border-white/10 pt-3">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Totalt</span>
                                    <span className="gradient-text">{JOB_LISTING_PRICE} kr</span>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-primary-500/10 border border-primary-500/30 rounded-lg text-sm">
                                <p className="text-gray-300 space-y-1">
                                    <span className="block">✓ Stillingen publiseres umiddelbart</span>
                                    <span className="block">✓ Vises i 60 dager</span>
                                    <span className="block">✓ Kan redigeres når som helst</span>
                                    <span className="block">✓ Nå tusenvis av jobbsøkere</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Button */}
                <div className="glass-card">
                    <div className="flex justify-center">
                        <button
                            onClick={handlePayment}
                            disabled={processing}
                            className="btn-primary px-12 py-4 text-lg"
                        >
                            {processing ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Behandler betaling...
                                </span>
                            ) : (
                                `Betal ${JOB_LISTING_PRICE} kr`
                            )}
                        </button>
                    </div>

                    <p className="mt-4 text-sm text-gray-500 text-center">
                        Sikret av Stripe • 128-bit SSL kryptering
                    </p>
                </div>
            </div>
        </div >
    );
}
