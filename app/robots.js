export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/dashboard/'],
        },
        sitemap: 'https://deltidsjobb.no/sitemap.xml', // Replace with your actual domain
    };
}
