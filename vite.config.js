import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png:  { quality: 60 },
      jpeg: { quality: 60 },
      jpg:  { quality: 60 },
    }),
  ],
})
