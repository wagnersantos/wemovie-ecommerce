import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), 
    },
  },
  test: {
    globals: true,                          
    environment: 'jsdom',                   
    setupFiles: './src/tests/setupTests.ts',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],   
    },
    include: ['src/**/*.{test,spec}.{ts,tsx}'], 
  },
})
