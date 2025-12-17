export const metadata = {
    title: 'Personvernerklæring | Deltidsjobb',
    description: 'Slik behandler Deltidsjobb.no dine personopplysninger. Les om innsamling, bruk og dine rettigheter.',
};

export default function PersonvernPage() {
    return (
        <div className="container-custom py-20">
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Personvernerklæring</h1>
                    <p className="text-slate-500">Vi tar ditt personvern på alvor.</p>
                </div>

                <div className="glass-card bg-white p-10 space-y-10 text-slate-700 leading-relaxed shadow-sm">
                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">1. Behandlingsansvarlig</h2>
                        <p>
                            Deltidsjobb (ved daglig leder) er behandlingsansvarlig for virksomhetens behandling av personopplysninger.
                            Erklæringen inneholder opplysninger du har krav på når det samles inn opplysninger fra nettstedet vårt.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">2. Hva vi samler inn</h2>
                        <div className="grid md:grid-cols-2 gap-6 mt-4">
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                                <h3 className="font-semibold text-slate-900 mb-2">For Bedrifter</h3>
                                <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600">
                                    <li>Kontaktinformasjon (navn, e-post, tlf)</li>
                                    <li>Bedriftsinformasjon (org.nr, adresse)</li>
                                    <li>Betalingshistorikk (ikke kortdata)</li>
                                    <li>Stillingsannonser</li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                                <h3 className="font-semibold text-slate-900 mb-2">For Besøkende</h3>
                                <ul className="list-disc pl-5 text-sm space-y-1 text-slate-600">
                                    <li>IP-adresse (anonymisert)</li>
                                    <li>Nettlesertype og versjon</li>
                                    <li>Bruksmønster på nettsiden</li>
                                    <li>Informasjonskapsler (cookies)</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">3. Formålet med behandlingen</h2>
                        <p>
                            Vi behandler opplysningene for å kunne gjennomføre våre forpliktelser overfor deg som kunde,
                            forbedre brukeropplevelsen, og for å kunne besvare henvendelser.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">4. Utlevering til tredjepart</h2>
                        <p>
                            Vi selger ikke dine personopplysninger. Vi deler kun opplysninger med underleverandører som
                            er nødvendige for tjenesten (f.eks. Stripe for betaling, Vercel for hosting, MongoDB for database).
                            Alle våre databehandlere er underlagt streng taushetsplikt.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">5. Dine rettigheter</h2>
                        <p>
                            Du har rett til innsyn i egne opplysninger. Dersom opplysningene er uriktige, ufullstendige eller
                            det ikke er adgang til å behandle dem, kan du be oss om å rette eller slette opplysningene.
                        </p>
                        <p className="mt-4">
                            Ta kontakt med oss på <a href="mailto:personvern@deltidsjobb.no" className="text-primary-600 hover:underline font-medium">personvern@deltidsjobb.no</a> for å utøve dine rettigheter.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
