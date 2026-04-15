// クライアントとサーバーの境界をまたいで使う型定義だけをここに置く
export type LanguageStat = {
  name: string
  bytes: number
  percent: number
}

export type ContributionMetric = {
  key: 'commits' | 'pull_requests' | 'reviews' | 'issues'
  label: string
  count: number
  percent: number
}

export type ContributionSummary = {
  commits: number
  pullRequests: number
  reviews: number
  issues: number
  total: number
  metrics: ContributionMetric[]
}

export type CodingActivitySummary = {
  commits: number
  additions: number
  deletions: number
  touchedRepos: number
}

export type LanguagesApiResponse = {
  languages: LanguageStat[]
  codingActivity: CodingActivitySummary
  contributionSummary: ContributionSummary
  visibility: 'public_and_private_owner'
}
