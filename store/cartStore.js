import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      restaurantName: null,
      isOpen: false,

      addItem: (item) => {
        const { items, restaurantId } = get();
        if (restaurantId && restaurantId !== item.restaurant_id) {
          set({
            items: [{ ...item, quantity: 1 }],
            restaurantId: item.restaurant_id,
            restaurantName: item.restaurant_name ?? null,
          });
          return;
        }
        const existing = items.find((i) => i.item_id === item.item_id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.item_id === item.item_id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({
            items: [...items, { ...item, quantity: 1 }],
            restaurantId: item.restaurant_id,
            restaurantName: item.restaurant_name ?? null,
          });
        }
      },

      removeItem: (itemId) => {
        const filtered = get().items.filter((i) => i.item_id !== itemId);
        set({
          items: filtered,
          restaurantId: filtered.length ? get().restaurantId : null,
          restaurantName: filtered.length ? get().restaurantName : null,
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) { get().removeItem(itemId); return; }
        set({ items: get().items.map((i) => i.item_id === itemId ? { ...i, quantity } : i) });
      },

      clearCart: () => set({ items: [], restaurantId: null, restaurantName: null }),
      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal:   () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "sfd-cart" }
  )
);
