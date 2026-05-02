'use client';

import { useRef } from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface GreetingCardProps {
  greeting: string | null;
  isLoading: boolean;
  error: string | null;
  onTrigger: () => void;
}

export default function GreetingCard({
  greeting,
  isLoading,
  error,
  onTrigger,
}: GreetingCardProps): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTrigger();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <button
        ref={buttonRef}
        onClick={onTrigger}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Trigger Vietnamese greeting display"
      >
        {isLoading ? 'Loading...' : 'Display Greeting'}
      </button>

      <div
        className="w-full rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm"
        role="region"
        aria-live="polite"
        aria-label="Vietnamese greeting"
      >
        {isLoading && (
          <div className="flex flex-col items-center gap-3">
            <Loader className="h-6 w-6 animate-spin text-blue-600" />
            <p className="text-center text-gray-600">Loading greeting...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="flex flex-col items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <p className="text-center text-red-700 font-medium">{error}</p>
          </div>
        )}

        {greeting && !isLoading && !error && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <p className="text-center text-2xl font-bold text-gray-900">
              {greeting}
            </p>
            <p className="text-sm text-gray-500">Successfully loaded</p>
          </div>
        )}

        {!isLoading && !error && !greeting && (
          <p className="text-center text-gray-500">
            Click the button above to display the greeting
          </p>
        )}
      </div>
    </div>
  );
}