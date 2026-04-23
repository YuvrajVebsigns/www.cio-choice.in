'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';

/**
 * A useAuth hook that leverages TanStack Query for data fetching and caching,
 * and synchronizes the fetched user with the Zustand global store.
 */
export function useAuth() {
  const { setAuth, clearAuth, isAuthenticated, user } = useAuthStore();

  const query = useQuery({
    queryKey: ['auth-profile'],
    queryFn: async () => {
      const profile = await authService.getProfile();
      return profile;
    },
    // We only retry once if the auth token might just be expired
    retry: 1,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setAuth(query.data);
    } else if (query.isError) {
      clearAuth();
    }
  }, [query.isSuccess, query.isError, query.data, setAuth, clearAuth]);

  return {
    user, // From Zustand (or query.data)
    isAuthenticated,
    isLoading: query.isLoading,
    error: query.error,
  };
}
