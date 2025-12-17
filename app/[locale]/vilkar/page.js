export default function VilkarPage() {
    return (
        <div className="container-custom py-20">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Vilkår og betingelser</h1>
                    <p className="text-slate-500">Sist oppdatert: {new Date().toLocaleDateString('no-NO')}</p>
                </div>

                <div className="glass-card bg-white p-10 space-y-10 text-slate-700 leading-relaxed shadow-sm">
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">1. Innledning</h2>
                        <p>
                            Velkommen til Deltidsjobb. Disse vilkårene regulerer din bruk av vår nettside og tjenester.
                            Ved å opprette en konto eller bruke våre tjenester, godtar du disse vilkårene i sin helhet.
                            Dersom du er uenig i noen del av vilkårene, kan du ikke bruke tjenesten.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">2. Brukerkonto</h2>
                        <p className="mb-4">
                            For å få tilgang til visse funksjoner (som å legge ut stillinger), må du opprette en konto.
                            Du plikter å oppgi korrekt informasjon og holde denne oppdatert.
                        </p>
                        <p>
                            Du er ansvarlig for å holde passordet ditt hemmelig. Deltidsjobb er ikke ansvarlig for tap
                            som følge av uautorisert bruk av din konto.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">3. Vilkår for bedrifter</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Alle stillingsannonser må være reelle og lovlige i henhold til norsk lov.</li>
                            <li>Vi forbeholder oss retten til å fjerne annonser som er støtende, diskriminerende eller villedende.</li>
                            <li>Betalte tjenester (stillingsutlysning) refunderes ikke etter at annonsen er publisert, med mindre det foreligger en teknisk feil fra vår side.</li>
                            <li>Annonser refunderes ikke hvis de slettes av brukeren før perioden er utløpt.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">4. Immaterielle rettigheter</h2>
                        <p>
                            Alt innhold på Deltidsjobb.no (tekst, grafikk, logoer, kode) tilhører oss eller våre lisensgivere.
                            Det er ikke tillatt å kopiere eller distribuere innhold uten skriftlig samtykke.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">5. Ansvarsbegrensning</h2>
                        <p>
                            Deltidsjobb fungerer kun som en formidler av informasjon. Vi er ikke part i ansettelsesforholdet
                            mellom bedrift og søker. Vi garanterer ikke at bedrifter får søkere, eller at søkere får jobb.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
