import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: 'ForCompanies' });

    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
    };
}

export default function ForBedrifterPage() {
    const t = useTranslations('ForCompanies');
    const priceValue = t('benefits.price.value'); // "649 kr", "699 kr", etc.

    return (
        <div className="container-custom py-20">
            <div className="max-w-4xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-5xl font-bold mb-6 text-slate-900">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Free Promotion Banner */}
                <div className="mb-16 animate-fade-in">
                    <div className="glass-card bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-xl p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-bold mb-4">
                                🎉 GRATIS LANSERINGS-TILBUD
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                De første 50 stillingsannonsene er helt gratis!
                            </h3>
                            <p className="text-white/90 mb-6 max-w-xl mx-auto">
                                Ingen skjulte kostnader. Ingen kredittkort påkrevd. Bare legg ut stillingen din og nå tusenvis av kandidater.
                            </p>
                            <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Aktiv i 60 dager</span>
                                <span className="mx-2">•</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Full synlighet</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Benefits */}
                <div className="grid md:grid-cols-3 gap-6 mb-16 animate-slide-up">
                    <div className="glass-card bg-white p-8 text-center hover:shadow-lg transition-all border border-slate-100">
                        <div className="text-4xl mb-6 bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">⚡</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{t('benefits.fast.title')}</h3>
                        <p className="text-slate-600 text-sm">
                            {t('benefits.fast.desc')}
                        </p>
                    </div>
                    <div className="glass-card bg-white p-8 text-center hover:shadow-lg transition-all border-2 border-primary-500 relative transform hover:-translate-y-2">
                        <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULÆR</div>
                        <div className="text-4xl mb-6 bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">💰</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{t('benefits.price.title')}</h3>
                        <p className="text-slate-600 text-sm font-medium">
                            {t('benefits.price.desc', { price: priceValue })}
                        </p>
                    </div>
                    <div className="glass-card bg-white p-8 text-center hover:shadow-lg transition-all border border-slate-100">
                        <div className="text-4xl mb-6 bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">🎯</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{t('benefits.audience.title')}</h3>
                        <p className="text-slate-600 text-sm">
                            {t('benefits.audience.desc')}
                        </p>
                    </div>
                </div>

                {/* How it works */}
                <div className="glass-card bg-white p-10 md:p-12 mb-12 shadow-sm animate-slide-up delay-100">
                    <h2 className="text-3xl font-bold mb-10 text-center text-slate-900">{t('howItWorks.title')}</h2>
                    <div className="space-y-8">
                        <div className="flex gap-6 items-start group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-lg group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                1
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('howItWorks.step1.title')}</h3>
                                <p className="text-slate-600">
                                    {t('howItWorks.step1.desc')}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-lg group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                2
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('howItWorks.step2.title')}</h3>
                                <p className="text-slate-600">
                                    {t('howItWorks.step2.desc')}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-lg group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                3
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('howItWorks.step3.title')}</h3>
                                <p className="text-slate-600">
                                    {t('howItWorks.step3.desc', { price: priceValue })}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start group">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-lg group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                4
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('howItWorks.step4.title')}</h3>
                                <p className="text-slate-600">
                                    {t('howItWorks.step4.desc')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center animate-fade-in delay-200">
                    <Link href="/auth/signup" className="btn-primary px-12 py-4 text-lg shadow-xl shadow-primary-200 hover:shadow-2xl hover:-translate-y-1 transition-all">
                        {t('cta')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
