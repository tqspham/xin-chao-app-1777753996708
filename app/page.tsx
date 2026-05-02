'use client';

import { useEffect } from 'react';
import { useGreetingStore } from '@/lib/store';
import GreetingCard from '@/components/GreetingCard';

export default function Home(): JSX.Element {
  const { greeting, isLoading, error, fetchGreeting } = useGreetingStore();

  const handleTrigger = (): void => {
    fetchGreeting();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <div className="w-full max-w-md">
        <GreetingCard
          greeting={greeting}
          isLoading={isLoading}
          error={error}
          onTrigger={handleTrigger}
        />
      </div>
    </main>
  );
}