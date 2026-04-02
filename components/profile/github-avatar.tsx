import Image from 'next/image'
import { getGitHubUser } from '@/lib/github'

type GitHubAvatarProps = {
  size?: number
  className?: string
}

export async function GitHubAvatar({ size = 36, className }: GitHubAvatarProps) {
  const user = await getGitHubUser()

  if (!user) {
    // 取得失敗時は GitHub 文字のフォールバックを出す
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-xs font-semibold text-zinc-300 ${className ?? ''}`}
        style={{ width: size, height: size }}
        aria-label="GitHub icon fallback"
      >
        GH
      </span>
    )
  }

  const displayName = user.name ?? user.login

  return (
    <a
      href={user.html_url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center"
      aria-label={`${displayName} の GitHub プロフィールへ移動`}
      title={displayName}
    >
      <Image
        src={user.avatar_url}
        alt={`${displayName} の GitHub アイコン`}
        width={size}
        height={size}
        className={`rounded-full border border-zinc-700/80 bg-zinc-900 object-cover ${className ?? ''}`}
      />
    </a>
  )
}
