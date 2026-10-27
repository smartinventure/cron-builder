import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Library build: dist/cron-builder.js (ESM) + dist/cron-builder.cjs (CJS)
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'CronBuilder',
      fileName: (format) => (format === 'es' ? 'cron-builder.js' : 'cron-builder.cjs'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react'],
    },
    sourcemap: true,
  },
  test: {
    include: ['test/**/*.test.ts'],
  },
});
