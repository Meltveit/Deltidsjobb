'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push('/dashboard');
                router.refresh();
            }
        } catch (err) {
            setError('Noe gikk galt. Prøv igjen.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-custom py-20">
            <div className="max-w-md mx-auto">
                <div className="glass-card">
                    <h1 className="text-3xl font-bold mb-2 gradient-text">Logg inn</h1>
                    <p className="text-gray-400 mb-8">
                        Logg inn for å administrere dine stillinger
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">E-post</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="input"
                                placeholder="din@epost.no"
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
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary"
                        >
                            {loading ? 'Logger inn...' : 'Logg inn'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Har du ikke en konto?{' '}
                        <Link href="/auth/signup" className="text-primary-400 hover:text-primary-300">
                            Opprett konto
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
