import { NextResponse } from 'next/server';
import { createUser } from '@/lib/models/User';

export async function POST(request) {
    try {
        const {
            email,
            password,
            companyName,
            contactPerson,
            phoneNumber,
            country,
            termsAccepted,
            privacyAccepted,
            marketingConsent
        } = await request.json();

        // Validation
        if (!email || !password || !companyName || !contactPerson) {
            return NextResponse.json(
                { error: 'Alle feltene er påkrevd' },
                { status: 400 }
            );
        }

        // GDPR Validation
        if (!termsAccepted) {
            return NextResponse.json(
                { error: 'Du må godta vilkårene' },
                { status: 400 }
            );
        }

        if (!privacyAccepted) {
            return NextResponse.json(
                { error: 'Du må godta personvernerklæringen' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Passordet må være minst 6 tegn' },
                { status: 400 }
            );
        }

        // Get IP address for GDPR audit trail
        const ipAddress = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown';

        // Create user
        const user = await createUser({
            email,
            password,
            companyName,
            contactPerson,
            phoneNumber,
            country: country || 'Norway',
            gdprConsent: {
                termsAccepted,
                privacyAccepted,
                marketingConsent: marketingConsent || false,
                consentDate: new Date(),
                ipAddress
            }
        });

        return NextResponse.json(
            { message: 'Bruker opprettet', user },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error details:', error);

        if (error.message === 'User already exists') {
            return NextResponse.json(
                { error: 'En bruker med denne e-postadressen eksisterer allerede' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Kunne ikke opprette bruker' },
            { status: 500 }
        );
    }
}
