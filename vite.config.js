import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// base must match the GitHub Pages path: https://valkhot.github.io/guestiq/
export default defineConfig({
  base: '/guestiq/',
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
