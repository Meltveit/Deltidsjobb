'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (searchParams.get('payment_success') === 'true') {
            setShowSuccess(true);
            // Clear params after showing
            router.replace('/dashboard');
        }
    }, [searchParams, router]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        } else if (status === 'authenticated') {
            fetchJobs();
        }
    }, [status]);

    const fetchJobs = async () => {
        try {
            const response = await fetch('/api/jobs/my-jobs');
            const data = await response.json();
            setJobs(data.jobs || []);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div className="container-custom py-20">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    const activeJobs = jobs.filter((job) => job.status === 'active' && !job.isExpired);
    const expiredJobs = jobs.filter((job) => job.status === 'active' && job.isExpired);
    const pendingJobs = jobs.filter((job) => job.status === 'pending_payment');

    return (
        <div className="container-custom py-20">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">Dashboard</h1>
                <p className="text-slate-600 text-lg">
                    Velkommen tilbake, <span className="font-semibold text-slate-900">{session?.user?.companyName || session?.user?.contactPerson}</span>!
                </p>
            </div>

            {showSuccess && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-fade-in shadow-sm">
                    <div className="bg-green-100 rounded-full p-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-green-800">Betaling vellykket!</h3>
                        <p className="text-sm text-green-700">Din stilling er nå publisert og aktiv.</p>
                    </div>
                    <button onClick={() => setShowSuccess(false)} className="ml-auto text-green-500 hover:text-green-700">
                        ✕
                    </button>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="glass-card bg-white border border-slate-200 shadow-sm p-6 rounded-xl">
                    <div className="text-4xl font-bold text-primary-600 mb-2">{activeJobs.length}</div>
                    <div className="text-slate-600 font-medium">Aktive stillinger</div>
                </div>
                <div className="glass-card bg-white border border-slate-200 shadow-sm p-6 rounded-xl">
                    <div className="text-4xl font-bold text-slate-700 mb-2">{expiredJobs.length}</div>
                    <div className="text-slate-600 font-medium">Utgåtte stillinger</div>
                </div>
                <div className="glass-card bg-white border border-slate-200 shadow-sm p-6 rounded-xl">
                    <div className="text-4xl font-bold text-amber-500 mb-2">{pendingJobs.length}</div>
                    <div className="text-slate-600 font-medium">Venter på betaling</div>
                </div>
            </div>

            {/* Actions */}
            <div className="mb-12">
                <Link href="/legg-ut-stilling" className="btn-primary">
                    + Legg ut ny stilling
                </Link>
            </div>

            {/* Pending Payment Jobs */}
            {pendingJobs.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Venter på betaling</h2>
                    <div className="space-y-4">
                        {pendingJobs.map((job) => (
                            <div key={job._id} className="glass-card border-yellow-500/30">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                                        <p className="text-sm text-gray-400">
                                            Opprettet: {formatDate(job.createdAt)}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/betaling/${job._id}`}
                                        className="btn-primary"
                                    >
                                        Fullfør betaling
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Active Jobs */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Aktive stillinger</h2>
                {activeJobs.length === 0 ? (
                    <div className="glass-card text-center py-12">
                        <p className="text-gray-400 mb-4">Du har ingen aktive stillinger</p>
                        <Link href="/legg-ut-stilling" className="btn-primary">
                            Legg ut din første stilling
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activeJobs.map((job) => (
                            <div key={job._id} className="glass-card">
                                <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
                                            <span>📍 {job.location}</span>
                                            <span>📁 {job.sector}</span>
                                            <span>👁 {job.views || 0} visninger</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {job.tags.map((tag) => (
                                                <span key={tag} className="tag text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 text-right">
                                        <span className="text-sm text-gray-400">
                                            {job.daysRemaining} dager igjen
                                        </span>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/dashboard/rediger/${job._id}`}
                                                className="btn-secondary text-sm"
                                            >
                                                Rediger
                                            </Link>
                                            <Link
                                                href={`/jobb/${job._id}`}
                                                className="btn-ghost text-sm"
                                            >
                                                Vis
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Expired Jobs */}
            {expiredJobs.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Utgåtte stillinger</h2>
                    <div className="space-y-4">
                        {expiredJobs.map((job) => (
                            <div key={job._id} className="glass-card opacity-60">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                                        <p className="text-sm text-gray-400">
                                            Utgikk: {formatDate(job.expiresAt)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleRepublish(job._id)}
                                        className="btn-secondary"
                                    >
                                        Publiser på nytt
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    async function handleRepublish(jobId) {
        if (!confirm('Vil du publisere denne stillingen på nytt? Dette vil koste 650 kr for 60 nye dager.')) {
            return;
        }

        try {
            const response = await fetch('/api/jobs/republish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Kunne ikke republisere jobb');
            }

            // Redirect to payment
            router.push(`/betaling/${jobId}`);
        } catch (error) {
            alert(error.message);
        }
    }
}
