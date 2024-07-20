'use client';

import { TradeTable } from '@/components/tradetable';
import { useTheme } from 'next-themes';

import { useEffect } from 'react';

export default function Home() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  return (
    <main>
      <TradeTable />
    </main>
  );
}
