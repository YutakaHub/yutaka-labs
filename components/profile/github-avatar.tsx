import Image from 'next/image'
import { getGitHubUser } from '@/lib/github'

type GitHubAvatarProps = {
  size?: number
  className?: string
  showLabel?: boolean
}

export async function GitHubAvatar({
  size = 36,
  className,
  showLabel = false,
}: GitHubAvatarProps) {
  const user = await getGitHubUser()

  if (!user) {
    // 取得失敗時は GitHub 文字のフォールバックを出す
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs font-semibold text-zinc-300 ${className ?? ''}`}
        aria-label="GitHub icon fallback"
      >
        <span
          className="inline-flex items-center justify-center rounded-full border border-zinc-700 bg-zinc-900"
          style={{ width: size, height: size }}
        >
          GH
        </span>
        {showLabel ? <span>GitHub</span> : null}
      </span>
    )
  }

  const displayName = user.name ?? user.login

  return (
    <a
      href={user.html_url}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-2 py-1 text-xs text-zinc-300 transition hover:border-zinc-700 hover:text-zinc-100 ${className ?? ''}`}
      // アイコンだけだと遷移先が分かりにくいため、ラベル表示を選べるようにする
      aria-label={`${displayName} の GitHub プロフィールへ移動`}
      title={`${displayName} の GitHub`}
    >
      <Image
        src={user.avatar_url}
        alt={`${displayName} の GitHub アイコン`}
        width={size}
        height={size}
        className="rounded-full border border-zinc-700/80 bg-zinc-900 object-cover"
      />
      {showLabel ? <span className="pr-1 text-sm">GitHub</span> : null}
    </a>
  )
}
