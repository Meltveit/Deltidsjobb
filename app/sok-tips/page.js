export default function SokTipsPage() {
    return (
        <div className="container-custom py-20">
            <div className="max-w-3xl mx-auto glass-card">
                <h1 className="text-4xl font-bold mb-6 gradient-text">Søketips for jobbsøkere</h1>
                <div className="space-y-8 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Skreddersy CV-en din</h2>
                        <p>
                            Ikke send samme CV til alle. Tilpass den til jobben du søker på.
                            Fremhev erfaring som er relevant for akkurat denne stillingen.
                            Bruk gjerne vår <a href="/cv-generator" className="text-primary-400 underline">CV-generator</a> for å lage en proff CV.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Skriv en god søknad</h2>
                        <p>
                            Søknaden er din sjanse til å vise hvem du er. Vær personlig, men profesjonell.
                            Forklar hvorfor du vil ha akkurat denne jobben, og hvorfor du passer til den.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Vær tidlig ute</h2>
                        <p>
                            Mange arbeidsgivere ansetter fortløpende. Ikke vent til fristen går ut med å søke.
                            Sjekk Deltidsjobb.no ofte for nye stillinger.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Følg opp</h2>
                        <p>
                            Hvis du ikke har hørt noe etter en uke eller to, er det lov å sende en høflig e-post
                            eller ringe for å spørre om prosessen. Det viser initiativ.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
