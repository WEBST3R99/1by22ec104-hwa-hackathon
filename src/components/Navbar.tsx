"use client";

import { useCart } from "@/components/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { itemCount, open, setOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-white font-mono text-sm">
              ST
            </div>
            <span>ScentTrail</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-slate-800">Home</Link>
            <Link href="/product" className="text-sm font-medium text-gray-600 hover:text-slate-800">The Pods</Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="relative p-2 text-gray-600 hover:text-slate-800"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-slate-800"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-b bg-white px-4 py-3 space-y-2">
          <Link href="/" className="block py-2 text-sm font-medium text-gray-600 hover:text-slate-800">Home</Link>
          <Link href="/product" className="block py-2 text-sm font-medium text-gray-600 hover:text-slate-800">The Pods</Link>
        </div>
      )}
    </div>
  );
}
