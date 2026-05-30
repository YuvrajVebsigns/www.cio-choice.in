import { create } from 'zustand';
import { User } from '@/types/user.types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  // eslint-disable-next-line no-unused-vars
  setAuth: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setAuth: (user) => set({ user, isAuthenticated: true }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),
}));
