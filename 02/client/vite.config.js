import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        // E2E 時可經 BACKEND_PORT 指向獨立後端（預設 3000）
        target: `http://localhost:${process.env.BACKEND_PORT || 3000}`,
        changeOrigin: true,
      },
    },
  },
});