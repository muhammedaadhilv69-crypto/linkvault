import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Bookmark } from "@/types/bookmark";

interface BookmarkStore {
  bookmarks: Bookmark[];

  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  updateBookmark: (id: string, data: Partial<Bookmark>) => void;
  toggleFavorite: (id: string) => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set) => ({
      bookmarks: [],

      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, bookmark],
        })),

      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
        })),

      updateBookmark: (id, data) =>
        set((state) => ({
          bookmarks: state.bookmarks.map((bookmark) =>
            bookmark.id === id ? { ...bookmark, ...data } : bookmark,
          ),
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.map((bookmark) =>
            bookmark.id === id
              ? { ...bookmark, favorite: !bookmark.favorite }
              : bookmark,
          ),
        })),
    }),
    {
      name: "linkvault-bookmarks",
      partialize: (state) => ({
        bookmarks: state.bookmarks,
      }),
    },
  ),
);
