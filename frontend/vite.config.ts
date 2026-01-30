import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const customElements: string[] = [
    'iconify-icon'
]

export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: tag => customElements.includes(tag)
                }
            }
        }),
        vueDevTools()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-vue': ['vue', 'vue-router'],
                    'vendor-prime': ['primevue'],
                    'vendor-forms': ['@vuelidate/core', '@vuelidate/validators'],
                    'vendor-utils': ['axios', 'dompurify']
                }
            }
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://backend:3001',
                changeOrigin: true
            }
        }
    }
})
