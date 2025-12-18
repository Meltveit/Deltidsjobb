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
        companyType: '', // New field for business category
        country: 'Norway', // Hidden for now, auto-set to Norway
        termsAccepted: false,
        privacyAccepted: false,
        marketingConsent: false,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // GDPR Validation
        if (!formData.termsAccepted) {
            setError('Du må godta vilkårene for å opprette en konto');
            return;
        }

        if (!formData.privacyAccepted) {
            setError('Du må godta personvernerklæringen for å opprette en konto');
            return;
        }

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
                    companyType: formData.companyType,
                    country: formData.country,
                    termsAccepted: formData.termsAccepted,
                    privacyAccepted: formData.privacyAccepted,
                    marketingConsent: formData.marketingConsent,
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

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Company Name with Icon */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-700">
                                Bedriftsnavn <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    required
                                    className="input pl-10"
                                    placeholder="Bedrift AS"
                                />
                            </div>
                        </div>

                        {/* Company Type with Icon */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-700">
                                Bedriftstype <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <select
                                    value={formData.companyType}
                                    onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                                    required
                                    className="input pl-10"
                                >
                                    <option value="">Velg bedriftstype</option>
                                    <option value="recruitment">Rekrutteringsbyrå / Bemanningsbyrå</option>
                                    <option value="retail">Dagligvare / Butikk</option>
                                    <option value="restaurant">Restaurant / Kafé / Bar</option>
                                    <option value="hotel">Hotell / Overnatting</option>
                                    <option value="healthcare">Helse / Omsorg</option>
                                    <option value="education">Utdanning / Skole</option>
                                    <option value="construction">Bygg / Anlegg</option>
                                    <option value="logistics">Logistikk / Transport</option>
                                    <option value="cleaning">Renhold / Vaktmester</option>
                                    <option value="it">IT / Teknologi</option>
                                    <option value="sales">Salg / Kundeservice</option>
                                    <option value="manufacturing">Produksjon / Industri</option>
                                    <option value="other">Annet</option>
                                </select>
                            </div>
                        </div>

                        {/* Contact Person with Icon */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-700">
                                Kontaktperson <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={formData.contactPerson}
                                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                    required
                                    className="input pl-10"
                                    placeholder="Ola Nordmann"
                                />
                            </div>
                        </div>

                        {/* Phone Number with Icon */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-700">
                                Telefonnummer <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <input
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                    required
                                    className="input pl-10"
                                    placeholder="+47 123 45 678"
                                />
                            </div>
                        </div>

                        {/* Email with Icon */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-700">
                                E-post <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="input pl-10"
                                    placeholder="din@bedrift.no"
                                />
                            </div>
                        </div>

                        {/* Password with Icon */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-700">
                                Passord <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    className="input pl-10"
                                    placeholder="Minst 6 tegn"
                                />
                            </div>
                        </div>

                        {/* Confirm Password with Icon */}
                        <div>
                            <label className="block text-sm font-medium mb-2 text-slate-700">
                                Bekreft passord <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                    className="input pl-10"
                                    placeholder="Gjenta passord"
                                />
                            </div>
                        </div>

                        {/* GDPR Consent Section - Enhanced */}
                        <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-6 space-y-4 mt-6">
                            <div className="flex items-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <h3 className="font-semibold text-slate-900">Samtykke og vilkår</h3>
                            </div>

                            {/* Terms of Service - Required */}
                            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-white transition-colors cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.termsAccepted}
                                    onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                                    className="mt-0.5 w-5 h-5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 focus:ring-2"
                                />
                                <span className="text-sm text-slate-600 group-hover:text-slate-900 leading-relaxed">
                                    Jeg godtar{' '}
                                    <Link href="/vilkar" className="text-primary-600 hover:text-primary-700 font-medium underline" target="_blank">
                                        vilkårene
                                    </Link>
                                    {' '}<span className="text-red-500 font-bold">*</span>
                                </span>
                            </label>

                            {/* Privacy Policy - Required */}
                            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-white transition-colors cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.privacyAccepted}
                                    onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                                    className="mt-0.5 w-5 h-5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 focus:ring-2"
                                />
                                <span className="text-sm text-slate-600 group-hover:text-slate-900 leading-relaxed">
                                    Jeg har lest og godtar{' '}
                                    <Link href="/personvern" className="text-primary-600 hover:text-primary-700 font-medium underline" target="_blank">
                                        personvernerklæringen
                                    </Link>
                                    {' '}<span className="text-red-500 font-bold">*</span>
                                </span>
                            </label>

                            {/* Marketing Consent - Optional */}
                            <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-white transition-colors cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={formData.marketingConsent}
                                    onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                                    className="mt-0.5 w-5 h-5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 focus:ring-2"
                                />
                                <span className="text-sm text-slate-600 group-hover:text-slate-900 leading-relaxed">
                                    Jeg ønsker å motta nyhetsbrev og markedsføring (valgfritt)
                                </span>
                            </label>
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
