import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

export type CartItem = {
  id: string;          // unique per (productId + variant)
  productId: string;
  slug: string;
  name: string;
  price: number;
  variant?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  bump: number;        // increments on add — for icon animation
  add: (item: Omit<CartItem, "qty" | "id"> & { qty?: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "cove-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add: CartContextValue["add"] = useCallback((item) => {
    const id = `${item.productId}::${item.variant ?? "default"}`;
    setItems((prev) => {
      const existing = prev.find((p) => p.id === id);
      if (existing) {
        return prev.map((p) => (p.id === id ? { ...p, qty: p.qty + (item.qty ?? 1) } : p));
      }
      return [...prev, { ...item, id, qty: item.qty ?? 1 }];
    });
    setBump((b) => b + 1);
  }, []);

  const remove: CartContextValue["remove"] = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const setQty: CartContextValue["setQty"] = useCallback((id, qty) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
        .filter((p) => p.qty > 0),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ items, count, subtotal, bump, add, remove, setQty, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
