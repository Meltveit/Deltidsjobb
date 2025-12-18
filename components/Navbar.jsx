'use client';

import { Link, usePathname } from '@/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Navbar({ locale }) {
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const t = useTranslations('Navbar');


    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm print:hidden">
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <img
                            src="/logo.png"
                            alt="FleksJobb"
                            className="h-20 w-auto group-hover:scale-105 transition-transform"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex items-center space-x-6">
                            <Link href="/" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                                {t('home')}
                            </Link>
                            <Link href="/for-bedrifter" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                                {t('forCompanies')}
                            </Link>
                            <Link href="/cv-generator" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                                {t('cvGenerator')}
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                            {session ? (
                                <>
                                    <Link href="/dashboard" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                                        {t('dashboard')}
                                    </Link>
                                    <Link href="/legg-ut-stilling" className="btn-primary py-2 px-4 text-sm">
                                        {t('postJob')}
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
                                    >
                                        {t('logout')}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/auth/signin" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                                        {t('login')}
                                    </Link>
                                    <Link href="/auth/signup" className="btn-primary py-2 px-4 text-sm">
                                        {t('signup')}
                                    </Link>
                                </>
                            )}
                        </div>
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
                            {t('home')}
                        </Link>
                        <Link href="/for-bedrifter" className="block py-2 text-slate-600 hover:text-primary-600 font-medium">
                            {t('forCompanies')}
                        </Link>
                        <Link href="/cv-generator" className="block py-2 text-slate-600 hover:text-primary-600 font-medium">
                            {t('cvGenerator')}
                        </Link>

                        {session ? (
                            <>
                                <Link href="/dashboard" className="block py-2 text-slate-600 hover:text-primary-600 font-medium">
                                    {t('dashboard')}
                                </Link>
                                <Link href="/legg-ut-stilling" className="block py-2 btn-primary text-center">
                                    {t('postJob')}
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="block w-full text-left py-2 text-slate-600 hover:text-primary-600 font-medium"
                                >
                                    {t('logout')}
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth/signin" className="block py-2 text-slate-600 hover:text-primary-600 font-medium">
                                    {t('login')}
                                </Link>
                                <Link href="/auth/signup" className="block py-2 btn-primary text-center">
                                    {t('signup')}
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
