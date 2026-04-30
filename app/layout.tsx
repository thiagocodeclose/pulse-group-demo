// @ts-nocheck
import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';

const mont = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700', '900'], variable: '--font-mont' });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-open' });

export const metadata: Metadata = {
  title: 'Pulse Fitness | Group Fitness Miami',
  description: 'Miami\'s most energetic group fitness studio. HIIT, dance cardio, tabata and more. Feel every beat.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${mont.variable} ${openSans.variable}`}>{children}</body>
    </html>
  );
}
