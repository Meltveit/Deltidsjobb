/**
 * Generate SEO-friendly URL slug from text
 */
export function slugify(text) {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/æ/g, 'ae')         // Replace Norwegian characters
        .replace(/ø/g, 'o')
        .replace(/å/g, 'a')
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start
        .replace(/-+$/, '');         // Trim - from end
}

/**
 * Format date to Norwegian format (DD.MM.YYYY)
 */
export function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
}

/**
 * Calculate days remaining until expiration
 */
export function calculateDaysRemaining(expiresAt) {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
}

/**
 * Check if a job has expired
 */
export function isJobExpired(expiresAt) {
    return new Date(expiresAt) < new Date();
}

/**
 * Merge Tailwind classes (simple version of clsx/cn)
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

/**
 * Format price in NOK
 */
export function formatPrice(amount) {
    return `${amount} kr`;
}

/**
 * Truncate text to specified length
 */
export function truncate(text, length = 100) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}
