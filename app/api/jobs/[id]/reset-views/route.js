import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Ikke autorisert' }, { status: 401 });
        }

        const jobId = params.id;
        const db = await getDatabase();

        // Verify job ownership
        const job = await db.collection('jobs').findOne({ _id: new ObjectId(jobId) });

        if (!job) {
            return NextResponse.json({ error: 'Jobb ikke funnet' }, { status: 404 });
        }

        if (job.userId !== session.user.id) {
            return NextResponse.json({ error: 'Ikke autorisert' }, { status: 403 });
        }

        // Reset view count and update timestamp
        await db.collection('jobs').updateOne(
            { _id: new ObjectId(jobId) },
            {
                $set: {
                    views: 0,
                    updatedAt: new Date()
                }
            }
        );

        return NextResponse.json({ success: true, message: 'Visninger tilbakestilt' });
    } catch (error) {
        console.error('Error resetting views:', error);
        return NextResponse.json({ error: 'Kunne ikke tilbakestille visninger' }, { status: 500 });
    }
}
