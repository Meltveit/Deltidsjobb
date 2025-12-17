import { Link } from '@/navigation';
import { slugify, truncate } from '@/lib/utils';

export default function JobCard({ job }) {
    const slug = `${slugify(job.title)}-${slugify(job.location)}-${job._id}`;

    return (
        <Link href={`/jobb/${slug}`}>
            <div className="glass-card hover-lift group cursor-pointer bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex gap-4 mb-4">
                    {job.logo && (
                        <div className="w-16 h-16 flex-shrink-0 bg-slate-50 rounded-lg p-2 flex items-center justify-center border border-slate-100">
                            <img
                                src={job.logo}
                                alt={`${job.companyName} logo`}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="text-xl font-semibold text-slate-900 group-hover:text-primary-600 transition-colors truncate">
                                {job.title}
                            </h3>
                            {job.daysRemaining !== undefined && (
                                <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                                    {job.daysRemaining} dager igjen
                                </span>
                            )}
                        </div>
                        <div className="text-sm font-medium text-slate-600 truncate mb-1">
                            {job.companyName}
                        </div>
                    </div>
                </div>

                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {truncate(job.description, 100)}
                </p>

                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{job.location}</span>
                    <span className="text-slate-300">•</span>
                    <span>{job.sector}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {job.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag text-xs bg-primary-50 text-primary-700 border-primary-100">
                            {tag}
                        </span>
                    ))}
                    {job.tags.length > 3 && (
                        <span className="text-xs text-slate-500 flex items-center">+{job.tags.length - 3} mer</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
