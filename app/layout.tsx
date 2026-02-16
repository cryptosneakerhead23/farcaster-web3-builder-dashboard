import type { Metadata } from 'next';
import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from '../lib/providers';

export const metadata: Metadata = {
  title: 'Farcaster Web3 Builder Dashboard',
  description: 'Next.js + Sepolia Web3 dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
