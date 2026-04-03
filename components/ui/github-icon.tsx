import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { GitHubAvatar } from '@/components/profile/github-avatar'
import {
  DEFAULT_GITHUB_USERNAME,
  getGitHubProfileUrl,
  normalizeGitHubUsername,
} from '@/lib/github'

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
    <Box
      component="a"
      href={getGitHubProfileUrl(githubUsername)}
      target="_blank"
      rel="noreferrer"
      aria-label={`${githubUsername} の GitHub プロフィールへ移動`}
      className={className}
      sx={(theme) => ({
        ...theme.appLayouts.interactivePill,
        transition: theme.transitions.create(
          ['transform', 'border-color', 'background-color', 'box-shadow', 'color'],
          { duration: theme.transitions.duration.shorter },
        ),
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: 'text.primary',
          bgcolor: 'background.paper',
          boxShadow: '0 0 0 1px rgba(244,244,245,0.08), 0 10px 30px rgba(0,0,0,0.35)',
          color: 'text.primary',
        },
      })}
    >
      <GitHubAvatar size={avatarSize} withLink={false} username={githubUsername} />
      <Typography component="span" variant="body2" sx={{ color: 'inherit' }}>
        {username}
      </Typography>
    </Box>
  )
}

export default GitHubIcon
