export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/dashboard/'],
        },
        sitemap: 'https://fleksjobb.no/sitemap.xml',
    };
}
