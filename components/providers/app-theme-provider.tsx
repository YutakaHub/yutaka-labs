'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const THEME_STORAGE_KEY = 'yutaka-theme'

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'system'
  }

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
  return savedTheme ?? 'system'
}

function resolveTheme(theme: Theme): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return theme === 'system' ? getSystemTheme() : theme
}

function applyTheme(nextTheme: Theme) {
  const root = document.documentElement
  const resolved = resolveTheme(nextTheme)

  root.classList.toggle('dark', resolved === 'dark')
}

type AppThemeProviderProps = {
  children: ReactNode
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme())
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(getInitialTheme()))

  useEffect(() => {
    // 初回表示時にDOMへクラスを反映し、システムテーマの変更を購読する
    applyTheme(theme)

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const nextResolved = resolveTheme(theme)
      setResolvedTheme(nextResolved)
      applyTheme(theme)
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [theme])

  const setTheme = (nextTheme: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    setThemeState(nextTheme)
    setResolvedTheme(resolveTheme(nextTheme))
    applyTheme(nextTheme)
  }

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useAppTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useAppTheme must be used within AppThemeProvider')
  }

  return context
}
