export default function ForBedrifterPage() {
    return (
        <div className="container-custom py-20">
            <div className="max-w-4xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6 gradient-text">
                        For Bedrifter
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                        Den enkleste måten å finne din neste ansatt på
                    </p>
                </div>

                {/* Benefits */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="glass-card text-center">
                        <div className="text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-semibold mb-2">Raskt og enkelt</h3>
                        <p className="text-gray-400 text-sm">
                            Legg ut en stilling på under 5 minutter
                        </p>
                    </div>
                    <div className="glass-card text-center">
                        <div className="text-4xl mb-4">💰</div>
                        <h3 className="text-xl font-semibold mb-2">Rimelig pris</h3>
                        <p className="text-gray-400 text-sm">
                            Kun 650 kr for 60 dager
                        </p>
                    </div>
                    <div className="glass-card text-center">
                        <div className="text-4xl mb-4">🎯</div>
                        <h3 className="text-xl font-semibold mb-2">Nå riktig målgruppe</h3>
                        <p className="text-gray-400 text-sm">
                            SEO-optimalisert for maksimal synlighet
                        </p>
                    </div>
                </div>

                {/* How it works */}
                <div className="glass-card mb-12">
                    <h2 className="text-3xl font-bold mb-8 text-center">Slik fungerer det</h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Opprett konto</h3>
                                <p className="text-gray-400 text-sm">
                                    Registrer bedriften din gratis
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Legg ut stilling</h3>
                                <p className="text-gray-400 text-sm">
                                    Fyll ut informasjon om stillingen i 3 enkle steg
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Betal og publiser</h3>
                                <p className="text-gray-400 text-sm">
                                    Betal 650 kr med kort, og stillingen publiseres umiddelbart
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center font-bold">
                                4
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Motta søknader</h3>
                                <p className="text-gray-400 text-sm">
                                    Kandidater sender søknader direkte til din e-post
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <a href="/auth/signup" className="btn-primary px-12 py-4 text-lg">
                        Kom i gang nå
                    </a>
                </div>
            </div>
        </div>
    );
}
