import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['no', 'sv', 'da', 'fi'],
    defaultLocale: 'no'
});

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
