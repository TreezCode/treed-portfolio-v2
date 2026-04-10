/**
 * Build With Treez - Theme Configuration
 * Defines color palettes for light and dark modes
 */

export const themes = {
  dark: {
    // Brand colors (consistent across themes)
    'treez-purple': '#915eff',
    'treez-cyan': '#00d4ff',
    'treez-pink': '#ff6b9d',
    
    // Background colors
    'bg-primary': '#0a0a0a',
    'bg-secondary': '#1a1a2e',
    'bg-tertiary': '#2a2a3e',
    
    // Text colors
    'text-primary': '#f8f8f8',
    'text-secondary': '#b0b0b0',
    'text-tertiary': '#808080',
    
    // Border colors
    'border-primary': 'rgba(255, 255, 255, 0.1)',
    'border-secondary': 'rgba(255, 255, 255, 0.05)',
    'border-accent': 'rgba(145, 94, 255, 0.3)',
    
    // Surface colors (cards, inputs)
    'surface-primary': 'rgba(255, 255, 255, 0.05)',
    'surface-secondary': 'rgba(255, 255, 255, 0.03)',
    'surface-hover': 'rgba(255, 255, 255, 0.1)',
    
    // Sacred geometry colors
    'geometry-primary': 'rgba(145, 94, 255, 0.05)',
    'geometry-secondary': 'rgba(0, 212, 255, 0.05)',
  },
  
  light: {
    // Brand colors (consistent across themes)
    'treez-purple': '#915eff',
    'treez-cyan': '#00d4ff',
    'treez-pink': '#ff6b9d',
    
    // Background colors
    'bg-primary': '#ffffff',
    'bg-secondary': '#f8f8f8',
    'bg-tertiary': '#f0f0f0',
    
    // Text colors
    'text-primary': '#1a1a2e',
    'text-secondary': '#4a4a5e',
    'text-tertiary': '#6b7280',
    
    // Border colors
    'border-primary': 'rgba(0, 0, 0, 0.1)',
    'border-secondary': 'rgba(0, 0, 0, 0.05)',
    'border-accent': 'rgba(145, 94, 255, 0.3)',
    
    // Surface colors (cards, inputs)
    'surface-primary': 'rgba(145, 94, 255, 0.05)',
    'surface-secondary': 'rgba(145, 94, 255, 0.03)',
    'surface-hover': 'rgba(145, 94, 255, 0.1)',
    
    // Sacred geometry colors
    'geometry-primary': 'rgba(145, 94, 255, 0.08)',
    'geometry-secondary': 'rgba(0, 212, 255, 0.08)',
  },
}

export type ThemeColors = typeof themes.dark

/**
 * Apply theme colors to CSS variables
 */
export function applyTheme(theme: 'light' | 'dark') {
  const colors = themes[theme]
  const root = document.documentElement

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value)
  })
}

/**
 * Get color value for current theme
 */
export function getThemeColor(color: keyof ThemeColors, theme: 'light' | 'dark'): string {
  return themes[theme][color]
}
