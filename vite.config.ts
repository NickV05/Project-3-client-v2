import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist', 
    watch: {
      include: 'src/**',
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});