import { create } from "zustand";

interface UIStore {
  isAddBookmarkOpen: boolean;
  openAddBookmark: () => void;
  closeAddBookmark: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isAddBookmarkOpen: false,

  openAddBookmark: () => set({ isAddBookmarkOpen: true }),
  closeAddBookmark: () => set({ isAddBookmarkOpen: false }),
}));
