import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  assetsInclude: ['**/*.{md,html}'],
  build: {
    rollupOptions: {
      input: {
        'unified-v11': resolve(__dirname, 'unified-v11.js'),
        'unified-v10': resolve(__dirname, 'unified-v10.js'),
        'markdown-it-v14': resolve(__dirname, 'markdown-it-v14.js'),
      },
      output: {
        entryFileNames: '[name].js',
      }
    }
  }
});