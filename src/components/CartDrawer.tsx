"use client";

import { useCart } from "@/components/CartContext";
import { X, Plus, Minus, ShoppingCart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { items, addItem, removeItem, setQty, itemCount, subtotal, open, setOpen, clear } = useCart();
  const router = useRouter();

  if (!items.length) return null;

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "" : "hidden"}`}
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 transform translate-x-0">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your cart</h2>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.map((item) => (
            <div key={item.kitId + item.color + item.chew + item.scentRefill} className="flex gap-3 items-start animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center shrink-0">
                <ShoppingCart className="w-8 h-8 text-gray-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-medium">{item.kitName}</span>
                  <span className="text-sm text-gray-500">×{item.qty}</span>
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  {item.color} · {item.chew}{item.scentRefill ? " · + scent refill" : ""}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">${(item.price * item.qty).toFixed(2)}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setQty(item.kitId, item.color, item.chew, item.scentRefill, item.qty - 1)
                      }
                      className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() =>
                        addItem({
                          kitId: item.kitId,
                          kitName: item.kitName,
                          price: item.price,
                          pods: item.pods,
                          color: item.color,
                          chew: item.chew,
                          scentRefill: item.scentRefill,
                        })
                      }
                      className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.kitId, item.color, item.chew, item.scentRefill)}
                    className="text-xs text-red-600 underline hover:text-red-800 ml-3"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between text-lg font-semibold mb-6">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              setOpen(false);
              router.push("/checkout");
            }}
            className="w-full py-3 bg-slate-800 text-white rounded font-medium hover:bg-slate-900 transition"
          >
            Checkout <ChevronRight className="w-4 h-4 ml-1" />
          </button>
          <button
            onClick={() => { clear(); setOpen(false); }}
            className="w-full py-2 mt-2 text-gray-500 text-sm underline hover:text-gray-800"
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
