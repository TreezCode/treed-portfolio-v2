'use client'

import { createContext, useContext, useState, useSyncExternalStore, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isTransitioning: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_CHANGE_EVENT = 'treez-theme-change'

function getThemeSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function getServerThemeSnapshot(): Theme {
  return 'dark'
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
}

function subscribeToTheme(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handleStoredTheme = () => onStoreChange()
  const handleSystemTheme = (event: MediaQueryListEvent) => {
    if (localStorage.getItem('treez-theme')) return

    applyTheme(event.matches ? 'dark' : 'light')
    onStoreChange()
  }

  window.addEventListener(THEME_CHANGE_EVENT, handleStoredTheme)
  mediaQuery.addEventListener('change', handleSystemTheme)

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleStoredTheme)
    mediaQuery.removeEventListener('change', handleSystemTheme)
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  )
  const [isTransitioning, setIsTransitioning] = useState(false)

  const toggleTheme = () => {
    setIsTransitioning(true)

    const newTheme = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('treez-theme', newTheme)

    applyTheme(newTheme)
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT))

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
