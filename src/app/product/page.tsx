"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Clock, Package, Star, HelpCircle, ArrowRight } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { KITS, COLORS, CHEW_RATINGS, SCENT_REFILL_PRICE, SCHEDULE, SPECS, REVIEWS, FAQS } from "@/lib/products";

export default function ProductPage() {
  const { addItem, itemCount } = useCart();
  const [kitId, setKitId] = useState<"starter" | "fullhome">("starter");
  const [color, setColor] = useState<"sage" | "slate" | "lavender">("sage");
  const [chew, setChew] = useState<"standard" | "tough">("standard");
  const [scentRefill, setScentRefill] = useState(false);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const kit = KITS.find((k) => k.id === kitId)!;
  const chewRating = CHEW_RATINGS.find((c) => c.id === chew)!;
  const surcharge = chewRating.surcharge;
  const unitPrice = kit.price + surcharge + (scentRefill ? SCENT_REFILL_PRICE : 0);
  const total = unitPrice * qty;

  const handleAdd = useCallback(() => {
    addItem({
      kitId,
      kitName: kit.name,
      price: unitPrice,
      pods: kit.pods,
      color,
      chew,
      scentRefill,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }, [addItem, kitId, kit.name, unitPrice, kit.pods, color, chew, scentRefill]);

  return (
    <div className="flex flex-col flex-1">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1 text-xs text-gray-500 py-4">
            <li>
              <Link href="/" className="hover:text-slate-800">Home</Link>
              <span className="mx-1">&rsaquo;</span>
            </li>
            <li className="text-gray-900 font-medium">{kit.name}</li>
          </ol>
        </div>
      </nav>

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <Image
              src="/images/pod-closeup.png"
              alt={kit.name}
              fill
              className="rounded-xl object-cover border"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id)}
                  className={`w-10 h-10 rounded-full border-2 transition ${
                    color === c.id ? "ring-2 ring-slate-800" : "border-gray-200 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">{kit.name}</h1>
            <p className="text-gray-500">{kit.coverage}</p>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold">$${unitPrice}</span>
                {surcharge > 0 && (
                  <span className="text-sm text-gray-500">+ $${surcharge} Tough+</span>
                )}
                {scentRefill && (
                  <span className="text-sm text-gray-500">+ $${SCENT_REFILL_PRICE} scent refill</span>
                )}
              </div>
              <p className="text-sm text-gray-500">{kit.short}</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <div className="flex gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setColor(c.id)}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                          color === c.id
                            ? "bg-slate-800 text-white border-slate-800"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chew rating</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CHEW_RATINGS.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setChew(r.id)}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                          chew === r.id
                            ? "bg-slate-800 text-white border-slate-800"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                        }`}
                      >
                        {r.name} {r.surcharge > 0 ? `(+$${r.surcharge})` : ""}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={scentRefill}
                      onChange={() => setScentRefill(!scentRefill)}
                      className="rounded border-gray-300 text-slate-800 focus:ring-scent"
                    />
                    <span className="text-sm text-gray-700">Add scent refill (+$${SCENT_REFILL_PRICE})</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center gap-2 w-24">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={added}
                  className={`w-full py-4 rounded-xl font-semibold text-white transition shadow-md ${
                    added
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-slate-800 hover:bg-slate-900"
                  }`}
                >
                  {added ? "Added" : `Add to cart (${itemCount} in cart)`}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-y bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-10">What's in the box</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {SPECS.map((s) => (
              <div key={s.label} className="text-center p-4 rounded-lg bg-gray-50 border">
                <div className="w-10 h-10 rounded bg-scent text-white flex items-center justify-center mx-auto mb-3 text-lg">
                  <Package className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">8-hour schedule</h2>
            <p className="text-gray-600">
              ScentTrail pods release scent bursts at set times across an 8-hour cycle, keeping your dog
              engaged and then settling them down for the night.
            </p>
            <div className="space-y-3">
              {SCHEDULE.map((slot) => (
                <div key={slot.time} className="flex items-center gap-4 text-sm">
                  <span className="w-16 text-gray-500 font-mono">{slot.time}</span>
                  <div className="flex-1 flex items-center gap-2 border-b pb-2 last:border-0">
                    <Clock className="w-3 h-3 text-scent shrink-0" />
                    <span className="font-medium">{slot.label}</span>
                    <span className="ml-auto text-xs text-gray-400">{slot.scent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            <div className="space-y-6">
              {REVIEWS.map((r) => (
                <div key={r.id} className="p-4 rounded-xl border bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 fill-yellow-400 ${star <= r.rating ? "fill-current" : "fill-none stroke-yellow-400"}`}
                      />
                    ))}
                    <span className="ml-2 text-xs text-gray-500">{r.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2 italic">"{r.text}"</p>
                  <p className="text-xs font-medium text-gray-900">— {r.name}, {r.dog}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-y bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-10">Frequently asked questions</h2>
          <div className="space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-50 transition"
                >
                  <span className="text-sm font-medium">{f.q}</span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </button>
                <div className="px-4 py-2 border-t text-sm text-gray-600">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-800 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Keep your dog busy for 8 hours.</h2>
          <p className="text-gray-300 mb-8">From $89. Free shipping on orders over $50.</p>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-800 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Shop now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
