'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        contactPerson: '',
        phoneNumber: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passordene matcher ikke');
            return;
        }

        if (formData.password.length < 6) {
            setError('Passordet må være minst 6 tegn');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                    companyName: formData.companyName,
                    contactPerson: formData.contactPerson,
                    phoneNumber: formData.phoneNumber,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Kunne ikke opprette konto');
            }

            // Auto-login after signup
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Konto opprettet, men kunne ikke logge inn automatisk. Prøv å logge inn manuelt.');
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError(err.message || 'Noe gikk galt. Prøv igjen.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-custom py-20">
            <div className="max-w-md mx-auto">
                <div className="glass-card">
                    <h1 className="text-3xl font-bold mb-2 gradient-text">Opprett konto</h1>
                    <p className="text-gray-400 mb-8">
                        Registrer bedriften din og begynn å legge ut stillinger
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                            <p className="text-red-200 text-sm font-medium flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Bedriftsnavn</label>
                            <input
                                type="text"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                required
                                className="input"
                                placeholder="Bedrift AS"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Kontaktperson</label>
                            <input
                                type="text"
                                value={formData.contactPerson}
                                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                required
                                className="input"
                                placeholder="Ola Nordmann"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Telefonnummer</label>
                            <input
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                required
                                className="input"
                                placeholder="+47 123 45 678"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">E-post</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="input"
                                placeholder="din@bedrift.no"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Passord</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                className="input"
                                placeholder="Minst 6 tegn"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Bekreft passord</label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                                className="input"
                                placeholder="Gjenta passord"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary"
                        >
                            {loading ? 'Oppretter konto...' : 'Opprett konto'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Har du allerede en konto?{' '}
                        <Link href="/auth/signin" className="text-primary-400 hover:text-primary-300">
                            Logg inn
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
