import { Container } from '@/components/layout/container'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] py-5">
      <Container>
        <p className="text-xs text-[var(--muted-foreground)]">© {new Date().getFullYear()} Yutaka Labs</p>
      </Container>
    </footer>
  )
}
