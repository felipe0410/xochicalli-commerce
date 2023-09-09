import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import path from 'path'

export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  }
});
