import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');
    const h = useTranslations('Home');

    return (
        <footer className="bg-white border-t border-slate-200 mt-20 print:hidden">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <div className="mb-4">
                            <img
                                src="/logo.png"
                                alt="FleksJobb"
                                className="h-8 w-auto"
                            />
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {h('heroSubtitle')}
                        </p>
                    </div>

                    {/* For Job Seekers */}
                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900">{t('jobSeekers')}</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>
                                <Link href="/" className="hover:text-primary-600 transition-colors">
                                    {t('findJob')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/sok-tips" className="hover:text-primary-600 transition-colors">
                                    {t('searchTips')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/cv-generator" className="hover:text-primary-600 transition-colors">
                                    CV Generator
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Companies */}
                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900">{t('companies')}</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>
                                <Link href="/om-oss" className="hover:text-primary-600 transition-colors">
                                    {t('about')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/legg-ut-stilling" className="hover:text-primary-600 transition-colors">
                                    Legg ut stilling
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/signup" className="hover:text-primary-600 transition-colors">
                                    Opprett konto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900">{t('legal')}</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>
                                <Link href="/vilkar" className="hover:text-primary-600 transition-colors">
                                    {t('terms')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/personvern" className="hover:text-primary-600 transition-colors">
                                    {t('privacy')}
                                </Link>
                            </li>
                            <li>
                                <Link href="/kontakt" className="hover:text-primary-600 transition-colors">
                                    {t('contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Climate Badge */}
                <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
                    <a
                        href="https://climate.stripe.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-colors group"
                    >
                        <span className="text-2xl">🌍</span>
                        <div className="text-left">
                            <div className="text-xs text-green-600 font-semibold">{t('climate.badge')}</div>
                            <div className="text-xs text-green-700">{t('climate.contribution')}</div>
                        </div>
                    </a>
                    <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Deltidsjobb. {t('rights')}.</p>
                </div>
            </div>
        </footer>
    );
}
