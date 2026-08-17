import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/types/user";

interface UserStore {
  user: User;
  setUser: (data: User) => void;
  updateUser: (data: Partial<User>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {
        name: "John Doe",
        avatarUrl:
          "https://i.pinimg.com/736x/06/f2/4a/06f24a9f75f571afe08ca9383d57927e.jpg",
      },
      setUser: (data) => set({ user: data }),
      updateUser: (data) =>
        set((state) => ({ user: { ...state.user, ...data } })),
    }),
    {
      name: "linkvault-user",
    },
  ),
);
