import type { Metadata } from 'next';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NP GROUPS | Global Luxury Legacy Platform',
  description: "The world's most exclusive luxury marketplace. Extraordinary physical assets, private jets, superyachts, sovereign islands, supercars, fine horology and high jewellery.",
  keywords: ['luxury marketplace', 'private jets', 'superyachts', 'private islands', 'patek philippe', 'ferrari', 'haute horlogerie', 'np groups'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="bg-white text-[#082015] font-sans antialiased min-h-screen flex flex-col selection:bg-[#C9A84C] selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
