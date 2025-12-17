'use client';

import { Link, usePathname, useRouter } from '@/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';

export default function Navbar({ locale }) {
    const { data: session } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const t = useTranslations('Navbar');
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const changeLanguage = (newLocale) => {
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
        });
    };

    const languages = [
        { code: 'no', label: '🇳🇴', name: 'Norsk' },
        { code: 'sv', label: '🇸🇪', name: 'Svenska' },
        { code: 'da', label: '🇩🇰', name: 'Dansk' },
        { code: 'fi', label: '🇫🇮', name: 'Suomi' }
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm print:hidden">
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
                            {t('home')}
                        </Link>
                        <Link href="/for-bedrifter" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                            {t('forCompanies')}
                        </Link>
                        <Link href="/cv-generator" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                            {t('cvGenerator')}
                        </Link>

                        {/* Language Switcher */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-slate-600 hover:text-primary-600 font-medium">
                                <span>{languages.find(l => l.code === locale)?.label || '🌐'}</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2 ${locale === lang.code ? 'font-bold text-primary-600' : 'text-slate-600'}`}
                                    >
                                        <span>{lang.label}</span>
                                        <span>{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {session ? (
                            <>
                                <Link href="/dashboard" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                                    {t('dashboard')}
                                </Link>
                                <Link href="/legg-ut-stilling" className="btn-primary">
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
                                <Link href="/auth/signup" className="btn-primary">
                                    {t('signup')}
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
                            {t('home')}
                        </Link>
                        <Link href="/for-bedrifter" className="block py-2 text-slate-600 hover:text-primary-600 font-medium">
                            {t('forCompanies')}
                        </Link>
                        <Link href="/cv-generator" className="block py-2 text-slate-600 hover:text-primary-600 font-medium">
                            {t('cvGenerator')}
                        </Link>

                        {/* Mobile Language Switcher */}
                        <div className="py-2 border-y border-slate-100 my-2">
                            <p className="text-xs text-slate-400 uppercase mb-2">Språk / Language</p>
                            <div className="flex gap-4">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`text-2xl ${locale === lang.code ? 'opacity-100 scale-110' : 'opacity-50'}`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                        </div>

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
