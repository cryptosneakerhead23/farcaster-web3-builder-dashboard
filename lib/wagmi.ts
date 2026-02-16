'use client';

import { http } from 'viem';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Farcaster Web3 Builder Dashboard',
  projectId: 'PUBLIC_TEST_PROJECT_ID', // replace later with a free WalletConnect projectId
  chains: [sepolia],
  ssr: true,
  transports: {
    [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com'),
  },
});
