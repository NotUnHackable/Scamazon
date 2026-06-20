import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find(i => i.id === product.id);
        if (existing) {
          set({
            items: items.map(i =>
              i.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity }] });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter(i => i.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter(i => i.id !== id) });
          return;
        }
        set({
          items: get().items.map(i =>
            i.id === id ? { ...i, quantity } : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    { name: 'scamazon-cart' }
  )
);

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      signIn: (email, name) => {
        set({ user: { email, name } });
      },
      signOut: () => set({ user: null }),
      isSignedIn: () => get().user !== null,
    }),
    { name: 'scamazon-user' }
  )
);

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => {
        const newOrder = {
          ...order,
          id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          date: new Date().toISOString(),
          status: 'Confirmed',
        };
        set({ orders: [newOrder, ...get().orders] });
        return newOrder;
      },
      getOrders: () => get().orders,
    }),
    { name: 'scamazon-orders' }
  )
);

export const useSearchStore = create((set) => ({
  query: '',
  setQuery: (query) => set({ query }),
}));
