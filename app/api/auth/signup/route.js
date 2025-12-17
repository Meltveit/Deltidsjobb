import { NextResponse } from 'next/server';
import { createUser } from '@/lib/models/User';

export async function POST(request) {
    try {
        const { email, password, companyName, contactPerson, phoneNumber } = await request.json();

        // Validation
        if (!email || !password || !companyName || !contactPerson) {
            return NextResponse.json(
                { error: 'Alle feltene er påkrevd' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Passordet må være minst 6 tegn' },
                { status: 400 }
            );
        }

        // Create user
        const user = await createUser({
            email,
            password,
            companyName,
            contactPerson,
            phoneNumber,
        });

        return NextResponse.json(
            { message: 'Bruker opprettet', user },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);

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
