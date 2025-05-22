// eslint.config.mjs <--- CAMBIO DE NOMBRE DE ARCHIVO SUGERIDO
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'
import eslintConfigPrettier from 'eslint-config-prettier'
// Plugins para standard y stylistic se añadirán después

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

  // 1. Configuración Base de ESLint para JavaScript (js.configs.recommended)
  // Este se aplica a .js y .mjs. Si package.json es type:module, asume sourceType:module.
  js.configs.recommended,

  // 2. Configuración para archivos CommonJS (.cjs)
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: { '@typescript-eslint/no-var-requires': 'off', 'no-undef': 'off' },
  },

  // 3. Configuración ESPECÍFICA para archivos .js que SON Módulos ES
  // Esto incluye quasar.config.js y tus scripts si usan import/export.
  // Debe venir DESPUÉS de js.configs.recommended para asegurar que sourceType: 'module' se aplica.
  {
    files: [
      'quasar.config.js', // Asumiendo que usa import/export
      'scripts/check-env.js', // Específicamente para este
      'scripts/sync-version.js', // Específicamente para este
      // Añade otros archivos .js que sean ESM y no estén cubiertos adecuadamente
    ],
    languageOptions: {
      sourceType: 'module', // ¡CRUCIAL!
      ecmaVersion: 'latest', // O la que usen estos archivos
      globals: {
        ...globals.node, // Para `process`, `console`, etc.
        URL: 'readonly', // Para `new URL()` en quasar.config.js
      },
    },
    rules: {
      'no-undef': 'error', // Para detectar variables no definidas
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // Si estos archivos JS son lintados por reglas de TS por error, desactivarlas aquí:
      '@typescript-eslint/no-var-requires': 'off', // No aplica a ESM
      // ... otras reglas TS a desactivar para JS si es necesario ...
    },
  },
  // NOTA: eslint.config.mjs (si renombras) será tratado como ESM por defecto por Node.js.
  // El bloque js.configs.recommended ya debería cubrirlo adecuadamente si no necesitas
  // nada específico más allá de los globals de Node (que se pueden añadir en un bloque global).

  // 4. Configuración Principal para TypeScript (archivos .ts, .tsx, .d.ts en `src/`)
  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.d.ts'],
    plugins: { '@typescript-eslint': tseslint.plugin },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.vue-tsc.json'],
        tsconfigRootDir: import.meta.dirname, // Correcto si eslint.config.mjs está en root
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        __QUASAR_SSR__: 'readonly',
        /* ...otros Quasar/Tauri ... */ chrome: 'readonly',
      },
    },
    rules: {
      ...(tseslint.configs.recommendedTypeChecked.rules || {}),
      ...(tseslint.configs.eslintRecommended.rules || {}),
      ...(tseslint.configs.recommended.rules || {}),
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
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

  // 5. Configuración para Vue.js (Archivos .vue en `src`)
  {
    files: ['src/**/*.vue'],
    plugins: { vue: pluginVue, '@typescript-eslint': tseslint.plugin },
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: tseslint.parser,
        project: ['./tsconfig.json', './tsconfig.vue-tsc.json'],
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        __QUASAR_SSR__: 'readonly',
        /* ...otros Quasar/Tauri ... */ chrome: 'readonly',
        // Para macros de Vue 3 (aunque eslint-plugin-vue v10 debería manejarlos)
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
      },
    },
    rules: {
      ...(pluginVue.configs['flat/base'].rules || {}),
      ...(pluginVue.configs['flat/essential'].rules || {}), // Para Vue 3
      // ...(pluginVue.configs['flat/recommended'].rules || {}), // Alternativa más estricta

      'vue/multi-word-component-names': 'warn',
      'vue/no-parsing-error': 'error', // Para asegurar que vue-eslint-parser funciona

      // Reglas de TypeScript para <script lang="ts">.
      'no-unused-vars': 'off', // ¡Añadir esta línea!
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      // Otras reglas específicas de Vue o sobreescrituras de TS para Vue
    },
  },
  // 6. Configuración para archivos JavaScript en `src/components/global` (ej. AInput.js)
  {
    files: ['src/components/global/**/*.js'],
    languageOptions: {
      sourceType: 'module', // Asumir ESM si están en src/
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
      '@typescript-eslint/no-explicit-any':
        'off' /* ...otras reglas TS off para JS ... */,
    },
  },

  // 7. Configuración para Archivos de Documentación (docs/)
  {
    files: ['docs/**/*.ts', 'docs/**/*.js', 'docs/**/*.mjs'],
    languageOptions: {
      parser: tseslint.parser, // Para .ts
      parserOptions: { sourceType: 'module' }, // No `project: true`
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

  // Prettier (Debe ir al final)
  eslintConfigPrettier,
]
