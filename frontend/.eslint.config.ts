import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import oxlint from 'eslint-plugin-oxlint'
import stylistic from '@stylistic/eslint-plugin'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

const stylisticConfig = stylistic.configs.customize({
    flat: true,
    pluginName: 'recommended',
    indent: 4,
    jsx: false,
    semi: false,
    commaDangle: 'never',
    braceStyle: '1tbs'
})

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}']
    },

    {
        name: 'app/files-to-ignore',
        ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '.history/**']
    },
    pluginVue.configs['flat/strongly-recommended'],
    vueTsConfigs.recommended,
    stylisticConfig,
    oxlint.configs['flat/recommended'],
    {
        rules: {
            'vue/html-indent': ['error', 4],
            'vue/html-self-closing': ['error', {
                html: {
                    void: 'always',
                    normal: 'never'
                }
            }],
            '@typescript-eslint/no-explicit-any': 'warn'
        }
    }
)
