import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{ts,tsx}'],
    setupFiles: ['tests/setup.ts'],
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'React Interactive Input',
      formats: ['es', 'cjs'],
      fileName: format => `react-interactive-input.${format}.js`,
    },
    rollupOptions: {
      // Externalize React (including jsx-runtime). Matching only 'react'
      // still bundles react/jsx-runtime from the build-time React 19
      // install, which crashes React 18 hosts (recentlyCreatedOwnerStacks).
      external: id =>
        id === 'react' ||
        id === 'react-dom' ||
        id.startsWith('react/') ||
        id.startsWith('react-dom/'),
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
