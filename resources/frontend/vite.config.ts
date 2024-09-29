import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig(env => ({
    base: env.mode === 'production' ? '/static' : '',
    plugins: [
        solid(),
        AutoImport({
            resolvers: [
                IconsResolver({
                    prefix: 'Icon',
                    extension: 'jsx',
                    customCollections: ['local'],
                }),
            ],
            dts: 'src/types/icons.d.ts',
        }),
        Icons({
            compiler: 'solid',
            customCollections: {
                local: FileSystemIconLoader(
                    `${fileURLToPath(new URL('./src', import.meta.url))}/assets/icons/svg`,
                    svg => svg.replace(/^<svg\s/, '<svg width="1em" height="1em" '),
                ),
            },
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: '../../public/static',
        emptyOutDir: true,
    },
}))
