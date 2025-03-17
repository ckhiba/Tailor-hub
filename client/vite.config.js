import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Force Vite to use this port
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Match your backend port
        changeOrigin: true,
        secure: false
      }
    }
  }
});
