import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

const hash = Math.floor(Math.random() * 90000) + 10000;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        compression(),
        VitePWA({
            manifest: {
                name: 'Capitalympics',
                short_name: 'Capitalympics',
                description:
                    'Learn the capitals and flags of the world in a fun way!',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ],
                start_url: '/',
                display: 'standalone',
                background_color: '#000000',
                theme_color: '#000000',
                lang: 'en',
                orientation: 'portrait-primary'
            },
            registerType: 'prompt',
            includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png']
        })
    ],

    server: {
        port: 3000
    },
    define: {
        __VUE_I18N_LEGACY_API__: false,
        __VUE_I18N_FULL_INSTALL__: false,
        __INTLIFY_PROD_DEVTOOLS__: false
    },
    build: {
        outDir: './dist',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id
                            .toString()
                            .split('node_modules/')[1]
                            .split('/')[0]
                            .toString();
                    }
                },
                entryFileNames: `[name]` + hash + `.js`,
                chunkFileNames: `[name]` + hash + `.js`,
                assetFileNames: `[name]` + hash + `.[ext]`
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    optimizeDeps: {
        noDiscovery: true
    }
});
