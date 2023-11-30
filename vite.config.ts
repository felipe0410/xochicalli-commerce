import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import path from 'path'

export default defineConfig({
  plugins: [react(), eslint(),
  VitePWA(
    {
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: [
          '**/*.{js,ico,png,svg}',
          'https://firebasestorage.googleapis.com/v0/b/xochicalli-commerce.appspot.com/**',
        ],
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|gif|svg)$/,
            handler: 'CacheFirst',
          },
        ],
      }
    }
  )
  ],
  server: {
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  }
});
