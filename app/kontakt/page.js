export default function KontaktPage() {
    return (
        <div className="container-custom py-20">
            <div className="max-w-3xl mx-auto glass-card text-center">
                <h1 className="text-4xl font-bold mb-6 gradient-text">Kontakt oss</h1>
                <p className="text-gray-300 mb-8">
                    Har du spørsmål, tilbakemeldinger, eller trenger du hjelp?
                    Vi er her for å hjelpe deg.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="p-6 bg-white/5 rounded-xl">
                        <h2 className="text-xl font-bold mb-2">E-post</h2>
                        <a href="mailto:kontakt@deltidsjobb.no" className="text-primary-400 hover:text-primary-300 text-lg">
                            kontakt@deltidsjobb.no
                        </a>
                        <p className="text-sm text-gray-500 mt-2">Vi svarer vanligvis innen 24 timer.</p>
                    </div>

                    <div className="p-6 bg-white/5 rounded-xl">
                        <h2 className="text-xl font-bold mb-2">Bedriftshenvendelser</h2>
                        <a href="mailto:bedrift@deltidsjobb.no" className="text-primary-400 hover:text-primary-300 text-lg">
                            bedrift@deltidsjobb.no
                        </a>
                        <p className="text-sm text-gray-500 mt-2">For spørsmål om annonsering eller samarbeid.</p>
                    </div>
                </div>

                <div className="p-8 border border-white/10 rounded-xl">
                    <h2 className="text-2xl font-bold mb-4">Ofte stilte spørsmål</h2>
                    <div className="text-left space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Hva koster det å legge ut en stilling?</h3>
                            <p className="text-gray-400">Det koster 649 kr eks. mva å legge ut en stilling. Annonsen ligger ute i 60 dager.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">Hvordan endrer jeg en annonse?</h3>
                            <p className="text-gray-400">Logg inn på ditt dashbord, finn stillingen under "Aktive stillinger" og trykk på "Rediger".</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
