// eslint.config.mjs <--- CAMBIO DE NOMBRE DE ARCHIVO SUGERIDO
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import pluginImport from 'eslint-plugin-import'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import parserVue from 'vue-eslint-parser'
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

  // Configuración Base de ESLint para JavaScript (js.configs.recommended)
  // Este se aplica a .js y .mjs. Si package.json es type:module, asume sourceType:module.
  js.configs.recommended,

  // Configuración para archivos CommonJS (.cjs)
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    rules: { '@typescript-eslint/no-var-requires': 'off', 'no-undef': 'off' },
  },

  // Configuración ESPECÍFICA para archivos .js que SON Módulos ES
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

  // Configuración Principal para TypeScript (archivos .ts, .tsx, .d.ts en `src/`)
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

  // Configuración para Vue.js (Archivos .vue en `src`)
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
  // Configuración para archivos JavaScript en `src/components/global` (ej. AInput.js)
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

  // Configuración para Archivos de Documentación (docs/)
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

  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'], // Aplicar a todos los archivos de script y Vue
    plugins: {
      import: pluginImport,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true, // Para que el resolver intente encontrar archivos .d.ts
          // Opcionalmente, si tienes problemas con alias o monorepos, puedes especificar project:
          // project: ['./tsconfig.json', './tsconfig.vue-tsc.json'],
        },
        node: true, // Para resolver módulos built-in de Node.js
      },
      // Informa a eslint-plugin-import que use @typescript-eslint/parser para archivos TS
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.mts', '.cts'],
      },
    },
    rules: {
      // Reglas recomendadas por eslint-plugin-import
      ...(pluginImport.configs.recommended.rules || {}),
      // Reglas específicas de TypeScript para eslint-plugin-import
      // (esto desactiva 'import/named' ya que TypeScript lo maneja mejor, entre otras cosas)
      ...(pluginImport.configs.typescript.rules || {}),

      'import/no-named-as-default-member': 'off',

      // Regla de ordenación de importaciones (altamente recomendada y personalizable)
      'import/order': [
        'warn', // Cambia a 'error' una vez que estés cómodo con la configuración
        {
          groups: [
            'builtin', // Módulos de Node.js (fs, path, etc.)
            'external', // Paquetes de npm
            'internal', // Alias internos (ej. @/ o src/)
            ['parent', 'sibling'], // Rutas relativas ../ y ./
            'index', // Archivos index (./index, ./index.ts)
            'object', // Importaciones de tipo `import { foo } from './object-style';`
            'type', // Importaciones de tipo `import type { Foo } from 'foo';`
          ],
          pathGroups: [
            // Configura aquí tus alias principales si los tienes (ej. @/)
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before', // O 'after' si prefieres los alias después de otros 'internal'
            },
            {
              pattern: 'src/**', // Si usas 'src/' como otro alias o ruta base
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'], // No aplicar pathGroups a builtins o externals
          'newlines-between': 'always', // Una línea nueva entre grupos
          alphabetize: {
            order: 'asc', // Ordenar alfabéticamente dentro de cada grupo
            caseInsensitive: true, // Ignorar mayúsculas/minúsculas al ordenar
          },
        },
      ],

      // Podrías necesitar ajustar 'import/extensions' dependiendo de cómo manejes las extensiones en tus importaciones.
      // Por ejemplo, para asegurar que no se usen extensiones .ts o .js pero sí .vue:
      /*
    'import/extensions': [
      'error',
      'ignorePackages', // permite a los paquetes no tener extensión
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        vue: 'always', // o 'never' si no las usas/quieres
      },
    ],
    */

      // Considera desactivar 'import/no-unresolved' si `eslint-import-resolver-typescript` no
      // resuelve algún caso específico y prefieres que TypeScript lo maneje.
      // Aunque idealmente, el resolver debería estar configurado para manejar todos los casos.

      // Si usas mucho `export default`, esta regla puede ser útil:
      // 'import/prefer-default-export': 'off', // o 'warn' si quieres fomentarlo o desincentivarlo

      // Para asegurar que todos los exports tengan un nombre (evitar anónimos problemáticos)
      // 'import/no-anonymous-default-export': ['warn', { allowObject: true }],
    },
  },

  // Prettier (Debe ir al final)
  eslintConfigPrettier,
]
