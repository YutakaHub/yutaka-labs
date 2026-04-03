import Link from 'next/link'

type BackButtonProps = {
  href?: string
  label?: string
}

export function BackButton({ href = '/blog', label = 'Back to Blog' }: BackButtonProps) {
  return (
    // GitHub風に、境界線と控えめなhoverだけで戻る導線を表現する
    <Link
      href={href}
      className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs font-medium text-[var(--muted-foreground)] transition-colors hover:bg-[var(--subtle)] hover:text-[var(--foreground)]"
      aria-label="ブログ一覧に戻る"
    >
      <span aria-hidden>←</span>
      <span>{label}</span>
    </Link>
  )
}
