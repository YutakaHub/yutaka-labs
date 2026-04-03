import { HeaderNav } from '@/components/layout/header-nav'
import { HeaderTop } from '@/components/layout/header-top'

export function Header() {
  return (
    // 2段構成にして、グローバル操作とセクション移動を分離する
    <header className="border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <HeaderTop />
      <HeaderNav />
    </header>
  )
}
