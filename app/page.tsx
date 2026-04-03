import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { getGitHubProfileUrl } from '@/lib/github'

export default function HomePage() {
  return (
    <Container className="py-16 sm:py-20">
      <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-10 sm:px-8">
        <p className="text-xs font-semibold tracking-[0.12em] text-[var(--muted-foreground)]">YUTAKA LABS</p>

        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
          ポートフォリオと技術ブログを、静かで実用的なUIで整理する。
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted-foreground)] sm:text-base">
          Next.js / TypeScript を軸に、実装ノウハウや学習ログを蓄積していく個人サイトです。
          境界線と余白を基準に、読みやすさと保守性を重視した設計でまとめています。
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button href="/blog">Blog</Button>
          <Button href={getGitHubProfileUrl()} variant="outline" external>
            GitHub
          </Button>
        </div>
      </section>
    </Container>
  )
}
