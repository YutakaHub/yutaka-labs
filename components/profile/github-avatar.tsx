import Box from '@mui/material/Box'
import Image from 'next/image'
import { getGitHubUser } from '@/lib/github'

type GitHubAvatarProps = {
  size?: number
  className?: string
  withLink?: boolean
  username?: string
}

export async function GitHubAvatar({
  size = 36,
  className,
  withLink = true,
  username,
}: GitHubAvatarProps) {
  const user = await getGitHubUser(username)

  if (!user) {
    // 取得失敗時は GitHub 文字のフォールバックを出す
    return (
      <Box
        component="span"
        className={className}
        sx={(theme) => ({
          ...theme.appLayouts.avatarFrame,
          width: size,
          height: size,
          typography: 'caption',
          fontWeight: 600,
          color: 'text.secondary',
        })}
        aria-label="GitHub icon fallback"
      >
        GH
      </Box>
    )
  }

  const displayName = user.name ?? user.login
  const avatarImage = (
    <Box
      component="span"
      className={className}
      sx={(theme) => ({
        ...theme.appLayouts.avatarFrame,
        width: size,
        height: size,
      })}
    >
      <Image
        src={user.avatar_url}
        alt={`${displayName} の GitHub アイコン`}
        width={size}
        height={size}
        style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Box>
  )

  if (!withLink) {
    return avatarImage
  }

  return (
    <Box
      component="a"
      href={user.html_url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${displayName} の GitHub プロフィールへ移動`}
      title={displayName}
      sx={(theme) => theme.appLayouts.inlineAnchor}
    >
      {avatarImage}
    </Box>
  )
}
