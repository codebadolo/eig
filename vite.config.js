import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',

  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': { target: process.env.VITE_PROXY_TARGET || 'http://localhost:3001', changeOrigin: true },
      '/uploads': { target: process.env.VITE_PROXY_TARGET || 'http://localhost:3001', changeOrigin: true },
    },
  },

  build: {
    outDir: 'dist',
    // Divise le bundle en chunks pour un meilleur cache navigateur
    rollupOptions: {
      output: {
        manualChunks: {
          vendor:       ['react', 'react-dom'],
          router:       ['react-router-dom'],
          animations:   ['framer-motion'],
        },
      },
    },
    // Avertissement au-delà de 800kb par chunk
    chunkSizeWarningLimit: 800,
  },
})
