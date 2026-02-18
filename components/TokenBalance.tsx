'use client';

import { useAccount, useReadContract } from 'wagmi';
import { erc20Abi, formatUnits } from 'viem';

const TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'; // replace later with a real Sepolia ERC-20
const TOKEN_SYMBOL = 'TEST';
const TOKEN_DECIMALS = 18;

export function TokenBalance() {
  const { address } = useAccount();

  const { data, isLoading, error } = useReadContract({
    address: TOKEN_ADDRESS as `0x${string}`,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  if (!address) {
    return (
      <section className="border rounded-lg p-4 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-2">Token Balance</h2>
        <p>Connect your wallet to see your {TOKEN_SYMBOL} on Sepolia.</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="border rounded-lg p-4 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-2">Token Balance</h2>
        <p>Loading {TOKEN_SYMBOL} balance...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="border rounded-lg p-4 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-2">Token Balance</h2>
        <p className="text-red-600 text-sm">Error fetching balance.</p>
      </section>
    );
  }

  const raw = (data ?? BigInt(0)) as bigint;



  const formatted = formatUnits(raw, TOKEN_DECIMALS);

  return (
    <section className="border rounded-lg p-4 max-w-md w-full">
      <h2 className="text-lg font-semibold mb-2">Token Balance</h2>
      <p>
        {TOKEN_SYMBOL} on Sepolia:{' '}
        <span className="font-mono">{formatted}</span>
      </p>
    </section>
  );
}
