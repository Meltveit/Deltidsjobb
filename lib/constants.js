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

export const CITIES_BY_LOCALE = {
    'no': NORWEGIAN_CITIES,
    'sv': SWEDISH_CITIES,
    'da': DANISH_CITIES,
    'fi': FINNISH_CITIES,
    'en': NORWEGIAN_CITIES // Fallback
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
export const JOB_LISTING_PRICE = 649; // NOK
export const JOB_LISTING_DURATION_DAYS = 60;
