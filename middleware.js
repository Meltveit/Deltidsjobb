import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['no', 'sv', 'da', 'fi'],

    // Used when no locale matches
    defaultLocale: 'no'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(no|sv|da|fi)/:path*']
};
