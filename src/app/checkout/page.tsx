"use client";

import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

interface ShippingForm {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export default function Checkout() {
  const { items, subtotal, itemCount, clear } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<"shipping" | "payment" | "placed">("shipping");
  const [form, setForm] = useState<ShippingForm>({
    name: "", email: "", address: "", city: "", state: "", zip: "", phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center py-20">
        <div className="text-center">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link href="/product" className="mt-4 inline-block text-sm text-slate-800 underline hover:text-slate-600">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  if (step === "placed") {
    return (
      <div className="flex flex-col flex-1 py-20 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Order placed!</h1>
          <p className="text-gray-600 mb-8">Thank you for shopping with ScentTrail. Your pods are on the way.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2 bg-slate-800 text-white rounded font-medium hover:bg-slate-900 transition"
          >
            Continue shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shipping: form,
          subtotal,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");
      clear();
      setStep("placed");
      router.push(`/order/${data.orderId}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/cart" className="flex items-center gap-2 text-slate-600 hover:text-slate-800">
            <ArrowLeft className="w-4 h-4" /> Back to cart
          </Link>
          <div className="text-sm font-medium text-slate-900">Checkout · {itemCount} item{itemCount > 1 ? "s" : ""}</div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Mail className="w-4 h-4 text-scent" /> Shipping details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-scent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-scent outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-scent outline-none"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-scent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      name="state"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-scent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                    <input
                      name="zip"
                      value={form.zip}
                      onChange={(e) => setForm({ ...form, zip: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-scent outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-scent outline-none"
                    required
                  />
                </div>
                {error && (
                  <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-100">{error}</div>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900 transition disabled:opacity-70"
                >
                  {submitting ? "Placing order…" : "Continue to payment"}
                </button>
              </form>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-24">
            <h2 className="text-lg font-bold mb-4">Order summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.kitId + item.color + item.chew + item.scentRefill} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.kitName} × {item.qty}</p>
                    <p className="text-xs text-gray-500">{item.color} · {item.chew}{item.scentRefill ? " · + refill" : ""}</p>
                  </div>
                  <span className="font-medium">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between text-sm font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-sm font-medium">
                <span>Shipping</span>
                <span className={subtotal >= 50 ? "text-green-600" : "text-gray-600"}>
                  {subtotal >= 50 ? "Free" : "$9.99"}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(subtotal + (subtotal >= 50 ? 0 : 9.99)).toFixed(2)}</span>
              </div>
            </div>
            <div className="rounded-lg border p-4 bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-gray-400" />
                <span className="text-xs font-medium text-gray-600">Standard delivery</span>
              </div>
              <p className="text-xs text-gray-500">3–5 business days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
