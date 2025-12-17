import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
    const t = await getTranslations({ locale, namespace: 'About' });

    return {
        title: t('metaTitle'),
        description: t('metaDescription'),
        openGraph: {
            title: t('ogTitle'), // Note: Ensure this key exists in messages if used, otherwise fallback to metaTitle
            description: t('metaDescription'),
        },
    };
}

export default function OmOssPage() {
    const t = useTranslations('About');

    return (
        <div className="container-custom py-20">
            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
                <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-4 block">{t('sectionTitle')}</span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
                    {t('title')} <span className="gradient-text">{t('titleHighlight')}</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                    {t('description')}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 animate-slide-up">
                <div className="glass-card bg-white p-8 text-center relative overflow-hidden group hover:border-primary-500/50 transition-all shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500"></div>
                    <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                    <p className="text-slate-500">{t('stats.developed')}</p>
                </div>
                <div className="glass-card bg-white p-8 text-center relative overflow-hidden group hover:border-primary-500/50 transition-all shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500"></div>
                    <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                    <p className="text-slate-500">{t('stats.support')}</p>
                </div>
                <div className="glass-card bg-white p-8 text-center relative overflow-hidden group hover:border-primary-500/50 transition-all shadow-sm">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500"></div>
                    <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:scale-110 transition-transform duration-300">{t('stats.simple')}</div>
                    <p className="text-slate-500">{t('stats.userFocus')}</p>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <div className="glass-card bg-white p-8 md:p-12 border-l-4 border-l-primary-500 shadow-sm">
                    <h2 className="text-3xl font-bold mb-6 text-slate-900">{t('mission.title')}</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        {t('mission.p1')}
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        {t('mission.p2')}
                    </p>
                </div>
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-bold shrink-0">1</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">{t('values.transparency.title')}</h3>
                            <p className="text-slate-500">{t('values.transparency.desc')}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-bold shrink-0">2</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">{t('values.quality.title')}</h3>
                            <p className="text-slate-500">{t('values.quality.desc')}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xl font-bold shrink-0">3</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">{t('values.innovation.title')}</h3>
                            <p className="text-slate-500">{t('values.innovation.desc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
