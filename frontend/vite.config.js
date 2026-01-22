import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true
    },
    hmr: {
      host: 'localhost',
      protocol: 'ws',
      port: 5173
    },
    proxy: {
      '/api': {
        target: 'http://nginx:8000',
        changeOrigin: true,
        secure: false
      },
      '/sanctum': {
        target: 'http://nginx:8000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
