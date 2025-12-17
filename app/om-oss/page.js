export const metadata = {
    title: 'Om Deltidsjobb - Vår misjon for det norske arbeidsmarkedet',
    description: 'Bli kjent med Deltidsjobb. Vi kobler arbeidssøkere med ledige stillinger gjennom en enkel og effektiv plattform.',
    openGraph: {
        title: 'Om Deltidsjobb - Vår misjon',
        description: 'Vi gjør det enklere å finne og utlyse deltidsjobber i Norge.',
    },
};

export default function OmOssPage() {
    return (
        <div className="container-custom py-20">
            {/* Hero Section */}
            <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in">
                <span className="text-secondary-400 font-semibold tracking-wider uppercase text-sm mb-4 block">Vår Historie</span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    Vi bygger fremtidens <span className="gradient-text">arbeidsplass</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                    Deltidsjobb startet med en enkel idé: Det burde være like enkelt å finne en ekstrajobb som det er å bestille en reise.
                    I dag hjelper vi tusenvis av nordmenn med å finne meningsfulle jobber som passer deres hverdag.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 animate-slide-up">
                <div className="glass-card p-8 text-center relative overflow-hidden group hover:border-primary-500/50 transition-all">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500"></div>
                    <div className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                    <p className="text-gray-400">Norskutviklet</p>
                </div>
                <div className="glass-card p-8 text-center relative overflow-hidden group hover:border-primary-500/50 transition-all">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500"></div>
                    <div className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                    <p className="text-gray-400">Support og tilgjengelighet</p>
                </div>
                <div className="glass-card p-8 text-center relative overflow-hidden group hover:border-primary-500/50 transition-all">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500"></div>
                    <div className="text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">Enkelt</div>
                    <p className="text-gray-400">Brukervennlig fokus</p>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <div className="glass-card p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/0 border-l-4 border-l-primary-500">
                    <h2 className="text-3xl font-bold mb-6">Vår misjon</h2>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                        Vi skal forenkle rekrutteringsprosessen for deltidsstillinger. Ved å fjerne støy og fokusere utelukkende på
                        deltidsmarkedet, skaper vi en mer effektiv møteplass for studenter, ekstrahjelper og bedrifter.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        Vi tror på at fleksibelt arbeid er nøkkelen til et dynamisk samfunn, og vi jobber hver dag for å
                        koble rett person til rett jobb.
                    </p>
                </div>
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 text-xl font-bold shrink-0">1</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Transparens</h3>
                            <p className="text-gray-400">Åpne priser, ingen skjulte gebyrer og tydelig kommunikasjon.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 text-xl font-bold shrink-0">2</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Kvalitet</h3>
                            <p className="text-gray-400">Vi kvalitetssikrer alle stillingsannonser for å unngå spam og useriøse aktører.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 text-xl font-bold shrink-0">3</div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Innovasjon</h3>
                            <p className="text-gray-400">Vi utvikler stadig nye verktøy som CV-generatoren for å hjelpe søkere videre.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
