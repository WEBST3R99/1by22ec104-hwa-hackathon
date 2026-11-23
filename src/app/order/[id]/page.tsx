import Link from "next/link";

export default function OrderPage({ params }: { params: { id: string } }) {
  // In a real app this would fetch the order from a database.
  // For this demo we show a confirmation page for any order id.
  return (
    <div className="flex flex-col flex-1 py-20 px-4">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Order confirmed</h1>
        <p className="text-gray-600 mb-6">
          Thank you! Your ScentTrail order <span className="font-mono text-slate-800">#{params.id}</span> has been placed.
        </p>
        <p className="text-gray-500 text-sm mb-10">A confirmation email has been sent. Your pods will ship within 1 business day.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2 bg-slate-800 text-white rounded font-medium hover:bg-slate-900 transition"
        >
          Back to shop
        </Link>
      </div>
    </div>
  );
}
