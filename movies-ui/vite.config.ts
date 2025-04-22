// eslint-disable-next-line import/no-unresolved
import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import {visualizer} from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), visualizer()] as any,
    test: {
        environment: 'jsdom',
        setupFiles: path.resolve(__dirname, './vitest.setup.js')
    },
    server: {
        host: true,
        port: 3000,
        watch: {
            usePolling: true
        }
    },
    css: {
        devSourcemap: true
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
