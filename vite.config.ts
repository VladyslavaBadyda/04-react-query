import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Заміна некоректного пакета на правильний
import babel from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: 'node_modules/**',
    }),
  ],
});
