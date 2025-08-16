import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 1) Add server config with a proxy
  server: {
    // Vite will run on 5173 by default;
    // if you want a different port, specify `port: 5174` or similar
    proxy: {
      // Any request starting with `/api` will be proxied
      // to your Express server running on port 3000
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // If you need to remove the /api prefix for your server route:
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/.netlify/functions': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // 2) Keep your existing build config
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
          supabase: ['@supabase/supabase-js']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js']
  }
});