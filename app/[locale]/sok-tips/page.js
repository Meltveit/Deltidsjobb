import Link from 'next/link';

export const metadata = {
    title: 'Søketips - Hvordan få jobben | Deltidsjobb',
    description: 'Eksperttips for jobbsøknad, CV og intervju. Slik øker du sjansene dine for å kapre drømmejobben.',
};

export default function SokTipsPage() {
    return (
        <div className="container-custom py-20">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-5xl font-bold mb-6 gradient-text">Slik får du jobben</h1>
                <p className="text-xl text-slate-600">
                    Konkurransen kan være hard, men med disse tipsene stiller du sterkere i køen.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* CV Tips */}
                <div className="glass-card bg-white hover:bg-slate-50 transition-colors p-8 shadow-sm">
                    <div className="text-4xl mb-4">📄</div>
                    <h2 className="text-2xl font-bold mb-4 text-slate-900">1. Den perfekte CV-en</h2>
                    <ul className="space-y-3 text-slate-600 mb-6">
                        <li className="flex gap-2">
                            <span className="text-primary-600">✓</span> Hold det kort og relevant (maks 1-2 sider)
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary-600">✓</span> Start med det nyeste først
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary-600">✓</span> Tilpass nøkkelordene til stillingen
                        </li>
                    </ul>
                    <Link href="/cv-generator" className="btn-secondary text-sm w-full block text-center">
                        Prøv vår CV-generator gratis
                    </Link>
                </div>

                {/* Application Tips */}
                <div className="glass-card bg-white hover:bg-slate-50 transition-colors p-8 shadow-sm">
                    <div className="text-4xl mb-4">✍️</div>
                    <h2 className="text-2xl font-bold mb-4 text-slate-900">2. Søknaden som fenger</h2>
                    <ul className="space-y-3 text-slate-600 mb-6">
                        <li className="flex gap-2">
                            <span className="text-primary-600">✓</span> Ikke kopier en mal blindt
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary-600">✓</span> Svar på *hvorfor* du vil ha jobben
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary-600">✓</span> Vis til eksempler på hva du kan
                        </li>
                    </ul>
                </div>

                {/* Interview Tips */}
                <div className="glass-card bg-white hover:bg-slate-50 transition-colors p-8 shadow-sm">
                    <div className="text-4xl mb-4">🤝</div>
                    <h2 className="text-2xl font-bold mb-4 text-slate-900">3. Intervjuet</h2>
                    <ul className="space-y-3 text-slate-600">
                        <li className="flex gap-2">
                            <span className="text-primary-600">✓</span> Les deg opp på bedriften i forkant
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary-600">✓</span> Forbered spørsmål du vil stille dem
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary-600">✓</span> Vær presis, kom 5 minutter før
                        </li>
                    </ul>
                </div>

                {/* Follow Up Tips */}
                <div className="glass-card bg-white hover:bg-slate-50 transition-colors p-8 shadow-sm">
                    <div className="text-4xl mb-4">📞</div>
                    <h2 className="text-2xl font-bold mb-4 text-slate-900">4. Oppfølging</h2>
                    <p className="text-slate-600 mb-4">
                        Har du ikke hørt noe? Det er lov å ta kontakt!
                    </p>
                    <ul className="space-y-3 text-slate-600">
                        <li className="flex gap-2">
                            <span className="text-primary-600">✓</span> Ring etter 1-2 uker hvis stille
                        </li>
                        <li className="flex gap-2">
                            <span className="text-primary-600">✓</span> Send en kort takk-epost etter intervjuet
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center glass-card bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100 p-12 shadow-sm rounded-xl">
                <h3 className="text-2xl font-bold mb-4 text-slate-900">Klar til å søke?</h3>
                <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                    Nå som du har tipsene klare, er det på tide å finne din neste jobb.
                    Vi har samlet de beste mulighetene for deg.
                </p>
                <Link href="/" className="btn-primary px-8 py-3 text-lg">
                    Se ledige stillinger
                </Link>
            </div>
        </div>
    );
}
