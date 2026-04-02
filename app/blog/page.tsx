import Link from 'next/link'

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="mb-10 text-4xl font-semibold">Blog</h1>

        <Link href="/blog/first-post">
          <div className="rounded-2xl border border-zinc-800 p-6 hover:bg-zinc-900">
            <p className="text-sm text-zinc-400">2026-04-02</p>
            <h2 className="text-2xl">Yutaka Labs を作った</h2>
          </div>
        </Link>
      </div>
    </main>
  )
}