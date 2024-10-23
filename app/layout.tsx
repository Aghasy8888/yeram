import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import './globals.scss';
import ReduxProvider from '@/redux/provider';

const montserrat = Montserrat({
  weight: ['400', '700', '600', '500', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Yeram',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" translate="no">
      <body className={montserrat.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
