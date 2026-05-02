import { create } from 'zustand';

interface GreetingState {
  greeting: string | null;
  isLoading: boolean;
  error: string | null;
  fetchGreeting: () => Promise<void>;
}

export const useGreetingStore = create<GreetingState>((set) => ({
  greeting: null,
  isLoading: false,
  error: null,
  fetchGreeting: async () => {
    set({ isLoading: true, error: null });
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const response = await fetch('/api/greeting', {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to fetch greeting');
      }

      const data = (await response.json()) as { message: string; timestamp: string };
      set({ greeting: data.message, isLoading: false, error: null });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      set({
        error: errorMessage,
        isLoading: false,
        greeting: null,
      });
    }
  },
}));
