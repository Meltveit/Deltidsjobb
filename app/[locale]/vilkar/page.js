import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: 'Terms' });

    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
    };
}

export default function VilkarPage() {
    const t = useTranslations('Terms');

    return (
        <div className="container-custom py-20">
            {/* Header / Hero */}
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
                <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-4 block">{t('header.eyebrow')}</span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                    {t('header.title')} <span className="gradient-text">{t('header.titleHighlight')}</span>
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                    {t('header.desc')}
                </p>
                <div className="mt-4 text-sm text-slate-400">
                    {t('header.updated')}: {new Date().toLocaleDateString('no-NO')}
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">

                {/* Section 1: Introduction */}
                <div className="glass-card bg-white p-8 md:p-10 shadow-sm border-l-4 border-l-primary-500">
                    <div className="flex items-start gap-4">
                        <div className="hidden md:flex w-12 h-12 rounded-full bg-primary-50 items-center justify-center text-2xl shrink-0">
                            👋
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('sections.introduction.title')}</h2>
                            <p className="text-slate-600 leading-relaxed">
                                {t('sections.introduction.content')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Account */}
                <div className="glass-card bg-white p-8 md:p-10 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-start gap-4">
                        <div className="hidden md:flex w-12 h-12 rounded-full bg-blue-50 items-center justify-center text-2xl shrink-0">
                            👤
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('sections.account.title')}</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                {t('sections.account.desc')}
                            </p>
                            <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 border border-slate-100 flex gap-3 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                {t('sections.account.warning')}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Companies */}
                <div className="glass-card bg-white p-8 md:p-10 shadow-sm transition-all hover:shadow-md">
                    <div className="flex items-start gap-4">
                        <div className="hidden md:flex w-12 h-12 rounded-full bg-indigo-50 items-center justify-center text-2xl shrink-0">
                            🏢
                        </div>
                        <div className="w-full">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('sections.companies.title')}</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h3 className="font-semibold text-slate-900 mb-2">{t('sections.companies.adsTitle')}</h3>
                                    <p className="text-sm text-slate-600">{t('sections.companies.adsContent')}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h3 className="font-semibold text-slate-900 mb-2">{t('sections.companies.refundTitle')}</h3>
                                    <p className="text-sm text-slate-600">{t('sections.companies.refundContent')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 4 & 5 Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="glass-card bg-white p-8 shadow-sm hover:shadow-md transition-all">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-xl mb-4">
                            ⚖️
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">{t('sections.rights.title')}</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {t('sections.rights.content')}
                        </p>
                    </div>

                    <div className="glass-card bg-white p-8 shadow-sm hover:shadow-md transition-all">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-xl mb-4">
                            🛡️
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">{t('sections.liability.title')}</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {t('sections.liability.content')}
                        </p>
                    </div>
                </div>

                {/* Footer Link */}
                <div className="text-center mt-12 bg-slate-50 rounded-2xl p-8 border border-slate-100/50">
                    <p className="text-slate-600 mb-4">{t('footer.question')}</p>
                    <Link href="/kontakt" className="btn-secondary">
                        {t('footer.contact')}
                    </Link>
                </div>
            </div>
        </div>
    );
}
