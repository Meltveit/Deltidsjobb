'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import { Link } from '@/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { getPriceByLocale } from '@/lib/constants';

export default function HomePage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({});
    const locale = useLocale();
    const priceInfo = getPriceByLocale(locale);
    const t = useTranslations('Home');
    const n = useTranslations('Navbar');
    const c = useTranslations('Common');

    useEffect(() => {
        fetchJobs(filters);
    }, [filters]);

    const fetchJobs = async (filters) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (filters.search) queryParams.append('search', filters.search);
            if (filters.location) queryParams.append('location', filters.location);
            if (filters.country) queryParams.append('country', filters.country);
            if (filters.sector) queryParams.append('sector', filters.sector);
            if (filters.tags) filters.tags.forEach(tag => queryParams.append('tags', tag));

            const response = await fetch(`/api/jobs?${queryParams.toString()}`);
            const data = await response.json();
            setJobs(data.jobs || []);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className="container-custom py-12">
            {/* Promotional Banner */}
            <div className="mb-8 animate-fade-in">
                <div className="glass-card bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 border-0 shadow-xl relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 text-center py-8 px-6">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-white text-sm font-semibold mb-4">
                            🎁 Lanserings-tilbud
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                            De første 50 stillingsannonsene er GRATIS!
                        </h2>
                        <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                            Vær blant de første bedriftene på Nordens enkleste jobbplattform
                        </p>
                        <Link href="/auth/signup" className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                            Legg ut gratis stilling nå →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                    {t('heroTitle')}{' '}
                    <span className="gradient-text uppercase">fleksjobb</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8 max-max-w-2xl mx-auto">
                    {t('heroSubtitle')}
                </p>

                <div className="flex justify-center gap-4 mb-12">
                    <Link href="/for-bedrifter" className="btn-primary">
                        {n('forCompanies')}
                    </Link>
                    <a href="#jobber" className="btn-secondary">
                        {c('readMore')}
                    </a>
                </div>
            </div>

            {/* Search Section */}
            <div id="jobber" className="mb-12">
                <SearchBar onSearch={handleSearch} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="glass-card text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">{jobs.length}+</div>
                    <div className="text-gray-400">{t('stats.active')}</div>
                </div>
                <div className="glass-card text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">{priceInfo.display}</div>
                    <div className="text-gray-400">{t('stats.price', { days: 60 })}</div>
                </div>
                <div className="glass-card text-center">
                    <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
                    <div className="text-gray-400">{t('stats.support')}</div>
                </div>
            </div>

            {/* Jobs Grid */}
            <div>
                <h2 className="text-3xl font-bold mb-8">
                    {Object.keys(filters).length > 0 ? t('sections.results') : t('sections.vacancies')}
                </h2>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-400">{t('status.loading')}</p>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="glass-card text-center py-12">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-xl font-semibold mb-2">{t('status.noResults')}</h3>
                        <p className="text-gray-400 mb-6">
                            {t('status.adjustFilters')}
                        </p>
                        <button onClick={() => setFilters({})} className="btn-secondary">
                            {t('status.resetFilters')}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
