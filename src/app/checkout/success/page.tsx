import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl text-green-600 animate-bounce">
        ✓
      </div>
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-gray-900">Order Confirmed!</h1>
      <p className="mt-2 text-sm text-gray-500 max-w-sm">
        Your acquisition went through successfully. Payment processing steps completed smoothly.
      </p>

      <Link
        href="/dashboard"
        className="mt-8 rounded-xl bg-indigo-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-indigo-700 shadow-sm"
      >
        View Order in Dashboard
      </Link>
    </main>
  );
}