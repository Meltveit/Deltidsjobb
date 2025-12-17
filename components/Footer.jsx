import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-200 mt-20">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 gradient-text">Deltidsjobb</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Norges enkleste plattform for å finne og legge ut deltidsjobber.
                        </p>
                    </div>

                    {/* For Job Seekers */}
                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900">For Jobbsøkere</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>
                                <Link href="/" className="hover:text-primary-600 transition-colors">
                                    Finn jobb
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="hover:text-primary-600 transition-colors">
                                    Søk tips
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Companies */}
                    <div>
                        <h4 className="font-semibold mb-4 text-slate-900">For Bedrifter</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>
                                <Link href="/for-bedrifter" className="hover:text-primary-600 transition-colors">
                                    Om oss
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
                        <h4 className="font-semibold mb-4 text-slate-900">Juridisk</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>
                                <Link href="/vilkar" className="hover:text-primary-600 transition-colors">
                                    Vilkår
                                </Link>
                            </li>
                            <li>
                                <Link href="/personvern" className="hover:text-primary-600 transition-colors">
                                    Personvern
                                </Link>
                            </li>
                            <li>
                                <Link href="/kontakt" className="hover:text-primary-600 transition-colors">
                                    Kontakt
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Deltidsjobb. Alle rettigheter reservert.</p>
                </div>
            </div>
        </footer>
    );
}
