import { getDatabase } from '../mongodb';
import { calculateDaysRemaining, isJobExpired } from '../utils';
import { JOB_LISTING_DURATION_DAYS } from '../constants';

/**
 * Create a new job listing
 */
export async function createJob(jobData) {
    const db = await getDatabase();

    const job = {
        ...jobData,
        status: 'pending_payment', // pending_payment, active, expired
        createdAt: new Date(),
        expiresAt: null, // Set after payment
        views: 0,
    };

    const result = await db.collection('jobs').insertOne(job);

    return {
        ...job,
        _id: result.insertedId.toString(),
    };
}

/**
 * Activate job after payment (set expiration date)
 */
export async function activateJob(jobId) {
    const db = await getDatabase();
    const { ObjectId } = require('mongodb');

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + JOB_LISTING_DURATION_DAYS);

    await db.collection('jobs').updateOne(
        { _id: new ObjectId(jobId) },
        {
            $set: {
                status: 'active',
                expiresAt,
                activatedAt: new Date(),
            },
        }
    );
}

/**
 * Get count of active jobs in a specific country
 */
export async function getJobCountByCountry(country) {
    const db = await getDatabase();
    return await db.collection('jobs').countDocuments({
        country,
        status: 'active'
    });
}

/**
 * Get all active jobs (not expired) with pagination
 */
export async function getActiveJobs(filters = {}) {
    const db = await getDatabase();

    const query = {
        status: 'active',
        expiresAt: { $gt: new Date() },
    };

    // Apply filters
    if (filters.location) {
        query.location = filters.location;
    }
    if (filters.country) {
        query.country = filters.country;
    }
    if (filters.sector) {
        query.sector = filters.sector;
    }
    if (filters.employmentType) {
        query.employmentType = filters.employmentType;
    }
    if (filters.tags && filters.tags.length > 0) {
        // Case-insensitive tag matching
        const tagRegexes = filters.tags.map(tag => new RegExp(`^${tag}$`, 'i'));
        query.tags = { $in: tagRegexes };
    }
    if (filters.search) {
        query.$or = [
            { title: { $regex: filters.search, $options: 'i' } },
            { description: { $regex: filters.search, $options: 'i' } },
        ];
    }

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 50;
    const skip = (page - 1) * limit;

    // Get total count
    const total = await db.collection('jobs').countDocuments(query);

    // Get paginated jobs
    const jobs = await db.collection('jobs')
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();

    const mappedJobs = jobs.map(job => ({
        ...job,
        _id: job._id.toString(),
        daysRemaining: calculateDaysRemaining(job.expiresAt),
    }));

    return {
        jobs: mappedJobs,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
    };
}

/**
 * Get job by ID
 */
export async function getJobById(jobId) {
    const db = await getDatabase();
    const { ObjectId } = require('mongodb');

    const job = await db.collection('jobs').findOne({ _id: new ObjectId(jobId) });

    if (!job) return null;

    return {
        ...job,
        _id: job._id.toString(),
        daysRemaining: job.expiresAt ? calculateDaysRemaining(job.expiresAt) : null,
        isExpired: job.expiresAt ? isJobExpired(job.expiresAt) : false,
    };
}

/**
 * Get jobs by user ID
 */
export async function getJobsByUserId(userId) {
    const db = await getDatabase();

    const jobs = await db.collection('jobs')
        .find({ userId })
        .sort({ createdAt: -1 })
        .toArray();

    return jobs.map(job => ({
        ...job,
        _id: job._id.toString(),
        daysRemaining: job.expiresAt ? calculateDaysRemaining(job.expiresAt) : null,
        isExpired: job.expiresAt ? isJobExpired(job.expiresAt) : false,
    }));
}

/**
 * Update job
 */
export async function updateJob(jobId, updates) {
    const db = await getDatabase();
    const { ObjectId } = require('mongodb');

    // Remove fields that shouldn't be updated
    const { _id, userId, createdAt, ...allowedUpdates } = updates;

    await db.collection('jobs').updateOne(
        { _id: new ObjectId(jobId) },
        { $set: { ...allowedUpdates, updatedAt: new Date() } }
    );
}

/**
 * Delete job
 */
export async function deleteJob(jobId) {
    const db = await getDatabase();
    const { ObjectId } = require('mongodb');

    await db.collection('jobs').deleteOne({ _id: new ObjectId(jobId) });
}

/**
 * Get unique cities from active jobs
 */
export async function getUniqueCities(country) {
    const db = await getDatabase();

    const query = {
        status: 'active',
        expiresAt: { $gt: new Date() },
    };

    if (country) {
        query.country = country;
    }

    const cities = await db.collection('jobs').distinct('location', query);

    return cities.sort();
}

/**
 * Increment job views
 */
export async function incrementJobViews(jobId) {
    const db = await getDatabase();
    const { ObjectId } = require('mongodb');

    await db.collection('jobs').updateOne(
        { _id: new ObjectId(jobId) },
        { $inc: { views: 1 } }
    );
}
