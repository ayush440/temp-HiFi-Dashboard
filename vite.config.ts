import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    assetsInlineLimit: 0,
  },
  plugins: [
    vue(),
  ],
  server: {
    host: 'localhost', // Listen on all network interfaces
    port: 5500, // Choose any available port
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
