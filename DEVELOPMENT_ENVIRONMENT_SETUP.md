# Configuración del entorno de desarrollo para TaL

Esta guía describe los pasos para configurar tu entorno de desarrollo y poder contribuir al proyecto TaL.

## Prerrequisitos generales

- **Sistema operativo:**
  - **Linux:** Recomendado (Linux Mint usado como referencia interna). Cualquier distribución moderna debería funcionar.
  - **Windows:** Soportado (preferiblemente con WSL2 para una mejor experiencia con herramientas de línea de comandos).
  - **macOS:** Soportado.
- **Git:** Necesario para clonar el repositorio y gestionar versiones. [https://git-scm.com/downloads](https://git-scm.com/downloads)
- **IDE recomendado:** Cualquier IDE moderno debería valer, recomendamos [Visual Studio Code (VSCode)](https://code.visualstudio.com/)

## Software y herramientas específicas del proyecto

### 1. Node.js y pnpm

TaL utiliza Node.js para el desarrollo del frontend y la gestión de algunas herramientas de compilación. `pnpm` es el gestor de paquetes Node.js preferido para este proyecto debido a su eficiencia. Se recomienda usar una versión LTS reciente de Node.js ej., v20.x.x. Asegúrate de tener pnpm instalado ej., v10.x.x.

- **Node.js:**

  - Se recomienda usar la versión LTS más reciente. Puedes gestionarlo con `nvm` (Node Version Manager) para facilitar el cambio entre versiones.
  - Instrucciones para `nvm`: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
  - Una vez instalado `nvm`, instala Node.js:

    ```bash
    nvm install --lts
    nvm use --lts
    ```

- **pnpm:**

  - Instrucciones de instalación: [https://pnpm.io/installation](https://pnpm.io/installation)
  - Por ejemplo, después de instalar Node.js:

    ```bash
    npm install -g pnpm
    ```

### 2. Rust

El backend de TaL está escrito en Rust.

- **Instalación de Rust (via `rustup`):**

  - Sigue las instrucciones oficiales en [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)
  - Esto instalará `rustup` (el gestor de toolchains de Rust) y `cargo` (el gestor de paquetes y sistema de compilación de Rust).
  - Asegúrate de tener el toolchain `stable` como predeterminado y actualizado ej. rustc 1.86.0:

    ```bash
    rustup default stable
    rustup update
    ```

  - Asegúrate de tener el toolchain `stable` como predeterminado y actualizado (ej. `rustc 1.86.x`, `cargo 1.86.x`). También asegúrate de que componentes como `rustfmt` estén instalados:
    ```bash
    rustup default stable
    rustup update
    rustup component add rustfmt # Asegura que rustfmt está instalado
    # Verifica las versiones (opcional aquí, el script check-env lo hará)
    # rustc --version
    # cargo --version
    # rustfmt --version
    ```

- **Componentes adicionales (Targets de compilación):**

  - Para compilar para diferentes plataformas, podrías necesitar añadir targets específicos. Por ejemplo, para cross-compilar:

    ```bash
    # Ejemplo: rustup target add x86_64-unknown-linux-gnu
    # Ejemplo: rustup target add x86_64-pc-windows-msvc
    # Ejemplo: rustup target add aarch64-apple-darwin
    ```

  - Consulta la documentación de Rust y Tauri para los targets necesarios según tu SO y los SOs para los que quieras compilar.

### 3. Tauri CLI

Tauri CLI es necesario para desarrollar y compilar aplicaciones Tauri.

- **Prerrequisitos del sistema para Tauri:**
  - Antes de instalar Tauri CLI, asegúrate de cumplir con los [prerrequisitos de desarrollo de Tauri](https://v2.tauri.app/start/prerequisites/) para tu sistema operativo. Esto incluye compiladores de C/C++, bibliotecas de desarrollo webview, etc.
  - **Linux:** `sudo apt update && sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev patchelf` (para Debian/Ubuntu)
  - **Windows:** Microsoft Visual Studio C++ Build Tools (ver enlace de prerrequisitos).
  - **macOS:** Xcode Command Line Tools (ver enlace de prerrequisitos).
- **Instalación de Tauri CLI:**

Tauri CLI se gestiona como una dependencia de desarrollo del proyecto a través de pnpm. Normalmente no necesitarás instalarlo globalmente si ejecutas los comandos a través de pnpm.:

- Verifica la instalación (Deberías ver una salida similar a tauri-cli 2.x.x, ej. tauri-cli 2.7.0):

  ```bash
  pnpm tauri --version
  ```

### 4. Configuración de VSCode (Recomendado)

Se recomienda [Visual Studio Code (VSCode)](https://code.visualstudio.com/) como IDE para el desarrollo de TaL. A continuación, se listan extensiones y configuraciones sugeridas.

- **Extensiones esenciales y recomendadas:**
  Sugerimos instalar las siguientes extensiones para una mejor experiencia de desarrollo. Puedes instalarlas buscando sus IDs en el Marketplace de VSCode.

  - **Esenciales:**
    - `rust-lang.rust-analyzer`: Soporte avanzado para el lenguaje Rust.
    - `Vue.volar`: Soporte oficial para Vue 3 y TypeScript (anteriormente Volar).
    - `dbaeumer.vscode-eslint`: Integración con ESLint para el frontend.
    - `esbenp.prettier-vscode`: Formateador de código Prettier.
    - `tauri-apps.tauri-vscode`: Ayuda para el desarrollo con Tauri (ej. `tauri.conf.json`).
    - `EditorConfig.EditorConfig`: Mantiene la consistencia del estilo de código.
  - **Adicionales útiles:**
    - `foxundermoon.dependi`: Ayuda a gestionar dependencias en `Cargo.toml` (sucesor de `crates`).
    - `wayou.vscode-todo-highlight`: Resalta comentarios TODO, FIXME, etc.
    - `GitHub.vscode-github-actions`: Soporte para workflows de GitHub Actions.
    - `usernamehw.errorlens`: Muestra errores y warnings directamente en la línea.

- **Configuración del espacio de trabajo (Workspace):**
  Para asegurar una configuración consistente entre colaboradores, el proyecto TaL incluye archivos de configuración recomendados en el directorio `.vscode/`.

  - **`.vscode/extensions.json`:**
    Este archivo recomienda las extensiones listadas arriba a cualquier persona que abra el proyecto en VSCode. Su contenido debería ser similar a:

    ```json
    // .vscode/extensions.json
    {
      "recommendations": [
        // Esenciales
        "dbaeumer.vscode-eslint",
        "editorconfig.editorconfig",
        "Vue.volar",
        "esbenp.prettier-vscode",
        "rust-lang.rust-analyzer",
        "tauri-apps.tauri-vscode",
        // Adicionales
        "foxundermoon.dependi",
        "wayou.vscode-todo-highlight",
        "GitHub.vscode-github-actions",
        "usernamehw.errorlens"
      ],
      "unwantedRecommendations": [
        "octref.vetur",
        "hookyqr.beautify",
        "dbaeumer.jshint",
        "ms-vscode.vscode-typescript-tslint-plugin",
        "serayuzgur.crates"
      ]
    }
    ```

  - **`.vscode/settings.json`:**
    Este archivo define configuraciones específicas del espacio de trabajo, como el formateador por defecto y el formateo al guardar. El contenido actual del proyecto es un buen punto de partida y se encuentra en `.vscode/settings.json`. Un ejemplo de su estructura es:
    ```json
    // .vscode/settings.json
    {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "esbenp.prettier-vscode", // Prettier como global por defecto
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
      },
      "eslint.validate": ["javascript", "typescript", "vue"],
      // ... (otras configuraciones como las que ya tienes para rust-analyzer) ...
      "[rust]": {
        "editor.defaultFormatter": "rust-lang.rust-analyzer",
        "editor.formatOnSave": true
      }
      // ... (resto de tu configuración actual de settings.json) ...
    }
    ```
    _(Nota: Se recomienda mantener el archivo `.vscode/settings.json` del repositorio actualizado con las configuraciones que beneficien al equipo, como las relativas a formateadores y linters)._

## Pasos iniciales del proyecto

1.  **Clona el repositorio:**

    ```bash
    git clone [https://github.com/vissanum/TaL.git](https://github.com/vissanum/TaL.git)
    cd TaL
    ```

2.  **Instala dependencias del Frontend:**

    ```bash
    pnpm install
    ```

### 5. Configuración de linters (Análisis estático de código)

Para mantener la calidad y consistencia del código, TaL utiliza linters tanto para el backend de Rust como para el frontend de TypeScript/Vue.

#### a. Clippy (Rust linter)

Clippy es el linter estándar para Rust y ayuda a identificar errores comunes y código poco idiomático.

- **Configuración:**
  Clippy se configura principalmente a través de la toolchain de Rust. Por defecto, la mayoría de los lints de Clippy generan advertencias (`warn`). Para este proyecto, buscamos un alto nivel de calidad, por lo que se recomienda tratar las advertencias como errores durante el desarrollo.
  Si se necesitan configuraciones específicas para ciertos lints, se pueden añadir a la sección `[lints.clippy]` del archivo `src-tauri/Cargo.toml`.

- **Ejecución:**
  Para ejecutar Clippy en el backend (desde el directorio `src-tauri/` o usando los scripts del `package.json` si se configuran):

```bash
  cargo clippy --all-targets -- -D warnings
```

Este comando verifica todos los targets y falla si hay alguna advertencia (`-D warnings`).
Espera una salida limpia (sin errores ni advertencias) para considerar el código como válido.

#### b. ESLint (TypeScript/Vue linter)

ESLint se utiliza para el análisis estático del código del frontend (TypeScript, Vue, JavaScript).

- **Configuración:**
  La configuración de ESLint se encuentra en el archivo `.eslintrc.cjs` en la raíz del proyecto. Utiliza presets para TypeScript, Vue 3 (con reglas "strongly-recommended"), StandardJS y se integra con Prettier para evitar conflictos de reglas de formato. Los archivos ignorados por ESLint se especifican en `.eslintignore`.

- **Ejecución:**
  Para ejecutar ESLint en el frontend (desde el directorio raíz del proyecto):

```bash
    pnpm lint
```

    Este comando está definido en el `package.json`.
    Revisa la salida en la terminal. ESLint reportará cualquier error o advertencia de estilo o potencial bug. Se espera una salida sin errores.

### 6. Configuración de formateadores de código

Para asegurar un estilo de código uniforme y legible en todo el proyecto, se utilizan formateadores automáticos.

#### a. rustfmt (Rust Formatter)

`rustfmt` es la herramienta estándar para formatear código Rust.

- **Configuración:**
  El proyecto utiliza la configuración por defecto de `rustfmt`. No se requiere un archivo de configuración `rustfmt.toml` adicional, ya que los defaults son ampliamente aceptados.
  VSCode, a través de la extensión `rust-analyzer`, está configurado para usar `rustfmt` y formatear los archivos Rust al guardarlos (ver sección de configuración de VSCode).

- **Ejecución manual:**
  Para formatear manualmente todo el código del backend (desde el directorio `src-tauri/`):
  ```bash
  cargo fmt
  ```

### 7. Scripts de Desarrollo Comunes

El archivo `package.json` en la raíz del proyecto contiene varios scripts para facilitar las tareas comunes de desarrollo, linting, formateo y compilación. A continuación, se describen los más relevantes:

#### a. Desarrollo

- **`pnpm dev`**:
  Inicia el servidor de desarrollo de Quasar para el frontend. Útil para trabajar exclusivamente en la interfaz de usuario. El frontend estará accesible generalmente en `http://localhost:9005`.

- **`pnpm dev:tauri`**:
  Inicia la aplicación Tauri completa en modo desarrollo. Esto compila el backend de Rust, inicia el frontend (ejecutando `pnpm dev` internamente si es necesario, según la configuración de `tauri.conf.json`) y abre la ventana de la aplicación de escritorio con las herramientas de desarrollo activadas. Es el comando principal para el desarrollo diario de la aplicación.

#### b. Compilación (Build)

- **`pnpm build`**:
  Compila el frontend de Quasar para producción. Los artefactos se generan típicamente en `dist/spa`.

- **`pnpm build:tauri`**:
  Compila y empaqueta la aplicación Tauri completa para producción, generando los instaladores y ejecutables para las plataformas configuradas. Este comando ejecutará `pnpm build` internamente antes de empaquetar (según `tauri.conf.json`).

#### c. Calidad de Código (Linting y Formateo)

- **Frontend (ESLint & Prettier):**

  - `pnpm lint:frontend`: Ejecuta ESLint para analizar el código TypeScript y Vue.
  - `pnpm format:frontend`: Formatea el código del frontend utilizando Prettier.
  - `pnpm format:frontend:check`: Verifica si el código del frontend está formateado correctamente según Prettier, sin aplicar cambios.
  - `pnpm check:frontend:types`: Realiza un chequeo de tipos de TypeScript en los archivos Vue y TS.

- **Backend (Clippy & rustfmt):**

  - `pnpm check:rust`: Ejecuta `cargo check` en el backend para una verificación rápida.
  - `pnpm lint:rust`: Ejecuta Clippy en el backend con `-D warnings` para un análisis exhaustivo.
  - `pnpm format:rust`: Formatea el código del backend utilizando `cargo fmt`.
  - `pnpm format:rust:check`: Verifica si el código del backend está formateado correctamente según `rustfmt`, sin aplicar cambios.

- **Combinados:**
  - `pnpm lint`: Ejecuta linters para frontend y backend.
  - `pnpm format`: Formatea código de frontend y backend.
  - `pnpm format:check`: Verifica el formateo de frontend y backend.
  - `pnpm check:all`: Realiza chequeos de tipos del frontend y `cargo check` del backend.

#### d. Otros

- **`pnpm test`**: (Actualmente un placeholder) Destinado a ejecutar las suites de pruebas automatizadas del proyecto.
- **`pnpm docs:*`**: Scripts relacionados con la generación y visualización de la documentación con VitePress.
- **`pnpm sync-version`**: Script personalizado para sincronizar versiones (ver `scripts/sync-version.js`).

Se recomienda familiarizarse con estos scripts para agilizar el flujo de trabajo de desarrollo y asegurar la calidad del código antes de realizar commits.

### 8. Flujo de Trabajo de Desarrollo y Contribución

Para asegurar una colaboración efectiva y un historial de cambios limpio y comprensible, el proyecto TaL sigue pautas específicas para el flujo de trabajo con Git y la redacción de mensajes de commit.

- **Flujo de Git:**
  El proyecto utiliza un flujo de trabajo Git simplificado basado en ramas. Las nuevas funcionalidades y correcciones se desarrollan en ramas específicas que parten de `develop` y luego se integran de nuevo en `develop` mediante Pull Requests. La rama `main` se reserva para las versiones estables.

- **Convenciones de Commit:**
  Se sigue la especificación de [Conventional Commits](https://www.conventionalcommits.org/) para los mensajes de commit. Esto es crucial para la claridad del historial y para futuras automatizaciones (como la generación de changelogs).

- **Guía Detallada:**
  Encontrarás todos los detalles sobre el flujo de trabajo de Git, la estructura de ramas, cómo nombrar tus ramas, la convención exacta para los mensajes de commit y el proceso de Pull Request en nuestra **[Guía de Contribución (`CONTRIBUTING.md`)](./CONTRIBUTING.md)**. Es **fundamental** leer y seguir estas pautas al contribuir al proyecto.

### 9. Script de Diagnóstico del Entorno

Para ayudarte a verificar rápidamente si tu entorno de desarrollo cumple con los requisitos básicos, el proyecto incluye un script de diagnóstico.

- **Ubicación:** `scripts/check-env.js`
- **Ejecución (desde la raíz del proyecto):**

  ```bash
  node scripts/check-env.js
  ```

  _(Opcionalmente, si le has dado permisos de ejecución y el shebang `#!/usr/bin/env node` funciona en tu sistema: `./scripts/check-env.js`)_

- **Propósito:**
  El script verificará la presencia y las versiones de herramientas clave como Git, Node.js, nvm, pnpm, Rust (rustc, cargo, rustfmt), Tauri CLI y algunas dependencias de sistema comunes para Linux.
  Mostrará `OK` si una herramienta se encuentra y cumple con un patrón de versión esperado (si se define), o `FALLO`/`NO ENCONTRADO` en caso contrario. Para las dependencias de sistema en Linux, indicará si están instaladas.

  Utiliza este script si encuentras problemas al compilar o ejecutar el proyecto para obtener una primera pista sobre posibles problemas de configuración del entorno.

### 10. Verificación Inicial

- **Backend (Rust - ejecutar en el directorio `src-tauri`):**

  ```bash
  pnpm check:rust
  pnpm lint:rust
  # pnpm test:rust
  ```

- **Frontend (Quasar/Vue/TS - ejecutar en el directorio raíz del proyecto):**

  ```bash
  pnpm vue-tsc --noEmit
  pnpm lint
  # pnpm test:unit
  ```

- **Aplicación Tauri (ejecutar en el directorio raíz del proyecto):**
  ```bash
  pnpm tauri dev
  ```

## Internacionalización (i18n)

- El proyecto utiliza `vue-i18n` (actualmente v11.x con API de Composición) para la internacionalización del frontend.
- Los archivos de localización se encuentran en el directorio `src/i18n/`.

### Estructura y Flujo de Trabajo

Actualmente, TaL soporta los siguientes idiomas:

- **Español (`es`):** Idioma por defecto de la aplicación.
- **Inglés (`en`):** Idioma de fallback.

La configuración y los archivos de idioma se gestionan de la siguiente manera:

- **Configuración Principal:**
  - `src/boot/i18n.ts`: Archivo de arranque de Quasar que inicializa `vue-i18n`, configura el idioma por defecto (`es`), el idioma de fallback (`en`), y maneja la carga de los paquetes de idioma de Quasar. También observa cambios en `localData.language` para permitir el cambio de idioma en tiempo de ejecución.
  - `quasar.config.js`: Configura `lang: 'es'` en la sección `framework` para el paquete de idioma inicial de Quasar y registra el boot file `i18n`.
- **Archivos de Traducción:**
  - `src/i18n/index.ts`: Archivo central que importa y exporta todos los módulos de idioma soportados.
  - `src/i18n/es/`: Directorio que contiene todos los archivos de traducción para el español.
    - `index.ts`: Importa y exporta todas las cadenas de los demás archivos `.ts` de este directorio.
    - `components.ts`, `composables.ts`, `others.ts`, `pages.ts`, `views.ts`: Archivos modulares donde se definen las cadenas de texto para diferentes partes de la aplicación en español.
  - `src/i18n/en/`: Estructura idéntica al directorio `es/` pero para las traducciones en inglés.

### Cómo Añadir/Modificar Traducciones

1.  **Identificar el archivo correcto:** Localiza el archivo `.ts` apropiado dentro de `src/i18n/es/` y `src/i18n/en/` según la parte de la aplicación a la que pertenece el texto (p.ej., `pages.ts` para textos de una página específica, `components.ts` para componentes genéricos).
2.  **Añadir la clave y traducción:**
    - En el archivo correspondiente de `src/i18n/es/`, añade la nueva clave (o modifica una existente) con su traducción al español.
    - En el archivo correspondiente de `src/i18n/en/`, añade la misma clave con su traducción al inglés.
    - **Ejemplo de estructura de clave:**
      ```typescript
      // en src/i18n/es/pages.ts
      export default {
        miPagina: {
          titulo: 'Mi Página Ejemplo',
          botonGuardar: 'Guardar Cambios',
        },
        // ...otras claves
      }
      ```
3.  **Uso en componentes Vue:**
    Utiliza el helper `$t` o el composable `useI18n` en tus componentes:

    ```vue
    <template>
      <h1>{{ $t('miPagina.titulo') }}</h1>
      <q-btn :label="$t('miPagina.botonGuardar')" @click="guardar" />
    </template>

    <script setup>
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n()

    function guardar() {
      // Lógica de guardado
      console.log(t('miPagina.botonGuardar')) // También usable en script
    }
    </script>
    ```

### Cómo Añadir un Nuevo Idioma (Ej. Francés - `fr`)

1.  **Crear directorio y archivos:**
    - Crea un nuevo directorio: `src/i18n/fr/`.
    - Copia el contenido de `src/i18n/en/` (o `src/i18n/es/`) dentro de `src/i18n/fr/`.
2.  **Traducir:** Traduce todas las cadenas de texto en los archivos dentro de `src/i18n/fr/` al francés.
3.  **Actualizar `src/i18n/index.ts`:**

    ```typescript
    import es from './es'
    import en from './en'
    import fr from './fr' // Añadir import

    export default {
      es,
      en,
      fr, // Añadir export
    }
    ```

4.  **Actualizar `src/boot/i18n.ts`:**
    - Añade el nuevo código de idioma a `AppSupportedLang` y `appLanguages`:
      ```typescript
      export type AppSupportedLang = 'es' | 'en' | 'fr'
      const appLanguages: AppSupportedLang[] = ['es', 'en', 'fr']
      ```
    - Actualiza `quasarLangList` para incluir el paquete de Quasar para el nuevo idioma (ej. `fr.js`):
      ```typescript
      const quasarLangList = import.meta.glob(
        '../../node_modules/quasar/lang/(es|en-US|fr).js' // Añadir 'fr' o el código que use Quasar
      )
      ```
    - Ajusta la lógica en `setQuasarLang` para mapear tu código de idioma al paquete de Quasar si es necesario (similar a como `'en'` mapea a `'en-US'`).
5.  **Actualizar `src/views/SettingsView.vue`:**
    - Añade la opción para el nuevo idioma en `langOptions`:
      ```typescript
      const langOptions = [
        { label: t('settingsView.auto'), value: null },
        { label: 'Español', value: 'es' },
        { label: 'English', value: 'en' },
        { label: 'Français', value: 'fr' }, // Añadir nueva opción
      ]
      ```
6.  **Probar:** Verifica que el nuevo idioma se pueda seleccionar y que los textos se muestren correctamente.

Asegúrate de que los nuevos archivos JSON para el _market_ de asistentes y plugins (ej. `public/json/assistants.fr.json`, `public/json/plugins.fr.json`) también se creen si es necesario.

---

_Esta guía se actualizará a medida que evolucionen los requisitos del entorno de desarrollo._
