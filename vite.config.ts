import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
    plugins: [
        react(),
        AutoImport({
            resolvers: [
                IconsResolver({
                    prefix: 'Icon',
                    extension: 'jsx',
                }),
            ],
            dts: './src/types/icons.d.ts',
        }),
        Icons({
            compiler: 'jsx',
            jsx: 'react',
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '^/api': {
                target: 'http://127.0.0.1:8081',
                changeOrigin: true,
            },
        },
    },
    build: {
        chunkSizeWarningLimit: 2048,
    },
})
