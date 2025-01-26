import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [react(), tsconfigPaths(), svgr({ include: '**/*.svg' })],

  server: {
    port: 3000,
    open: true,
  },

  base: '/',
  build: {
    outDir: 'build',
  },
});

// eslint-disable-next-line import/no-default-export
export default config;
