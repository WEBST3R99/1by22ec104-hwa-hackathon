import Image from "next/image";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-pods.png')] bg-cover bg-center opacity-60 min-h-[560px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 drop-shadow">
            ScentTrail
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-10 drop-shadow">
            Automated indoor scent-hunt pods that keep your dog busy for 8 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/product" className="px-8 py-4 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-900 transition">
              Shop pods
            </a>
          </div>
        </div>
      </section>

      <ProductCard />

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border text-center">
            <div className="w-12 h-12 rounded bg-scent text-white flex items-center justify-center mx-auto mb-4">
              <span className="text-lg">🕐</span>
            </div>
            <h3 className="font-bold text-lg mb-2">8-Hour Schedule</h3>
            <p className="text-sm text-gray-600">Scent bursts all day, rest at night.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border text-center">
            <div className="w-12 h-12 rounded bg-scent text-white flex items-center justify-center mx-auto mb-4">
              <span className="text-lg">🐶</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Dog-Approved</h3>
            <p className="text-sm text-gray-600">Chew-resistant pods for every pup.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border text-center">
            <div className="w-12 h-12 rounded bg-scent text-white flex items-center justify-center mx-auto mb-4">
              <span className="text-lg">📦</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-600">On orders over $50.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
