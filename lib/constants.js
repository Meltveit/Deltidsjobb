// List of Norwegian cities/municipalities for autocomplete
// List of Norwegian cities/municipalities
export const NORWEGIAN_CITIES = [
    'Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Drammen', 'Fredrikstad', 'Kristiansand', 'Sandnes', 'Tromsø', 'Sarpsborg', 'Skien', 'Ålesund', 'Sandefjord', 'Haugesund', 'Tønsberg', 'Moss', 'Porsgrunn', 'Bodø', 'Arendal', 'Hamar'
];

export const SWEDISH_CITIES = [
    'Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping', 'Lund', 'Umeå', 'Gävle', 'Borås', 'Södertälje', 'Eskilstuna', 'Halmstad', 'Växjö', 'Karlstad'
];

export const DANISH_CITIES = [
    'København', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg', 'Randers', 'Kolding', 'Horsens', 'Vejle', 'Roskilde', 'Herning', 'Hørsholm', 'Helsingør', 'Silkeborg', 'Næstved', 'Fredericia', 'Viborg', 'Køge'
];

export const FINNISH_CITIES = [
    'Helsinki', 'Espoo', 'Tampere', 'Vantaa', 'Oulu', 'Turku', 'Jyväskylä', 'Lahti', 'Kuopio', 'Pori', 'Kouvola', 'Joensuu', 'Lappeenranta', 'Hämeenlinna', 'Vaasa', 'Rovaniemi', 'Seinäjoki', 'Mikkeli', 'Kotka'
];

export const COUNTRIES = [
    'Norway', 'Sweden', 'Denmark', 'Finland'
];

export const CITIES_BY_LOCALE = {
    'no': NORWEGIAN_CITIES,
    'sv': SWEDISH_CITIES,
    'da': DANISH_CITIES,
    'fi': FINNISH_CITIES,
    'en': NORWEGIAN_CITIES // Fallback
};

export const CITY_TO_COUNTRY = {
    ...NORWEGIAN_CITIES.reduce((acc, city) => ({ ...acc, [city]: 'Norway' }), {}),
    ...SWEDISH_CITIES.reduce((acc, city) => ({ ...acc, [city]: 'Sweden' }), {}),
    ...DANISH_CITIES.reduce((acc, city) => ({ ...acc, [city]: 'Denmark' }), {}),
    ...FINNISH_CITIES.reduce((acc, city) => ({ ...acc, [city]: 'Finland' }), {}),
};

// Predefined job tags
export const JOB_TAGS = [
    'Salg',
    'Kassemedarbeider',
    'Servitør',
    'Barista',
    'Kjøkkenassistent',
    'Butikkmedarbeider',
    'Kundeservice',
    'Lagermedarbeider',
    'Resepsjon',
    'Renholder',
    'Dagligvare',
    'Mote',
    'Teknologi',
    'Helse',
    'Hotell',
    'Restaurant',
    'Café',
    'Bar',
    'Retail',
    'Event',
    'Markedsføring',
    'Grafisk design',
    'Programmering',
    'Data',
];

// Job sectors
export const JOB_SECTORS = [
    'Detaljhandel',
    'Restaurant/Bar',
    'Hotell/Overnatting',
    'Kontor/Administrasjon',
    'Helse/Omsorg',
    'Teknologi/IT',
    'Markedsføring/Media',
    'Utdanning',
    'Transport/Logistikk',
    'Sport/Fritid',
    'Kultur/Underholdning',
    'Annet',
];

// Job types / Employment types
export const EMPLOYMENT_TYPES = [
    'Deltid',
    'Heltid',
    'Sesongarbeid',
    'Vikariat',
    'Prosjekt',
    'Annet'
];

// Pricing configuration
export const JOB_LISTING_PRICE = 649; // NOK (deprecated, use STRIPE_PRICES)
export const JOB_LISTING_DURATION_DAYS = 60;

// Stripe Price IDs for different currencies
// Note: Using the same Price ID for all currencies as it supports multi-currency
export const STRIPE_PRICES = {
    'no': {
        priceId: 'price_1SfR9pCq59oBRtBTVOfeUjsT',
        amount: 649,
        currency: 'NOK',
        display: '649 kr'
    },
    'sv': {
        priceId: 'price_1SfR9pCq59oBRtBTVOfeUjsT',
        amount: 599,
        currency: 'SEK',
        display: '599 kr'
    },
    'da': {
        priceId: 'price_1SfR9pCq59oBRtBTVOfeUjsT',
        amount: 399,
        currency: 'DKK',
        display: '399 kr'
    },
    'fi': {
        priceId: 'price_1SfR9pCq59oBRtBTVOfeUjsT',
        amount: 55.90,
        currency: 'EUR',
        display: '€55.90'
    }
};

// Helper function to get price info by locale
export function getPriceByLocale(locale = 'no') {
    return STRIPE_PRICES[locale] || STRIPE_PRICES['no'];
}
