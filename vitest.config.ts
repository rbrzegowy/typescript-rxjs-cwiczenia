import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'html', 'clover'],
      reportsDirectory: './coverage'
    }
  }
})