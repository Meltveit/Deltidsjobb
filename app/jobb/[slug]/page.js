import { getJobById, incrementJobViews } from '@/lib/models/Job';
import { slugify, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
    const slug = params.slug;
    const jobId = slug.split('-').pop();
    const job = await getJobById(jobId);

    if (!job) {
        return {
            title: 'Jobb ikke funnet',
        };
    }

    return {
        title: `${job.title} - ${job.location} | Deltidsjobb`,
        description: job.description.substring(0, 160),
        keywords: job.tags.join(', '),
        openGraph: {
            title: `${job.title} - ${job.location}`,
            description: job.description.substring(0, 160),
            type: 'website',
        },
    };
}

export default async function JobDetailPage({ params }) {
    const slug = params.slug;
    const jobId = slug.split('-').pop();

    const job = await getJobById(jobId);

    if (!job || job.isExpired || job.status !== 'active') {
        notFound();
    }

    // Increment views (do this in background)
    incrementJobViews(jobId).catch(console.error);

    // Generate JSON-LD structured data for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description: job.description,
        datePosted: job.activatedAt || job.createdAt,
        validThrough: job.expiresAt,
        employmentType: 'PART_TIME',
        hiringOrganization: {
            '@type': 'Organization',
            name: job.companyName,
        },
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: job.location,
                addressCountry: 'NO',
            },
        },
        industry: job.sector,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container-custom py-20">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm text-gray-400">
                        <Link href="/" className="hover:text-white">
                            Hjem
                        </Link>
                        <span className="mx-2">/</span>
                        <span>{job.title}</span>
                    </nav>

                    {/* Job Header */}
                    <div className="glass-card mb-8">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold mb-4">{job.title}</h1>

                                <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <span>{job.companyName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        <span>{job.sector}</span>
                                    </div>
                                    {job.employmentType && (
                                        <div className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{job.employmentType}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {job.tags.map((tag) => (
                                        <span key={tag} className="tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="text-sm text-gray-400">
                                    Publisert {formatDate(job.activatedAt || job.createdAt)} • {job.daysRemaining} dager igjen
                                </div>
                            </div>

                            {/* Logo */}
                            {job.logo && (
                                <div className="w-32 h-32 flex-shrink-0 bg-white/5 rounded-xl p-4 flex items-center justify-center">
                                    <img
                                        src={job.logo}
                                        alt={`${job.companyName} logo`}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="glass-card mb-8">
                        <h2 className="text-2xl font-bold mb-4">Beskrivelse</h2>
                        <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                            {job.description}
                        </div>
                    </div>

                    {/* Apply Section */}
                    <div className="glass-card text-center">
                        <h2 className="text-2xl font-bold mb-4">Interessert?</h2>
                        <div className="flex flex-col items-center gap-4">
                            <p className="text-gray-400">
                                Send din søknad til:
                            </p>
                            <a
                                href={`mailto:${job.email}?subject=Søknad: ${job.title}`}
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {job.email}
                            </a>

                            {job.showPhone && job.phone && (
                                <div className="mt-4">
                                    <p className="text-slate-600 mb-2">Eller ta kontakt på telefon:</p>
                                    <a
                                        href={`tel:${job.phone}`}
                                        className="text-slate-900 hover:text-primary-600 font-semibold text-lg flex items-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        {job.phone}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
