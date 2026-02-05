
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'kanban-vendor': ['@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities'],
          'charts-vendor': ['recharts'],
          'ui-vendor': ['lucide-react', 'react-window']
        }
      }
    },
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: ['recharts', 'lucide-react', '@google/genai']
  }
});
