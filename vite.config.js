import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Single-file build: one self-contained index.html (inline JS/CSS, assets as
// data URIs). Maximum compatibility with strict/managed hosting environments —
// no module script, no separate asset requests beyond the document itself.
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  build: {
    target: 'es2018',
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    rollupOptions: {
      output: {
        format: 'iife',
      },
    },
  },
})
