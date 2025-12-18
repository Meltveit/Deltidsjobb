import { getDatabase } from '../mongodb';
import bcrypt from 'bcryptjs';

/**
 * Create a new user
 */
export async function createUser({
    email,
    password,
    companyName,
    contactPerson,
    phoneNumber,
    country = 'Norway',
    gdprConsent
}) {
    const db = await getDatabase();

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email: email.toLowerCase() });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
        email: email.toLowerCase(),
        password: hashedPassword,
        companyName,
        contactPerson,
        phoneNumber,
        country,
        gdprConsent: {
            termsAccepted: gdprConsent?.termsAccepted || false,
            privacyAccepted: gdprConsent?.privacyAccepted || false,
            marketingConsent: gdprConsent?.marketingConsent || false,
            consentDate: gdprConsent?.consentDate || new Date(),
            ipAddress: gdprConsent?.ipAddress || 'unknown'
        },
        createdAt: new Date(),
    };

    const result = await db.collection('users').insertOne(user);

    return {
        id: result.insertedId.toString(),
        email: user.email,
        companyName: user.companyName,
        contactPerson: user.contactPerson,
        phoneNumber: user.phoneNumber,
        country: user.country,
    };
}

/**
 * Find user by email
 */
export async function findUserByEmail(email) {
    const db = await getDatabase();
    return await db.collection('users').findOne({ email: email.toLowerCase() });
}

/**
 * Verify user password
 */
export async function verifyPassword(user, password) {
    return await bcrypt.compare(password, user.password);
}

/**
 * Get user by ID
 */
export async function getUserById(userId) {
    const db = await getDatabase();
    const { ObjectId } = require('mongodb');
    return await db.collection('users').findOne({ _id: new ObjectId(userId) });
}
