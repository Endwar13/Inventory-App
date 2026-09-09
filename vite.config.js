import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: 'all',
      watch: {
        usePolling: true,
        interval: 1000, 
        binaryModificationDelay: 500, 
        ignored: ['**/node_modules/**', '**/dist/**'],
      },
      hmr: {
        overlay: false,
      },
    },
  };
});
