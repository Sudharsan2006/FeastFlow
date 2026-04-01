import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/menu': 'http://localhost:9090',
      '/cart': 'http://localhost:9090',
      '/order': 'http://localhost:9090',
    }
  }
})
