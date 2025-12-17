import { getDatabase } from '../mongodb';

/**
 * Get all unique tags from database + default tags
 */
export async function getAllTags() {
    try {
        const db = await getDatabase();

        // Get unique tags from jobs collection
        const jobTags = await db.collection('jobs').distinct('tags');

        // Combine with default tags and remove duplicates
        const { JOB_TAGS } = require('../constants');
        const allTags = [...new Set([...JOB_TAGS, ...jobTags])];

        // Sort alphabetically
        return allTags.sort();
    } catch (error) {
        console.error('Error getting tags:', error);
        // Fallback to default tags
        const { JOB_TAGS } = require('../constants');
        return JOB_TAGS;
    }
}

/**
 * Add new tag to suggestions (stored when job is created)
 */
export async function addTag(tag) {
    try {
        const db = await getDatabase();

        // Store in a tags collection for tracking
        await db.collection('tag_suggestions').updateOne(
            { tag: tag.toLowerCase() },
            {
                $set: { tag },
                $inc: { count: 1 },
                $setOnInsert: { createdAt: new Date() }
            },
            { upsert: true }
        );

        return true;
    } catch (error) {
        console.error('Error adding tag:', error);
        return false;
    }
}
