'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Link } from '@/navigation';
import { formatDate } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
    const t = useTranslations('Dashboard');
    const tCompany = useTranslations('ForCompanies'); // For price
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (searchParams.get('payment_success') === 'true') {
            setShowSuccess(true);
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

    const handleRepublish = async (jobId) => {
        const price = tCompany('benefits.price.value');
        if (!confirm(t('alerts.confirmRepublish', { price }))) {
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
                throw new Error(data.error || t('alerts.errorRepublish'));
            }

            // Redirect to payment
            router.push(`/betaling/${jobId}`);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteJob = async (jobId) => {
        if (!confirm(t('alerts.confirmDelete'))) {
            return;
        }

        try {
            const response = await fetch(`/api/jobs/${jobId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(t('alerts.errorDelete'));
            }

            fetchJobs(); // Refresh list
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="container-custom py-20">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-slate-900">{t('title')}</h1>
                <p className="text-slate-600 text-lg">
                    {t('welcome', { name: session?.user?.companyName || session?.user?.contactPerson })}
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
                        <h3 className="font-bold text-green-800">{t('success.title')}</h3>
                        <p className="text-sm text-green-700">{t('success.message')}</p>
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
                    <div className="text-slate-600 font-medium">{t('stats.active')}</div>
                </div>
                <div className="glass-card bg-white border border-slate-200 shadow-sm p-6 rounded-xl">
                    <div className="text-4xl font-bold text-slate-700 mb-2">{expiredJobs.length}</div>
                    <div className="text-slate-600 font-medium">{t('stats.expired')}</div>
                </div>
                <div className="glass-card bg-white border border-slate-200 shadow-sm p-6 rounded-xl">
                    <div className="text-4xl font-bold text-amber-500 mb-2">{pendingJobs.length}</div>
                    <div className="text-slate-600 font-medium">{t('stats.pending')}</div>
                </div>
            </div>

            {/* Actions */}
            <div className="mb-12">
                <Link href="/legg-ut-stilling" className="btn-primary">
                    {t('buttons.create')}
                </Link>
            </div>

            {/* Pending Payment Jobs */}
            {pendingJobs.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">{t('sections.pending')}</h2>
                    <div className="space-y-4">
                        {pendingJobs.map((job) => (
                            <div key={job._id} className="glass-card border-yellow-500/30">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                                        <p className="text-sm text-gray-400">
                                            {t('labels.created')}: {formatDate(job.createdAt)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/dashboard/rediger/${job._id}`}
                                            className="btn-secondary text-sm"
                                        >
                                            {t('buttons.edit')}
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteJob(job._id)}
                                            className="btn-ghost text-red-400 hover:text-red-300 border border-red-500/30 hover:bg-red-500/10"
                                        >
                                            {t('buttons.delete')}
                                        </button>
                                        <Link
                                            href={`/betaling/${job._id}`}
                                            className="btn-primary"
                                        >
                                            {t('buttons.finishPayment')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Active Jobs */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{t('sections.active')}</h2>
                {activeJobs.length === 0 ? (
                    <div className="glass-card text-center py-12">
                        <p className="text-gray-400 mb-4">{t('labels.noActive')}</p>
                        <Link href="/legg-ut-stilling" className="btn-primary">
                            {t('buttons.createFirst')}
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
                                            <span>👁 {job.views || 0} {t('labels.views')}</span>
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
                                            {job.daysRemaining} {t('labels.daysRemaining')}
                                        </span>
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/dashboard/rediger/${job._id}`}
                                                className="btn-secondary text-sm"
                                            >
                                                {t('buttons.edit')}
                                            </Link>
                                            <Link
                                                href={`/jobb/${job._id}`}
                                                className="btn-ghost text-sm"
                                            >
                                                {t('buttons.view')}
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
                    <h2 className="text-2xl font-bold mb-6">{t('sections.expired')}</h2>
                    <div className="space-y-4">
                        {expiredJobs.map((job) => (
                            <div key={job._id} className="glass-card opacity-60">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                                        <p className="text-sm text-gray-400">
                                            {t('labels.expired')}: {formatDate(job.expiresAt)}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleRepublish(job._id)}
                                        className="btn-secondary"
                                    >
                                        {t('buttons.republish')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
