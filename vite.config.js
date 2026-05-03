import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Base URL for GitHub Pages deployment
  // Matches repository name: valkhot.github.io/guestiq
  base: '/guestiq/',

  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'GuestIQ',
        short_name: 'GuestIQ',
        description: 'Hotel Guest Expectations Research',
        theme_color: '#0D0D12',
        background_color: '#0D0D12',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
        ],
      },
    }),
  ],

  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
