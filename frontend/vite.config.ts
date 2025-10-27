/// <reference types="vitest/globals" />

import path from 'path'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    typecheck: {
      tsconfig: './tsconfig.vitest.json'
    }
  },
})
