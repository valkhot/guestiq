import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// base must match the GitHub Pages path: https://valkhot.github.io/guestiq/
export default defineConfig({
  base: '/guestiq/',
  // RosaeNLG's browser runtime expects a few build-time globals that Vite
  // doesn't provide by default. Define them so the compiled story renders.
  define: {
    __BUNDLED_DEV__: false,
    __BROWSER__: true,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'GuestIQ',
        short_name: 'GuestIQ',
        description: 'Front-desk projection instrument',
        start_url: '/guestiq/',
        scope: '/guestiq/',
        display: 'standalone',
        background_color: '#16141D',
        theme_color: '#16141D',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      }
    })
  ]
})
