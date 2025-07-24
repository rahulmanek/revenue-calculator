import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Specifies the naming pattern for JavaScript entry files (your main JS bundle).
        // [name] will be replaced by the entry point's name (e.g., 'index').
        entryFileNames: `assets/rev-calc-v2.js`,

        // Specifies the naming pattern for other generated chunks (e.g., from code splitting).
        chunkFileNames: `assets/rev-calc-v2-chunk.js`,

        // Specifies the naming pattern for static assets like CSS, images, fonts, etc.
        // [name] will be the original name of the asset (e.g., 'index' for your main CSS).
        // [ext] will be the file extension (e.g., 'css').
        assetFileNames: `assets/rev-calc-v2.[ext]`
      }
    }
  }
})
