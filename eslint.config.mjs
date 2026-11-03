import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    '.netlify/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Preserved historical source and exact vendored dependencies, outside the application build.
    'public/archive/first-portfolio/**',
  ]),
])

export default eslintConfig
