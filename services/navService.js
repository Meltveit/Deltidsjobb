import { getDatabase } from '@/lib/mongodb';
import { createJob } from '@/lib/models/Job';

const NAV_API_URL = 'https://arbeidsplassen.nav.no/public-feed/api/v1/ads';
const PAGE_SIZE = 50;

/**
 * Fetch jobs from NAV API
 */
export async function fetchNavJobs(page = 0) {
    try {
        const response = await fetch(`${NAV_API_URL}?size=${PAGE_SIZE}&page=${page}`, {
            headers: {
                'Authorization': `Bearer ${process.env.NAV_API_TOKEN || ''}` // NAV API might not need token for public feed, but good to have placeholder
            }
        });

        if (!response.ok) {
            throw new Error(`NAV API error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching NAV jobs:', error);
        return { content: [] };
    }
}

/**
 * Map NAV job to FleksJobb format
 */
export function mapNavJobToInternal(navJob) {
    // Only interested in part-time jobs
    const isPartTime = navJob.engagementtype?.toLowerCase().includes('deltid') ||
        navJob.description?.toLowerCase().includes('deltid') ||
        (navJob.extent && navJob.extent.toLowerCase().includes('deltid'));

    if (!isPartTime) return null;

    // Must be in Norway
    const location = navJob.workLocations && navJob.workLocations[0];
    if (location && location.country && location.country !== 'Norge') return null;

    return {
        title: navJob.title,
        description: navJob.description, // Note: NAV descriptions can be HTML
        location: location?.city || location?.municipality || 'Norge',
        country: 'Norway',
        employmentType: 'Deltid', // We filter for this
        source: 'nav',
        externalId: navJob.uuid,
        originalLink: `https://arbeidsplassen.nav.no/stillinger/stilling/${navJob.uuid}`,
        companyName: navJob.employer?.name || 'Anonym arbeidsgiver',
        status: 'active',
        expiresAt: new Date(navJob.expires),
        userId: null, // System job
        tags: [], // Could try to extract tags from description
        sector: 'Annet', // Default sector
        showPhone: false,
    };
}

/**
 * Import jobs from NAV
 */
export async function importNavJobs(limit = 100) {
    const db = await getDatabase();
    let importedCount = 0;
    let page = 0;

    console.log('Starting NAV job import...');

    while (importedCount < limit) {
        const data = await fetchNavJobs(page);
        if (!data.content || data.content.length === 0) break;

        for (const navJob of data.content) {
            if (importedCount >= limit) break;

            const jobData = mapNavJobToInternal(navJob);
            if (!jobData) continue; // Skip non-part-time or foreign jobs

            // Check if job already exists
            const existingJob = await db.collection('jobs').findOne({ externalId: jobData.externalId });

            if (!existingJob) {
                // Insert new job directly to avoid payment flow
                const activationData = {
                    ...jobData,
                    views: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    activatedAt: new Date()
                };

                await db.collection('jobs').insertOne(activationData);
                importedCount++;
                console.log(`Imported NAV job: ${jobData.title}`);
            }
        }

        page++;
    }

    return importedCount;
}
