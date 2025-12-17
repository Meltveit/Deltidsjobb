import '../globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Deltidsjobb - Finn din neste deltidsjobb',
    description: 'Den enkleste plattformen for å finne og legge ut deltidsjobber.',
    keywords: 'deltidsjobb, jobb, stillinger, deltid, bijobb, ekstrajobb, sommerjobb',
    type: 'website',
};

const locales = ['no', 'sv', 'da', 'fi'];

export default async function RootLayout({ children, params: { locale } }) {
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale)) notFound();

    const session = await getServerSession();

    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        notFound();
    }

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider locale={locale} messages={messages}>
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
