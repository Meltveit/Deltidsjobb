export default function PersonvernPage() {
    return (
        <div className="container-custom py-20">
            <div className="max-w-3xl mx-auto glass-card">
                <h1 className="text-4xl font-bold mb-6 gradient-text">Personvernerklæring</h1>
                <div className="space-y-6 text-gray-300">
                    <p>
                        Vi i Deltidsjobb.no tar ditt personvern på alvor. Denne erklæringen forklarer hvilke
                        opplysninger vi samler inn og hvordan vi bruker dem.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6">Hvilken informasjon samler vi inn?</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>For bedrifter: Bedriftsnavn, kontaktperson, e-post, telefonnummer og bedriftsinfo.</li>
                        <li>For alle brukere: Informasjonskapsler (cookies) for å forbedre brukeropplevelsen.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-white mt-6">Hvordan bruker vi informasjonen?</h2>
                    <p>
                        Vi bruker informasjonen til å levere tjenesten, håndtere betalinger (via Stripe),
                        og kommunisere med deg angående din konto eller dine annonser.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6">Deling av informasjon</h2>
                    <p>
                        Vi selger ikke dine personopplysninger til tredjeparter. Informasjon deles kun
                        når det er nødvendig for å levere tjenesten (f.eks. til betalingsleverandør).
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6">Dine rettigheter</h2>
                    <p>
                        Du har rett til å be om innsyn i, retting av, eller sletting av dine personopplysninger.
                        Kontakt oss på kontakt@deltidsjobb.no for henvendelser.
                    </p>
                </div>
            </div>
        </div>
    );
}
