// Map occupations to internal Sectors
const occupationMap = {
    'Helse og sosial': 'Helse og Omsorg',
    'Salg og service': 'Salg og Service',
    'Industri, bygg og anlegg': 'Bygg og Anlegg',
    'Kontor og administrasjon': 'Kontor og Administrasjon',
    'Undervisning': 'Undervisning',
    'IT': 'IT og Teknologi',
    'Transport og logistikk': 'Transport og Lager',
    // ... add more as we find them
};

function getSector(navJob) {
    if (navJob.occupationList && navJob.occupationList.length > 0) {
        const level1 = navJob.occupationList[0].level1;
        return occupationMap[level1] || 'Annet';
    }
    return 'Annet';
}
