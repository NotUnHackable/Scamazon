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
      loading: false,
      error: null,
      signIn: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
          const users = await res.json();
          if (users.length === 0) {
            set({ loading: false, error: 'No account found with this email' });
            return false;
          }
          const user = users[0];
          if (user.password !== password) {
            set({ loading: false, error: 'Incorrect password' });
            return false;
          }
          set({ user: { id: user.id, email: user.email, name: user.name }, loading: false });
          return true;
        } catch (err) {
          set({ loading: false, error: 'Failed to connect to server' });
          return false;
        }
      },
      register: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(`/api/users?email=${encodeURIComponent(email)}`);
          const existing = await res.json();
          if (existing.length > 0) {
            set({ loading: false, error: 'An account with this email already exists' });
            return false;
          }
          const createRes = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          });
          const newUser = await createRes.json();
          set({ user: { id: newUser.id, email: newUser.email, name: newUser.name }, loading: false });
          return true;
        } catch (err) {
          set({ loading: false, error: 'Failed to connect to server' });
          return false;
        }
      },
      signOut: () => set({ user: null, error: null }),
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
