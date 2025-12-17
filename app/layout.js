import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Deltidsjobb - Finn din neste deltidsjobb',
    description: 'Norges enkleste plattform for å finne og legge ut deltidsjobber. Søk blant tusenvis av stillinger eller legg ut din egen.',
    keywords: 'deltidsjobb, jobb, stillinger, Norge, deltid, bijobb, ekstrajobb',
};

export default async function RootLayout({ children }) {
    const session = await getServerSession();

    return (
        <html lang="no">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </SessionProvider>
            </body>
        </html>
    );
}
