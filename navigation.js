import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['no', 'sv', 'da', 'fi'];
export const localePrefix = 'always'; // Default

export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation({ locales, localePrefix });
