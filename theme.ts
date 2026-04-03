import { createTheme } from '@mui/material/styles'
import type { CSSObject } from '@mui/material/styles'

type SectionSpacing = {
  xs: number
  md: number
}

type AppLayouts = {
  pageSectionY: SectionSpacing
  heroSectionY: SectionSpacing
  articleMaxWidth: number
  metaRow: CSSObject
  tagRow: CSSObject
  interactivePill: CSSObject
  avatarFrame: CSSObject
  inlineAnchor: CSSObject
}

declare module '@mui/material/styles' {
  interface Theme {
    appLayouts: AppLayouts
  }

  interface ThemeOptions {
    appLayouts?: Partial<AppLayouts>
  }
}

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: '#60a5fa',
      light: '#93c5fd',
      dark: '#2563eb',
    },
    background: {
      default: '#09090b',
      paper: '#18181b',
    },
    divider: '#27272a',
    text: {
      primary: '#f4f4f5',
      secondary: '#a1a1aa',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
    h1: {
      fontWeight: 600,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'var(--mui-palette-background-paper)',
          borderColor: 'var(--mui-palette-divider)',
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: 10,
          paddingInline: 16,
          paddingBlock: 8,
          ...(ownerState.variant === 'outlined' && {
            '&:hover': {
              borderColor: theme.palette.text.secondary,
              backgroundColor: theme.palette.action.hover,
            },
          }),
        }),
        outlined: {
          borderColor: 'var(--mui-palette-divider)',
          color: 'var(--mui-palette-text-primary)',
        },
        contained: {
          color: '#eff6ff',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: 'transparent',
          borderColor: 'var(--mui-palette-divider)',
          color: 'var(--mui-palette-text-secondary)',
          height: 'auto',
        },
        label: {
          paddingInline: 8,
          paddingBlock: 2,
          fontSize: 12,
          fontWeight: 500,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
  },
  appLayouts: {
    pageSectionY: { xs: 8, md: 10 },
    heroSectionY: { xs: 10, md: 14 },
    articleMaxWidth: 760,
    metaRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap',
      color: 'text.secondary',
      typography: 'caption',
    },
    tagRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
    },
    interactivePill: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      paddingInline: 8,
      paddingBlock: 6,
      borderRadius: 999,
      border: '1px solid',
      borderColor: 'divider',
      backgroundColor: 'rgba(9, 9, 11, 0.6)',
      color: 'text.secondary',
      textDecoration: 'none',
      lineHeight: 1,
    },
    avatarFrame: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      overflow: 'hidden',
      lineHeight: 0,
      borderRadius: '50%',
      border: '1px solid',
      borderColor: 'divider',
      backgroundColor: 'background.paper',
    },
    inlineAnchor: {
      display: 'inline-flex',
      alignItems: 'center',
      lineHeight: 0,
    },
  },
})

export default theme
