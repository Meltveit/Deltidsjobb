import { Link } from '@/navigation';

export const metadata = {
    title: 'Personvernerklæring | Deltidsjobb',
    description: 'Slik behandler Deltidsjobb.no dine personopplysninger. Les om innsamling, bruk og dine rettigheter.',
};

export default function PersonvernPage() {
    return (
        <div className="container-custom py-20">
            {/* Header / Hero */}
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
                <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-4 block">Trygghet</span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                    Personvern<span className="gradient-text">erklæring</span>
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                    Vi tar personvernet ditt på største alvor. Her kan du lese om hvordan vi samler inn og beskytter dine data.
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6 animate-slide-up">
                
                {/* Intro Card */}
                <div className="glass-card bg-white p-8 md:p-10 shadow-sm border-l-4 border-l-primary-500">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                        <span className="text-3xl">📋</span> 1. Behandlingsansvarlig
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                        Deltidsjobb (ved daglig leder) er hovedansvarlig for hvordan vi behandler dine personopplysninger.
                        Denne erklæringen gir deg informasjonen du har krav på når du bruker nettsiden vår.
                    </p>
                </div>

                {/* Data Collection Card */}
                <div className="glass-card bg-white p-8 md:p-10 shadow-sm">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                        <span className="text-3xl">💾</span> 2. Hva vi faktisk samler inn
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-primary-200 transition-colors group">
                            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="bg-white text-lg w-8 h-8 rounded-full flex items-center justify-center shadow-sm">🏢</span>
                                For Bedrifter
                            </h3>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div> Kontaktinfo (navn, e-post)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div> Bedriftsdata (org.nr)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div> Betalingshistorikk</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div> Stillingsannonser</li>
                            </ul>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-primary-200 transition-colors group">
                            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <span className="bg-white text-lg w-8 h-8 rounded-full flex items-center justify-center shadow-sm">👀</span>
                                For Besøkende
                            </h3>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div> Anonymisert IP-adresse</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div> Nettlesertype</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div> Bruksmønster</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div> Cookies (for funksjonalitet)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Purpose & Third Parties */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass-card bg-white p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">3. Formålet</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Vi bruker dataene til å levere tjenesten til deg, forbedre nettsiden, og yte kundeservice. Vi bruker den <b>aldri</b> til å selge informasjonen din videre.
                        </p>
                    </div>
                    <div className="glass-card bg-white p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-4">4. Deling av data</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Vi deler kun data med strengt nødvendige partnere som hjelper oss å drive siden (f.eks. betalingsløsning eller serverhosting). Alle disse har taushetsplikt.
                        </p>
                    </div>
                </div>

                {/* Rights */}
                <div className="glass-card bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 md:p-12 shadow-lg rounded-2xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-4">5. Dine Rettigheter</h2>
                            <p className="text-slate-300 mb-0 leading-relaxed max-w-lg">
                                Du er sjefen over dine egne data. Du har rett til innsyn, retting og sletting av dine opplysninger.
                                Vi hører gjerne fra deg hvis du lurer på noe.
                            </p>
                        </div>
                        <a 
                            href="mailto:personvern@deltidsjobb.no" 
                            className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors shadow-lg whitespace-nowrap"
                        >
                            Dine rettigheter →
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
