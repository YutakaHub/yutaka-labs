import { GitHubLanguageList } from '@/components/profile/github-language-list'
import { getGitHubLanguageSummary, getGitHubUser } from '@/lib/github'

type GitHubProfileCardProps = {
  username?: string
}

export async function GitHubProfileCard({ username }: GitHubProfileCardProps) {
  const [user, languageSummary] = await Promise.all([
    getGitHubUser(username),
    getGitHubLanguageSummary(username),
  ])

  if (!user) {
    return null
  }

  return (
    <section className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--subtle)] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">GitHub Coding Snapshot</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            @{user.login} の公開リポジトリから、使用言語の比率を表示しています。
          </p>
        </div>

        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-medium text-[var(--foreground)] underline underline-offset-4"
        >
          プロフィールを見る
        </a>
      </div>

      {user.bio ? (
        <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">{user.bio}</p>
      ) : null}

      <div className="mt-5 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
        <p className="text-xs uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
          Language Breakdown
        </p>

        {languageSummary && languageSummary.languages.length > 0 ? (
          <>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              {languageSummary.analyzedRepos} リポジトリ / 合計 {languageSummary.totalBytes.toLocaleString('ja-JP')} bytes を解析
            </p>
            <div className="mt-4">
              <GitHubLanguageList languages={languageSummary.languages} />
            </div>
          </>
        ) : (
          // API 制限や空データ時でも UI を崩さないよう、代替メッセージを表示する
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            言語データを取得できませんでした。時間を置いて再読み込みしてください。
          </p>
        )}
      </div>
    </section>
  )
}
