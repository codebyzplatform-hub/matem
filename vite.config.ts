
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base: './' - bu app har qanday sub-papka yoki domenda ishlashini ta'minlaydi
  base: './',
  server: {
    port: 3000,
    strictPort: true,
    // HTTPS va CORS muammolarini oldini olish uchun
    host: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Eski brauzerlar va turli muhitlar uchun moslik
    target: 'esnext',
    minify: 'esbuild',
  }
});
