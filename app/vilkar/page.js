export default function VilkarPage() {
    return (
        <div className="container-custom py-20">
            <div className="max-w-3xl mx-auto glass-card">
                <h1 className="text-4xl font-bold mb-6 gradient-text">Vilkår og betingelser</h1>
                <div className="space-y-6 text-gray-300">
                    <p>Sist oppdatert: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-xl font-bold text-white mt-6">1. Generelt</h2>
                    <p>
                        Ved å bruke Deltidsjobb.no aksepterer du disse vilkårene. Tjenesten leveres "som den er",
                        og vi forbeholder oss retten til å endre vilkårene når som helst.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6">2. For arbeidsgivere</h2>
                    <p>
                        Arbeidsgivere er ansvarlige for innholdet i sine stillingsannonser. Annonser må ikke
                        inneholde diskriminerende, støtende eller ulovlig innhold. Betalte annonser refunderes
                        normalt ikke etter publisering.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6">3. For jobbsøkere</h2>
                    <p>
                        Deltidsjobb.no er ikke ansvarlig for ansettelsesprosessen eller kommunikasjonen
                        mellom arbeidsgiver og arbeidstaker. Vi oppfordrer alle til å være aktsomme med
                        personlig informasjon.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-6">4. Ansvarsbegrensning</h2>
                    <p>
                        Deltidsjobb.no er ikke ansvarlig for direkte eller indirekte tap som følge av bruk
                        av tjenesten.
                    </p>
                </div>
            </div>
        </div>
    );
}
