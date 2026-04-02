import { Container } from '@/components/layout/container'

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-6">
      <Container>
        <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Yutaka Labs</p>
      </Container>
    </footer>
  )
}
