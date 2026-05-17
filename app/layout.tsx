// @ts-nocheck
import type { Metadata } from 'next';
import { Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';
import { getGarrison365Config, buildCssVars } from '@/lib/garrison365-config';

import { Garrison365LivePreview } from '@/components/Garrison365LivePreview';
const mont = Montserrat({ subsets: ['latin'], weight: ['400', '500', '700', '900'], variable: '--font-mont' });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-open' });

export const metadata: Metadata = {
  title: 'Pulse Fitness | Group Fitness Miami',
  description: 'Miami\'s most energetic group fitness studio. HIIT, dance cardio, tabata and more. Feel every beat.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cfg = await getGarrison365Config();
  const vars = buildCssVars(cfg?.brand);
  return (
    <html lang="en" style={vars as React.CSSProperties}>
      <body className={`${mont.variable} ${openSans.variable}`}>{children}<Garrison365LivePreview /></body>
    </html>
  );
}
