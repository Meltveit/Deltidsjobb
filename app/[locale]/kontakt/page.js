export const metadata = {
    title: 'Kontakt oss | Kundeservice Fleksjobb',
    description: 'Trenger du hjelp? Kontakt kundeservice hos Fleksjobb.no for spørsmål om annonsering, teknisk support eller samarbeid.',
};

export default function KontaktPage() {
    return (
        <div className="container-custom py-20">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6 gradient-text">Kontakt oss</h1>
                    <p className="text-xl text-slate-600">
                        Vi er her for å hjelpe deg, enten du er arbeidssøker eller arbeidsgiver.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="glass-card bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-bold mb-6 text-slate-900">Ta kontakt</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                                        📧
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">Generelle henvendelser</h3>
                                        <a href="mailto:kontakt@fleksjobb.no" className="text-slate-500 hover:text-primary-600 transition-colors">
                                            kontakt@fleksjobb.no
                                        </a>
                                        <p className="text-xs text-slate-400 mt-1">Vi svarer innen 24 timer</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                                        💼
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900">For bedrifter</h3>
                                        <a href="mailto:bedrift@fleksjobb.no" className="text-slate-500 hover:text-primary-600 transition-colors">
                                            bedrift@fleksjobb.no
                                        </a>
                                        <p className="text-xs text-slate-400 mt-1">Annonsering og samarbeid</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card bg-white p-8 bg-gradient-to-br from-white to-slate-50 shadow-sm border border-slate-100">
                            <h3 className="text-lg font-semibold mb-4 text-primary-600">Ofte stilte spørsmål</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium text-slate-900 text-sm">Hva koster en annonse?</h4>
                                    <p className="text-sm text-slate-500">649 kr for 60 dager.</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-900 text-sm">Hvordan endrer jeg annonsen?</h4>
                                    <p className="text-sm text-slate-500">Logg inn på dashboardet og trykk rediger.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Details */}
                    <div className="glass-card bg-white p-8 shadow-sm">
                        <h2 className="text-2xl font-bold mb-6 text-slate-900">Send oss en melding</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-700">Navn</label>
                                <input type="text" className="input" placeholder="Ditt navn" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-700">E-post</label>
                                <input type="email" className="input" placeholder="din@epost.no" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-700">Emne</label>
                                <select className="input">
                                    <option>Generelt spørsmål</option>
                                    <option>Teknisk problem</option>
                                    <option>Fakturaspørsmål</option>
                                    <option>Samarbeid</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-slate-700">Melding</label>
                                <textarea className="input min-h-[120px]" placeholder="Hva kan vi hjelpe deg med?" required></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full">
                                Send melding
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
