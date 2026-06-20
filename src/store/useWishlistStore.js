import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items;
        if (!items.find(i => i.id === product.id)) {
          set({ items: [...items, product] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter(i => i.id !== id) });
      },
      toggleItem: (product) => {
        const items = get().items;
        if (items.find(i => i.id === product.id)) {
          set({ items: items.filter(i => i.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },
      isInWishlist: (id) => {
        return get().items.some(i => i.id === id);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'scamazon-wishlist' }
  )
);
