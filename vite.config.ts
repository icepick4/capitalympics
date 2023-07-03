import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), compression()],
    server: {
        port: 3000
    },
    define: {
        __VUE_I18N_LEGACY_API__: false,
        __VUE_I18N_FULL_INSTALL__: false,
        __INTLIFY_PROD_DEVTOOLS__: false
    },
    build: {
        outDir: '/var/www/html/dist/capitalympics'
    }
});
