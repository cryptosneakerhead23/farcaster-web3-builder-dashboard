'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { HabitCheckinCard } from '../components/HabitCheckinCard';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-2xl font-semibold">
        Web3 Builder Dashboard (Sepolia)
      </h1>
      <ConnectButton />
      <HabitCheckinCard />
    </main>
  );
}
