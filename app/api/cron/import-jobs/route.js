import { NextResponse } from 'next/server';
import { importNavJobs } from '@/services/navService';

// This endpoint is meant to be called by a cron job service (e.g. Vercel Cron)
// GET /api/cron/import-jobs?key=YOUR_SECRET_KEY
export const maxDuration = 60; // Allow 60 seconds for execution (Vercel specific)

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const key = searchParams.get('key');

        // Simple security check
        if (key !== process.env.CRON_SECRET_KEY && process.env.NODE_ENV === 'production') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const limit = parseInt(searchParams.get('limit') || '50');
        const count = await importNavJobs(limit);

        return NextResponse.json({
            success: true,
            message: `Imported ${count} jobs from NAV`,
            count
        });
    } catch (error) {
        console.error('Import error:', error);
        return NextResponse.json({
            error: 'Failed to import jobs',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
