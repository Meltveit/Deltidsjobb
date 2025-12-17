import { Link } from '@/navigation';

export default function VilkarPage() {
    return (
        <div className="container-custom py-20">
            {/* Header / Hero */}
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
                <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-4 block">Juridisk</span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                    Vilkår og <span className="gradient-text">Betingelser</span>
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed">
                    For at Deltidsjobb skal være en trygg og effektiv plattform for alle, har vi noen enkle spilleregler.
                </p>
                <div className="mt-4 text-sm text-slate-400">
                    Sist oppdatert: {new Date().toLocaleDateString('no-NO')}
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
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Innledning</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Velkommen til Deltidsjobb. Disse vilkårene regulerer din bruk av vår nettside og tjenester.
                                Ved å opprette en konto eller bruke våre tjenester, godtar du disse vilkårene i sin helhet.
                                Dersom du er uenig i noen del av vilkårene, kan du dessverre ikke bruke tjenesten.
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
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Din Brukerkonto</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                For å få tilgang til visse funksjoner (som å legge ut stillinger), må du opprette en konto.
                                Du plikter å oppgi korrekt informasjon og holde denne oppdatert.
                            </p>
                            <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700 border border-slate-100 flex gap-3 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Du er selv ansvarlig for å holde passordet ditt hemmelig og trygt.
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
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. For Bedrifter</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h3 className="font-semibold text-slate-900 mb-2">Annonsering</h3>
                                    <p className="text-sm text-slate-600">Alle stillingsannonser skal være reelle og følge norsk lov. Vi tillater ikke innhold som er diskriminerende eller villedende.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                    <h3 className="font-semibold text-slate-900 mb-2">Betaling & Refusjon</h3>
                                    <p className="text-sm text-slate-600">Kjøpte annonseplasser refunderes normalt ikke etter publisering. Ved tekniske feil fra vår side ordner vi selvsagt opp.</p>
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
                        <h2 className="text-xl font-bold text-slate-900 mb-3">4. Rettigheter</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Alt innhold på Deltidsjobb.no (tekst, grafikk, logoer, kode) tilhører oss eller våre lisensgivere.
                            Kopiering uten samtykke er ikke tillatt.
                        </p>
                    </div>

                    <div className="glass-card bg-white p-8 shadow-sm hover:shadow-md transition-all">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-xl mb-4">
                            🛡️
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3">5. Ansvar</h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Vi er en formidler. Vi har ikke ansvar for ansettelsesprosessen eller forholdet mellom arbeidsgiver og arbeidstaker.
                        </p>
                    </div>
                </div>

                {/* Footer Link */}
                <div className="text-center mt-12 bg-slate-50 rounded-2xl p-8 border border-slate-100/50">
                    <p className="text-slate-600 mb-4">Har du spørsmål om våre vilkår?</p>
                    <Link href="/kontakt" className="btn-secondary">
                        Kontakt oss
                    </Link>
                </div>
            </div>
        </div>
    );
}
