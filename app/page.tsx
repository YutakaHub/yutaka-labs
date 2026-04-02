import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'

export default function HomePage() {
  return (
    <Container className="py-24">
      <section className="space-y-8">
        <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">Yutaka Labs</p>

        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-zinc-100 sm:text-6xl">
          ポートフォリオと技術ブログをまとめた、
          <br />
          個人の開発拠点。
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-zinc-300">
          Yutaka Labs は、React / Next.js を中心にした開発記録やUI実験をまとめるサイトです。
          小さな検証を積み重ねて、再利用できる知見として残していきます。
        </p>

        <div className="flex flex-wrap gap-3">
          <Button href="/blog">ブログを見る</Button>
          <Button href="https://github.com/YutakaHub" variant="solid" external>
            GitHub
          </Button>
        </div>
      </section>
    </Container>
  )
}
