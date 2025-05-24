// eslint.config.mjs
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import pluginN from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import parserVue from 'vue-eslint-parser'
// Plugins para standard y stylistic se añadirán después si es necesario

// Archivos específicos que tendrán reglas de linting temporalmente desactivadas
// TODO: Refactorizar estos archivos para cumplir con todas las reglas de linting
// y luego eliminar esta lista y el bloque de configuración de anulación.
const legacyFilesWithTemporarilyDisabledRules = [
  'src/components/AddInfoBtn.vue',
  'src/components/AddMcpPluginDialog.vue',
  'src/components/CopyBtn.vue',
  'src/components/GetModelList.vue',
  'src/components/ImportDataDialog.vue',
  'src/components/InstallPluginBtn.vue',
  'src/composables/avatar-image.ts',
  'src/composables/locate-id.ts',
  'src/composables/subscription-notify.ts',
  'src/pages/SetProvider.vue',
  'src/utils/mcp-sse-transport.ts',
  'src/views/DialogView.vue',
  'src/views/SettingsView.vue',
  // Nota: Si 'src/utils/tauri-stream.ts' (versión original) también presenta
  // estos errores de linting, añádelo a esta lista.
]

export default [
  // 0. Global Ignores
  {
    ignores: [
      'dist/',
      'src-capacitor/',
      'src-cordova/',
      'src-tauri/',
      'android/',
      '.quasar/',
      'node_modules/',
      '*.local',
      '.DS_Store',
      'quasar.config.*.temporary.compiled*',
      'legacy_.eslintrc.cjs',
      '.prettierrc.cjs',
      'postcss.config.mjs',
      'uno.config.ts',
      'pnpm-lock.yaml',
    ],
  },

  //1. Configuración Base de ESLint para JavaScript (js.configs.recommended)
  js.configs.recommended,

  //2. Configuración para archivos CommonJS (.cjs)
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: { '@typescript-eslint/no-var-requires': 'off', 'no-undef': 'off' },
  },

  //3. Configuración ESPECÍFICA para archivos .js que SON Módulos ES
  {
    files: [
      'quasar.config.js',
      'scripts/check-env.js',
      'scripts/sync-version.js',
    ],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
        URL: 'readonly',
      },
    },
    rules: {
      'no-undef': 'error',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  //4. Configuración Principal para TypeScript (archivos .ts, .tsx, .d.ts en `src/`)
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.d.ts'],
    plugins: { '@typescript-eslint': tseslint.plugin },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.vue-tsc.json'],
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        __QUASAR_SSR__: 'readonly',
        chrome: 'readonly',
      },
    },
    rules: {
      ...(tseslint.configs.recommendedTypeChecked.rules || {}),
      ...(tseslint.configs.eslintRecommended.rules || {}),
      ...(tseslint.configs.recommended.rules || {}),
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  },

  //5. Configuración para Vue.js (Archivos .vue en `src`)
  {
    files: ['src/**/*.vue'],
    plugins: { vue: pluginVue, '@typescript-eslint': tseslint.plugin },
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: tseslint.parser,
        project: ['./tsconfig.json', './tsconfig.vue-tsc.json'],
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        __QUASAR_SSR__: 'readonly',
        chrome: 'readonly',
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },
    },
    rules: {
      ...(pluginVue.configs['flat/base'].rules || {}),
      ...(pluginVue.configs['flat/essential'].rules || {}),
      'vue/multi-word-component-names': 'warn',
      'vue/no-parsing-error': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  //6. Configuración para archivos JavaScript en `src/components/global`
  {
    files: ['src/components/global/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        __QUASAR_SSR_SERVER__: 'readonly',
        FileList: 'readonly',
        requestAnimationFrame: 'readonly',
      },
    },
    rules: {
      'no-undef': 'error',
      'no-prototype-builtins': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  //7. Configuración para Archivos de Documentación (docs/)
  {
    files: ['docs/**/*.ts', 'docs/**/*.js', 'docs/**/*.mjs'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { sourceType: 'module' },
      globals: { ...globals.node, ...globals.browser, location: 'readonly' },
    },
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      ...(tseslint.configs.recommended.rules || {}),
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'no-undef': 'warn',
    },
  },

  // 8. Configuración para eslint-plugin-n (Reglas específicas para Node.js)
  {
    files: [
      'eslint.config.mjs',
      'postcss.config.mjs',
      'quasar.config.js',
      'uno.config.ts',
      'scripts/**/*.js',
      'docs/.vitepress/config.{js,ts,mjs}',
      'docs/.vitepress/theme/index.ts',
    ],
    ...pluginN.configs['flat/recommended-module'],
    rules: {
      ...(pluginN.configs['flat/recommended-module'].rules || {}),
      'n/no-unpublished-import': [
        'error',
        {
          allowModules: [
            'globals',
            '@eslint/js',
            'typescript-eslint',
            'eslint-plugin-vue',
            'vue-eslint-parser',
            'eslint-config-prettier',
            'eslint-plugin-import',
            'eslint-plugin-n',
            '@unocss/preset-rem-to-px',
            'unocss',
            'autoprefixer',
            'vitepress',
          ],
        },
      ],
      'n/no-extraneous-import': [
        'error',
        {
          allowModules: ['@eslint/js'],
        },
      ],
    },
  },

  // 9. Configuración para eslint-plugin-promise
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    ...pluginPromise.configs['flat/recommended'],
  },

  // 10. Configuración para eslint-plugin-import
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    plugins: {
      import: pluginImport,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: true,
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
      },
    },
    rules: {
      ...(pluginImport.configs.recommended.rules || {}),
      ...(pluginImport.configs.typescript.rules || {}),
      'import/no-named-as-default-member': 'off',
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: '@/**', group: 'internal', position: 'before' },
            { pattern: 'src/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  // TODO: Inicio Bloque de Excepciones Provisionales para Legacy Code
  // Este bloque desactiva temporalmente reglas específicas para un conjunto de archivos
  // que aún no han sido refactorizados para cumplir con las nuevas normas de linting.
  {
    files: legacyFilesWithTemporarilyDisabledRules,
    rules: {
      'import/order': 'off',
      'promise/catch-or-return': 'off',
      'promise/always-return': 'off',
      'promise/no-nesting': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  // TODO: Fin Bloque de Excepciones Provisionales

  //11. Prettier (Debe ir al final)
  eslintConfigPrettier,
]
