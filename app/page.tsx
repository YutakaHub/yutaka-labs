import Link from 'next/link'
export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-24">
        <p className="text-sm tracking-[0.2em] text-zinc-400 uppercase">
          Yutaka Labs
        </p>

        <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
          Yutaka Nishiwaki
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-zinc-300">
          フロントエンド開発、UI設計、React / Next.js を中心に開発しています。
          個人の開発・実験・記録のためのサイトです。
        </p>

        <div className="flex gap-4">
          <Link
            href="/blog"
            className="rounded-full border border-zinc-700 px-5 py-3 text-sm hover:bg-zinc-900"
          >
            Blog
          </Link>
          <a
            href="https://github.com/YutakaHub"
            className="rounded-full bg-white px-5 py-3 text-sm text-black"
          >
            GitHub
          </a>
        </div>
      </section>
    </main>
  )
}