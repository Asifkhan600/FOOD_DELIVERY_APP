import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      setUser:    (user)       => set({ user }),
      setLoading: (isLoading)  => set({ isLoading }),
      logout:     ()           => set({ user: null }),
      isAuthenticated: ()      => !!get().user,
    }),
    { name: "sfd-auth", partialize: (s) => ({ user: s.user }) }
  )
);
