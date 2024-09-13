import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-online-cpp-compiler.onrender.com',
        changeOrigin: true,
      },
    },
  },
});


// https://backend-online-cpp-compiler.onrender.com/