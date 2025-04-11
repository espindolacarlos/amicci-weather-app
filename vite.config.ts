import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  test: {
    ...configDefaults,
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
  }
})
