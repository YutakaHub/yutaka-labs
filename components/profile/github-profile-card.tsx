import { GitHubMetricCounter } from '@/components/profile/github-metric-counter'
import { getGitHubUser } from '@/lib/github'

type GitHubProfileCardProps = {
  username?: string
}

export async function GitHubProfileCard({ username }: GitHubProfileCardProps) {
  const user = await getGitHubUser(username)

  if (!user) {
    return null
  }

  const metrics = [
    { label: 'Followers', value: user.followers },
    { label: 'Following', value: user.following },
    { label: 'Public Repos', value: user.public_repos },
  ]

  return (
    <section className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--subtle)] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">GitHub Profile Snapshot</h2>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">
            @{user.login} の最新公開データを GitHub API から表示しています。
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

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
          >
            <p className="text-xs uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-[var(--foreground)] motion-safe:animate-pulse">
              <GitHubMetricCounter value={metric.value} />
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
