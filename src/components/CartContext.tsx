"use client";

import { createContext, useContext, useCallback, useState, useEffect } from "react";
import { Kit, ColorId, ChewId, KitId } from "@/lib/products";

export interface CartItem {
  kitId: KitId;
  kitName: string;
  price: number;
  pods: number;
  color: ColorId;
  chew: ChewId;
  scentRefill: boolean;
  qty: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (kitId: KitId, color: ColorId, chew: ChewId, scentRefill: boolean) => void;
  setQty: (kitId: KitId, color: ColorId, chew: ChewId, scentRefill: boolean, qty: number) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
  open: boolean;
  setOpen: (o: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function keyOf(i: Pick<CartItem, "kitId" | "color" | "chew" | "scentRefill">) {
  return `${i.kitId}|${i.color}|${i.chew}|${i.scentRefill}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("scenttrail_cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("scenttrail_cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback(
    (item: Omit<CartItem, "qty">) => {
      setItems((prev) => {
        const existing = prev.find((i) => keyOf(i) === keyOf(item));
        if (existing) {
          return prev.map((i) =>
            keyOf(i) === keyOf(item) ? { ...i, qty: i.qty + 1 } : i
          );
        }
        return [...prev, { ...item, qty: 1 }];
      });
      setOpen(true);
    },
    []
  );

  const removeItem = useCallback(
    (kitId: KitId, color: ColorId, chew: ChewId, scentRefill: boolean) => {
      setItems((prev) => prev.filter((i) => keyOf(i) !== `${kitId}|${color}|${chew}|${scentRefill}`));
    },
    []
  );

  const setQty = useCallback(
    (kitId: KitId, color: ColorId, chew: ChewId, scentRefill: boolean, qty: number) => {
      if (qty <= 0) {
        removeItem(kitId, color, chew, scentRefill);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          keyOf(i) === `${kitId}|${color}|${chew}|${scentRefill}` ? { ...i, qty } : i
        )
      );
    },
    [removeItem]
  );

  const clear = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, setQty, clear, itemCount, subtotal, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
