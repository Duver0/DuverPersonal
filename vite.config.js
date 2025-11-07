import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const basePath = process.env.VITE_BASE_PATH || './';

export default defineConfig(({ mode }) => ({
  base: mode === 'development' ? '/' : basePath,
  plugins: [react()],
  server: {
    open: true,
  },
}));
