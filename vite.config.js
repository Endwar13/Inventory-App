import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
 
  server: {
    port:3001,
    watch: {
      usePolling: true,
      // 👇Tambahkan 2 baris ini:
      interval: 1000, 
      binaryModificationDelay: 500, 
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
    // PENTING: hmr harus berada di dalam objek server
    hmr: {
      overlay: false, // Fix: The 'overlay' property expects a boolean, not an object.
    },
  },  };
});
