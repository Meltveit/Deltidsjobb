import { getDatabase } from '@/lib/mongodb';

// ...

// Helper to fetch description from public page
// Helper to fetch description from public page
async function fetchDescriptionFromPage(uuid) {
    try {
        const url = `https://arbeidsplassen.nav.no/stillinger/stilling/${uuid}`;
        const res = await fetch(url);
        if (!res.ok) return '';
        const html = await res.text();

        // 1. Look for specific markers known from inspection
        // "Om jobben" is a strong h2 marker.
        // We want strict match on "Om jobben" or "Stillingsbeskrivelse"

        let description = '';

        // Use a simple regex to find the section between "Om jobben" and the next H2
        // HTML usually looks like: <h2>Om jobben</h2><div...>...</div><h2>
        // But headers might be anything.
        // Let's rely on text content proximity. 

        // Find start index
        const startMarker = 'Om jobben';
        const startIndex = html.indexOf(startMarker);

        if (startIndex !== -1) {
            // Find next section start. Common next sections: "Søk på jobben", "Om bedriften", "Kontaktperson"
            const potentialEnds = ['Søk på jobben', 'Om bedriften', 'Kontaktperson', 'Arbeidssted', 'Du får'];
            let endIndex = html.length;

            for (const end of potentialEnds) {
                const idx = html.indexOf(end, startIndex + startMarker.length);
                if (idx !== -1 && idx < endIndex) {
                    endIndex = idx;
                }
            }

            // Extract raw HTML chunk
            let rawChunk = html.substring(startIndex + startMarker.length, endIndex);

            // Clean up: simple strip tags.
            // This is dirty but effective for plain text.
            description = rawChunk.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
        }

        // Fallback: If "Om jobben" not found (some ads don't have it), try "Stillingsbeskrivelse"
        if (!description) {
            // ... fallback logic or just return empty
        }

        return description;
    } catch (e) {
        console.error(`Error scraping description for ${uuid}:`, e.message);
        return '';
    }
}

// ... existing code ...

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
 * Helper to capitalize first letter
 */
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Extract tags from job content
 */
function extractTags(navJob) {
    const tags = new Set();
    const textToCheck = `${navJob.title} ${navJob.description} ${navJob.engagementtype || ''} ${navJob.extent || ''}`.toLowerCase();

    // Engagement types
    if (navJob.engagementtype) {
        const type = navJob.engagementtype.toLowerCase();
        if (type.includes('fast')) tags.add('Fast stilling');
        else if (type.includes('vikar')) tags.add('Vikariat');
        else if (type.includes('prosjekt')) tags.add('Prosjekt');
        else if (type.includes('sesong')) tags.add('Sesongarbeid');
        else if (type.includes('ferie')) tags.add('Sommerjobb');
    }

    // Category Keywords
    const keywordMap = {
        // High level categories
        'salg': 'Salg',
        'selger': 'Salg',
        'sales': 'Salg',
        'b2b': 'B2B Salg',
        'account manager': 'B2B Salg',
        'kundeservice': 'Kundeservice',
        'kundebehandler': 'Kundeservice',
        'support': 'Kundeservice',
        'helse': 'Helse og Omsorg',
        'sykepleier': 'Helse og Omsorg',
        'assistent': 'Helse og Omsorg',
        'omsorg': 'Helse og Omsorg',
        'barnehage': 'Oppvekst',
        'lære': 'Lærling',
        'butikk': 'Butikk',
        'kasse': 'Butikk',
        'varehandel': 'Butikk',
        'lager': 'Lager og Logistikk',
        'logistikk': 'Lager og Logistikk',
        'sjåfør': 'Transport',
        'servering': 'Restaurant og Servering',
        'servitør': 'Restaurant og Servering',
        'restaurant': 'Restaurant og Servering',
        'kokk': 'Restaurant og Servering',

        // Specific types
        'deltid': 'Deltid',
        'sommerjobb': 'Sommerjobb',
        'julehjelp': 'Julehjelp',
        'kveld': 'Kveldsarbeid',
        'helg': 'Helgearbeid',
        'student': 'Student',
    };

    // Check text for keywords
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

    // Keywords we are interested in for IMPORTING
    const importKeywords = ['deltid', 'tilkalling', 'vikar', 'sesong', 'ekstrahjelp', 'sommerjobb'];

    // Check if job matches any of import criteria
    const isRelevant = importKeywords.some(keyword => combinedText.includes(keyword));
    if (!isRelevant) return null;

    // Location Logic: Use 'locationList' array from Search API
    const locObj = navJob.locationList && navJob.locationList[0];
    const country = locObj?.country || 'Norge';

    if (country.toLowerCase() !== 'norge' && country.toLowerCase() !== 'norway' && country.toLowerCase() !== 'no') return null;

    // Prefer municipality, then city, then "Norge"
    let displayLocation = 'Norge';
    if (locObj?.municipal) {
        displayLocation = capitalize(locObj.municipal);
    } else if (locObj?.city) {
        displayLocation = capitalize(locObj.city);
    }

    const tags = extractTags(navJob);
    const sector = getSector(navJob);

    // Strict Employment Type Logic
    let employmentType = 'Annet';

    if (combinedText.includes('deltid')) {
        employmentType = 'Deltid';
    } else if (combinedText.includes('sommerjobb')) {
        employmentType = 'Sommerjobb';
    } else if (combinedText.includes('sesong')) {
        employmentType = 'Sesong';
    } else if (combinedText.includes('tilkalling') || combinedText.includes('ekstrahjelp')) {
        employmentType = 'Tilkalling';
    } else if (combinedText.includes('vikar')) {
        employmentType = 'Vikar';
    } else if (combinedText.includes('heltid')) {
        // Only classify as Heltid if it hasn't matched the above (meaning it's purely full time)
        // But we are filtering for "relevant" jobs, so this case implies it might have matched a specific keyword like 'vikar' + 'heltid'
        // If we are here, it didn't match the specific part-time keywords above, so we default to 'Heltid' if present.
        employmentType = 'Heltid';
    }

    return {
        title: navJob.title,
        description: navJob.description,
        location: displayLocation,
        country: 'Norway',
        employmentType,
        source: 'nav',
        externalId: navJob.uuid,
        originalLink: `https://arbeidsplassen.nav.no/stillinger/stilling/${navJob.uuid}`,
        companyName: navJob.employer?.name || 'Anonym arbeidsgiver',
        status: 'active',
        expiresAt: new Date(navJob.expires),
        userId: null,
        tags: tags,
        sector: sector,
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

    try {
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
                        // Fetch full description if missing
                        let fullDescription = jobData.description;
                        if (!fullDescription || fullDescription.length < 50) {
                            // We need to define fetchDescriptionFromPage inside or export it. 
                            // Since I added it to the file scope in previous step (implied), it should be available.
                            // BUT `mapNavJobToInternal` is sync.
                            fullDescription = await fetchDescriptionFromPage(navJob.uuid);
                            if (fullDescription) {
                                jobData.description = fullDescription;
                            }
                        }

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
    } catch (e) {
        console.error('CRITICAL ERROR in importNavJobs:', e);
        throw e; // Re-throw to be caught by route handler
    }
}
