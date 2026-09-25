import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat, Playfair_Display, Cinzel } from 'next/font/google';
import './globals.css';
import LuxuryShell from '@/components/layout/LuxuryShell';
import { CountryProvider } from '@/lib/countryContext';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NP GROUPS | International Private Luxury Network',
  description: 'An international private luxury network for exceptional assets, businesses, services, experiences and private opportunities.',
  keywords: ['private luxury network', 'private aviation', 'superyachts', 'private islands', 'patek philippe', 'ferrari', 'haute horlogerie', 'np groups', 'off-market assets'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable} ${playfair.variable} ${cinzel.variable} scroll-smooth`}>
      <body className="bg-[#FCFBF7] text-[#080B09] font-sans antialiased min-h-screen selection:bg-[#C6A15B] selection:text-white">
        <CountryProvider>
          <LuxuryShell>
            {children}
          </LuxuryShell>
        </CountryProvider>
      </body>
    </html>
  );
}
