"use client";

import { KITS } from "@/lib/products";
import Link from "next/link";

export default function ProductCard() {
  return (
    <section className="py-20 bg-gray-50 border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Choose your kit</h2>
          <p className="mt-2 text-gray-500">Automated scent-hunt pods that keep dogs busy for 8 hours.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {KITS.map((kit) => (
            <div
              key={kit.id}
              className="bg-white rounded-xl border p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-bold">{kit.name}</h3>
                <span className="text-lg font-bold">$${kit.price}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{kit.coverage}</p>
              <p className="text-gray-600 mb-6">{kit.short}</p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                {kit.desc.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-scent flex-shrink-0">●</span>
                    {d}
                  </li>
                ))}
              </ul>
              <Link
                href="/product"
                className="w-full py-3 bg-slate-800 text-center text-white rounded font-medium hover:bg-slate-900 transition"
              >
                Configure &amp; Buy
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
