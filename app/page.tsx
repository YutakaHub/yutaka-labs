import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <Container className="py-20">
      <section className="space-y-6">
        <p className="text-sm font-medium tracking-wide text-zinc-400">Yutaka Labs</p>

        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">
          Minimal portfolio & engineering blog.
        </h1>

        <p className="max-w-2xl text-zinc-400">
          Next.js / TypeScript を軸に、実装メモとポートフォリオをまとめる個人サイトです。
          落ち着いたUIで、読みやすく再利用しやすい知見を蓄積します。
        </p>

        <div className="flex flex-wrap gap-3">
          <Button href="/blog">Blog</Button>
          <Button href="https://github.com/YutakaHub" variant="solid" external>
            GitHub
          </Button>
        </div>
      </section>
    </Container>
  )
}
