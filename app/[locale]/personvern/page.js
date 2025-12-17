import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: 'Privacy' });

    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
    };
}

export default function PersonvernPage() {
    const t = useTranslations('Privacy');

    return (
        <div className="container-custom py-20">
            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
                <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-4 block">{t('header.eyebrow')}</span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                    {t('header.title')} <span className="gradient-text">{t('header.titleHighlight')}</span>
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                    {t('header.desc')}
                </p>
                <div className="mt-4 text-sm text-slate-400">
                    Sist oppdatert: {new Date().toLocaleDateString('no-NO')}
                </div>
            </div>

            <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">

                {/* Section 1: Controller */}
                <div className="glass-card bg-white p-8 md:p-10 shadow-sm border-l-4 border-l-primary-500">
                    <div className="flex items-start gap-4">
                        <div className="hidden md:flex w-12 h-12 rounded-full bg-primary-50 items-center justify-center text-2xl shrink-0">
                            🔒
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('sections.controller.title')}</h2>
                            <p className="text-slate-600 leading-relaxed">
                                {t('sections.controller.content')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Data Collection Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* For Companies */}
                    <div className="glass-card bg-white p-8 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl mb-4 text-blue-600">
                            🏢
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{t('sections.collection.companiesTitle')}</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-600">
                                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t('sections.collection.companiesList.contact')}
                            </li>
                            <li className="flex items-center gap-3 text-slate-600">
                                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t('sections.collection.companiesList.company')}
                            </li>
                            <li className="flex items-center gap-3 text-slate-600">
                                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t('sections.collection.companiesList.payment')}
                            </li>
                            <li className="flex items-center gap-3 text-slate-600">
                                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t('sections.collection.companiesList.ads')}
                            </li>
                        </ul>
                    </div>

                    {/* For Visitors */}
                    <div className="glass-card bg-white p-8 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-xl mb-4 text-emerald-600">
                            👀
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-4">{t('sections.collection.visitorsTitle')}</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 text-slate-600">
                                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t('sections.collection.visitorsList.ip')}
                            </li>
                            <li className="flex items-center gap-3 text-slate-600">
                                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t('sections.collection.visitorsList.browser')}
                            </li>
                            <li className="flex items-center gap-3 text-slate-600">
                                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t('sections.collection.visitorsList.usage')}
                            </li>
                            <li className="flex items-center gap-3 text-slate-600">
                                <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {t('sections.collection.visitorsList.cookies')}
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Section 3 & 4 */}
                <div className="space-y-6">
                    <div className="glass-card bg-white p-8 shadow-sm transition-all hover:shadow-md">
                        <h2 className="text-xl font-bold text-slate-900 mb-3">{t('sections.purpose.title')}</h2>
                        <p className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.raw('sections.purpose.content') }} />
                    </div>

                    <div className="glass-card bg-white p-8 shadow-sm transition-all hover:shadow-md">
                        <h2 className="text-xl font-bold text-slate-900 mb-3">{t('sections.sharing.title')}</h2>
                        <p className="text-slate-600 leading-relaxed">
                            {t('sections.sharing.content')}
                        </p>
                    </div>
                </div>

                {/* Section 5: Your Rights - Highlighted */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white shadow-xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">{t('sections.rights.title')}</h2>
                            <p className="text-slate-300 leading-relaxed mb-6 max-w-xl">
                                {t('sections.rights.content')}
                            </p>
                        </div>
                        <a href="mailto:personvern@deltidsjobb.no" className="btn-primary bg-white text-slate-900 hover:bg-slate-50 border-none shrink-0">
                            {t('sections.rights.button')}
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
