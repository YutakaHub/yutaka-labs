import { GitHubAvatar } from '@/components/profile/github-avatar'
import {
  DEFAULT_GITHUB_USERNAME,
  getGitHubProfileUrl,
  normalizeGitHubUsername,
} from '@/lib/github'
import { cn } from '@/lib/utils'

type GitHubIconProps = {
  className?: string
  username?: string
  avatarSize?: number
}
export function GitHubIcon({
  className,
  username = `@${DEFAULT_GITHUB_USERNAME}`,
  avatarSize = 32,
}: GitHubIconProps) {
  const githubUsername = normalizeGitHubUsername(username)

  return (
    <a
      href={getGitHubProfileUrl(githubUsername)}
      target="_blank"
      rel="noreferrer"
      aria-label={`${githubUsername} の GitHub プロフィールへ移動`}
      className={cn(
        'group inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-950/60 px-2 py-1 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-zinc-900 hover:shadow-[0_0_0_1px_rgba(244,244,245,0.08),0_10px_30px_rgba(0,0,0,0.35)]',
        className,
      )}
    >
      <GitHubAvatar size={avatarSize} withLink={false} username={githubUsername} />
      <span className="text-sm text-zinc-300 transition-colors duration-200 group-hover:text-zinc-100">
        {username}
      </span>
    </a>
  )
}

export default GitHubIcon
