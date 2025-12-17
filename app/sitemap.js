import { getActiveJobs } from '@/lib/models/Job';
import { slugify } from '@/lib/utils';

export default async function sitemap() {
    const baseUrl = 'https://deltidsjobb.no'; // Replace with your actual domain

    try {
        const jobs = await getActiveJobs();

        const jobUrls = jobs.map((job) => {
            const slug = `${slugify(job.title)}-${slugify(job.location)}-${job._id}`;
            return {
                url: `${baseUrl}/jobb/${slug}`,
                lastModified: job.updatedAt || job.createdAt,
                changeFrequency: 'daily',
                priority: 0.8,
            };
        });

        const staticUrls = [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1.0,
            },
            {
                url: `${baseUrl}/for-bedrifter`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7,
            },
            {
                url: `${baseUrl}/legg-ut-stilling`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
            },
        ];

        return [...staticUrls, ...jobUrls];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return [];
    }
}
