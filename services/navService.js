import { getDatabase } from '@/lib/mongodb';
import { createJob } from '@/lib/models/Job';

// Search API (public, no token needed)
const NAV_API_URL = 'https://arbeidsplassen.nav.no/stillinger/api/search';
const PAGE_SIZE = 50;

/**
 * Fetch jobs from NAV Search API
 */
export async function fetchNavJobs(page = 0, query = 'deltid') {
    try {
        const from = page * PAGE_SIZE;
        // Construct query: q=(deltid OR sesong)
        const url = `${NAV_API_URL}?q=${encodeURIComponent(query)}&size=${PAGE_SIZE}&from=${from}&sort=published:desc`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`NAV API error: ${response.statusText}`);
        }

        const data = await response.json();
        const hits = data.hits && data.hits.hits ? data.hits.hits : [];
        const content = hits.map(hit => hit._source); // Extract the actual job object

        // console.log(`[DEBUG] fetchNavJobs URL: ${url}`);
        // console.log(`[DEBUG] fetchNavJobs found ${content.length} items.`);

        return { content };
    } catch (error) {
        console.error('Error fetching NAV jobs:', error);
        return { content: [] };
    }
}

/**
 * Extract tags from job content
 */
function extractTags(navJob) {
    const tags = new Set();
    const textToCheck = `${navJob.title} ${navJob.description} ${navJob.engagementtype || ''} ${navJob.extent || ''}`.toLowerCase();

    // Map of keywords to tags
    const keywordMap = {
        'deltid': 'Deltid',
        'heltid': 'Heltid',
        'sesong': 'Sesongarbeid',
        'sommerjobb': 'Sommerjobb',
        'julehjelp': 'Julehjelp',
        'julerush': 'Julehjelp',
        'vikar': 'Vikariat',
        'tilkalling': 'Tilkalling',
        'ekstrahjelp': 'Ekstrahjelp',
        'lærling': 'Lærling',
        'trainee': 'Trainee',
        'kveld': 'Kveldsarbeid',
        'helg': 'Helgearbeid',
        'student': 'Student',
        'hjemmekontor': 'Hjemmekontor',
        'remote': 'Hjemmekontor'
    };

    // Check strict engagement type first
    if (navJob.engagementtype) {
        const type = navJob.engagementtype.toLowerCase();
        if (type.includes('fast')) tags.add('Fast');
        if (type.includes('vikar')) tags.add('Vikariat');
        if (type.includes('engasjement')) tags.add('Engasjement');
        if (type.includes('prosjekt')) tags.add('Prosjekt');
        if (type.includes('sesong')) tags.add('Sesongarbeid');
        if (type.includes('ferie')) tags.add('Sommerjobb');
    }

    // Check text for other keywords
    Object.entries(keywordMap).forEach(([keyword, tag]) => {
        if (textToCheck.includes(keyword)) {
            tags.add(tag);
        }
    });

    return Array.from(tags);
}

/**
 * Filter and map NAV job to Internal format
 */
export function mapNavJobToInternal(navJob) {
    const combinedText = `${navJob.title} ${navJob.description} ${navJob.engagementtype || ''} ${navJob.extent || ''}`.toLowerCase();

    // Keywords we are interested in
    const keywords = ['deltid', 'tilkalling', 'vikar', 'sesong', 'ekstrahjelp', 'sommerjobb'];

    // Check if job matches any of our criteria
    const isRelevant = keywords.some(keyword => combinedText.includes(keyword));

    if (!isRelevant) return null;

    // Must be in Norway
    const location = navJob.workLocations && navJob.workLocations[0];
    if (location && location.country && location.country !== 'Norge') return null;

    const tags = extractTags(navJob);

    // Determine primary employment type
    let employmentType = 'Annet';
    if (combinedText.includes('deltid')) employmentType = 'Deltid';
    else if (combinedText.includes('sesong')) employmentType = 'Sesong';
    else if (combinedText.includes('sommerjobb')) employmentType = 'Sommerjobb';
    else if (combinedText.includes('vikar')) employmentType = 'Vikar';
    else if (combinedText.includes('tilkalling') || combinedText.includes('ekstrahjelp')) employmentType = 'Tilkalling';

    return {
        title: navJob.title,
        description: navJob.description, // Note: NAV descriptions can be HTML
        location: location?.city || location?.municipality || 'Norge',
        country: 'Norway',
        employmentType,
        source: 'nav',
        externalId: navJob.uuid,
        originalLink: `https://arbeidsplassen.nav.no/stillinger/stilling/${navJob.uuid}`,
        companyName: navJob.employer?.name || 'Anonym arbeidsgiver',
        status: 'active',
        expiresAt: new Date(navJob.expires),
        userId: null, // System job
        tags: tags,
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

    // Queries to rotate through to get immediate relevant results
    const queries = ['deltid', 'sesong', 'sommerjobb', 'ekstrahjelp', 'vikar'];

    console.log('Starting NAV job import via Search API...');

    for (const query of queries) {
        if (importedCount >= limit) break;

        let page = 0;
        // Fetch up to 2 pages per query to keep it fast
        while (page < 2 && importedCount < limit) {
            const data = await fetchNavJobs(page, query);
            if (!data.content || data.content.length === 0) break;

            for (const navJob of data.content) {
                if (importedCount >= limit) break;

                const jobData = mapNavJobToInternal(navJob);
                if (!jobData) continue; // Skip if mapping fails or validation checks fail

                // Check if job already exists
                const existingJob = await db.collection('jobs').findOne({ externalId: jobData.externalId });

                if (!existingJob) {
                    // Insert new job
                    const activationData = {
                        ...jobData,
                        views: 0,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        activatedAt: new Date()
                    };

                    await db.collection('jobs').insertOne(activationData);
                    importedCount++;
                    console.log(`Imported NAV job: ${jobData.title} (Query: ${query})`);
                }
            }
            page++;
        }
    }

    return importedCount;
}
