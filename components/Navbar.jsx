'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-primary-200 shadow-lg">
                            <span className="text-2xl font-bold">D</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900">Deltidsjobb</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                            Hjem
                        </Link>
                        <Link href="/for-bedrifter" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                            For Bedrifter
                        </Link>
                        <Link href="/cv-generator" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                            CV Generator
                        </Link>

                        {session ? (
                            <>
                                <Link href="/dashboard" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                                    Dashboard
                                </Link>
                                <Link href="/legg-ut-stilling" className="btn-primary">
                                    Legg ut stilling
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
                                >
                                    Logg ut
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/signin" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                                    Logg inn
                                </Link>
                                <Link href="/auth/signup" className="btn-primary">
                                    Opprett konto
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-3 border-t border-slate-100 bg-white absolute top-20 left-0 right-0 shadow-lg px-4 pb-6">
                        <Link href="/" className="block py-2 text-slate-600 hover:text-primary-600 font-medium">
                            Hjem
                        </Link>
                        <Link href="/for-bedrifter" className="block py-2 text-slate-600 hover:text-primary-600 font-medium">
                            For Bedrifter
                        </Link>
                        <Link href="/cv-generator" className="block py-2 text-slate-600 hover:text-primary-600 font-medium">
                            CV Generator
                        </Link>
                        {session ? (
                            <>
                                <Link href="/dashboard" className="block py-2 text-slate-600 hover:text-primary-600 font-medium">
                                    Dashboard
                                </Link>
                                <Link href="/legg-ut-stilling" className="block py-2 btn-primary text-center">
                                    Legg ut stilling
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="block w-full text-left py-2 text-slate-600 hover:text-primary-600 font-medium"
                                >
                                    Logg ut
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/signin" className="block py-2 text-slate-600 hover:text-primary-600 font-medium">
                                    Logg inn
                                </Link>
                                <Link href="/auth/signup" className="block py-2 btn-primary text-center">
                                    Opprett konto
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
