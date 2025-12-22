// Map occupations to internal Sectors
export const occupationMap = {
    // Level 1 mappings
    'Helse og sosial': 'Helse og Omsorg',
    'Salg og service': 'Salg og Service',
    'Industri, bygg og anlegg': 'Bygg og Anlegg',
    'Kontor og administrasjon': 'Kontor og Administrasjon',
    'Undervisning': 'Undervisning',
    'IT': 'IT og Teknologi',
    'Transport og logistikk': 'Transport og Lager',
    'Kultur og natur': 'Kultur og Natur',
    'Hotell og reiseliv': 'Reiseliv og Servering',

    // Specific Level 2 mappings (overrides)
    'Butikk': 'Butikk',
    'Renhold': 'Renhold',
    'Kokk': 'Restaurant og Servering',
    'Servitør': 'Restaurant og Servering',
    'Sjåfør': 'Transport',
    'Lager': 'Lager og Logistikk',
    'Barnehage': 'Oppvekst',
};

export function getSector(navJob) {
    if (navJob.occupationList && navJob.occupationList.length > 0) {
        // Try Level 2 first (more specific)
        const occ = navJob.occupationList[0];
        if (occ.level2 && occupationMap[occ.level2]) return occupationMap[occ.level2];
        // Try Level 1
        if (occ.level1 && occupationMap[occ.level1]) return occupationMap[occ.level1];
    }
    return 'Annet';
}
