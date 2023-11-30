import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import path from 'path'

export default defineConfig({
  plugins: [react(), eslint(),
  VitePWA({
    registerType: 'autoUpdate',
    includeAssets: [
      'favicon.ico',
      'robots.txt',
      'apple-touch-icon.png',
      'icons/*.png', // Ajusta este patrón según los nombres y rutas de tus iconos
      'images/**/*', // Incluye el directorio de imágenes
    ],
    manifest: {
      name: 'Tu Nombre de la Aplicación',
      short_name: 'App',
      description: 'Descripción de tu aplicación',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      globPatterns: [
        '**/*.{js,ico,png,svg,html,css}',
        'images/**/*', // Incluye el directorio de imágenes
      ],
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|gif|svg)$/,
          handler: 'CacheFirst',
        },
        {
          urlPattern: /^https:\/\/firebasestorage\.googleapis\.com\/.*$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'firebase-storage',
          },
        },
      ],
    },
  }),
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