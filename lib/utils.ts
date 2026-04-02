// 日付文字列を読みやすい表示に整形するユーティリティ
export function formatDate(date: string) {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

// 条件に応じてクラス名を連結する最小ユーティリティ
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}
