import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-10">
      <h1 className="text-4xl mb-8">Route Optimizer</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/core">Core Routing</Link>
        <Link href="/advanced">Advanced</Link>
        <Link href="/smart">Smart</Link>
        <Link href="/ux">UX</Link>
        <Link href="/analytics">Analytics</Link>
      </div>
    </main>
  );
}