export function LanguageExplanationPanel() {
  return (
    <section className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
      {/* 一覧に表示している数値の意味を先に説明し、初見でも読み取りやすくする */}
      <h2 className="text-sm font-semibold text-[var(--foreground)]">この一覧で分かること（リポジトリ単位の言語内訳）</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--muted-foreground)]">
        <li>name: 使用言語の名前です（例: TypeScript）。</li>
        <li>bytes: 対象リポジトリ群でその言語が占める合計コード量（バイト数）です。</li>
        <li>percent: 全リポジトリの全言語合計に対する、その言語の割合です。</li>
      </ul>
    </section>
  )
}
