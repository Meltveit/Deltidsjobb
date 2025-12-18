import '../globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Fleksjobb - Finn din neste deltidsjobb',
    description: 'Den enkleste plattformen i Norden for å finne og legge ut deltidsjobber.',
    keywords: 'fleksjobb, deltidsjobb, jobb, stillinger, deltid, bijobb, ekstrajobb, sommerjobb',
    type: 'website',
};

// Generates static params for all supported locales
export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params: { locale } }) {
    // Enable static rendering
    setRequestLocale(locale);

    const session = await getServerSession();

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    <SessionProvider session={session}>
                        <div className="flex flex-col min-h-screen">
                            <Navbar locale={locale} />
                            <main className="flex-1">{children}</main>
                            <Footer locale={locale} />
                        </div>
                    </SessionProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
