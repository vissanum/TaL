# Configuración del entorno de desarrollo para TaL

Esta guía describe los pasos para configurar tu entorno de desarrollo y poder contribuir al proyecto TaL.

## Prerrequisitos generales

* **Sistema operativo:**
    * **Linux:** Recomendado (Linux Mint usado como referencia interna). Cualquier distribución moderna debería funcionar.
    * **Windows:** Soportado (preferiblemente con WSL2 para una mejor experiencia con herramientas de línea de comandos).
    * **macOS:** Soportado.
* **Git:** Necesario para clonar el repositorio y gestionar versiones. [https://git-scm.com/downloads](https://git-scm.com/downloads)
* **IDE recomendado:** Cualquier IDE moderno debería valer, recomendamos [Visual Studio Code (VSCode)](https://code.visualstudio.com/)

## Software y herramientas específicas del proyecto

### 1. Node.js y pnpm

TaL utiliza Node.js para el desarrollo del frontend y la gestión de algunas herramientas de compilación. `pnpm` es el gestor de paquetes Node.js preferido para este proyecto debido a su eficiencia.

* **Node.js:**
    * Se recomienda usar la versión LTS más reciente. Puedes gestionarlo con `nvm` (Node Version Manager) para facilitar el cambio entre versiones.
    * Instrucciones para `nvm`: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
    * Una vez instalado `nvm`, instala Node.js:

        ```bash
        nvm install --lts
        nvm use --lts
        ```
* **pnpm:**
    * Instrucciones de instalación: [https://pnpm.io/installation](https://pnpm.io/installation)
    * Por ejemplo, después de instalar Node.js:

        ```bash
        npm install -g pnpm
        ```

### 2. Rust

El backend de TaL está escrito en Rust.

* **Instalación de Rust (via `rustup`):**
    * Sigue las instrucciones oficiales en [https://www.rust-lang.org/tools/install](https://www.rust-lang.org/tools/install)
    * Esto instalará `rustup` (el gestor de toolchains de Rust) y `cargo` (el gestor de paquetes y sistema de compilación de Rust).
    * Asegúrate de tener el toolchain `stable` como predeterminado y actualizado:

        ```bash
        rustup default stable
        rustup update
        ```
* **Componentes adicionales (Targets de compilación):**
    * Para compilar para diferentes plataformas, podrías necesitar añadir targets específicos. Por ejemplo, para cross-compilar:

        ```bash
        # Ejemplo: rustup target add x86_64-unknown-linux-gnu
        # Ejemplo: rustup target add x86_64-pc-windows-msvc
        # Ejemplo: rustup target add aarch64-apple-darwin
        ```

    * Consulta la documentación de Rust y Tauri para los targets necesarios según tu SO y los SOs para los que quieras compilar.

### 3. Tauri CLI

Tauri CLI es necesario para desarrollar y compilar aplicaciones Tauri.

* **Prerrequisitos del sistema para Tauri:**
    * Antes de instalar Tauri CLI, asegúrate de cumplir con los [prerrequisitos de desarrollo de Tauri](https://tauri.app/v1/guides/getting-started/prerequisites) para tu sistema operativo. Esto incluye compiladores de C/C++, bibliotecas de desarrollo webview, etc.
    * **Linux:** `sudo apt update && sudo apt install libwebkit2gtk-4.0-dev build-essential curl wget libssl-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev` (para Debian/Ubuntu)
    * **Windows:** Microsoft Visual Studio C++ Build Tools (ver enlace de prerrequisitos).
    * **macOS:** Xcode Command Line Tools (ver enlace de prerrequisitos).
* **Instalación de Tauri CLI:**
    * Una vez que los prerrequisitos del sistema estén instalados:

        ```bash
        cargo install tauri-cli --locked
        ```

    * Verifica la instalación:

        ```bash
        cargo tauri --version
        ```

### 4. Configuración de VSCode (Recomendado)

* **Extensiones esenciales:**
    * `rust-lang.rust-analyzer`: Soporte avanzado para el lenguaje Rust (autocompletado, errores, etc.).
    * `Vue.volar` (o `Vue.vscode-typescript-vue-plugin` si prefieres, y `Vue.volar-embedded-vue-language-features`): Soporte para Vue 3 y TypeScript.
    * `dbaeumer.vscode-eslint`: Integración con ESLint para el frontend.
    * `esbenp.prettier-vscode`: Formateador de código para frontend.
    * `tauri-apps.tauri-vscode`: Ayuda para el desarrollo con Tauri.
    * `serayuzgur.crates`: Ayuda a gestionar dependencias de `Cargo.toml`.
* **Extensiones recomendadas adicionales:**
    * `EditorConfig.EditorConfig`: Mantiene la consistencia del estilo de código entre editores.
    * `GitHub.copilot` (si tienes acceso): Asistente de codificación IA.
    * `usernamehw.errorlens`: Muestra errores y warnings directamente en la línea.
    * `Gruntfuggly.todo-tree`: Encuentra comentarios TODO, FIXME, etc.

* **Configuración del espacio de trabajo (Opcional pero recomendado):**

    * Crea un archivo `.vscode/settings.json` en la raíz del proyecto para configuraciones específicas:

        ```json
        {
          // Formateo
          "editor.formatOnSave": true,
          "editor.defaultFormatter": "esbenp.prettier-vscode", // Para archivos frontend
          "[rust]": {
            "editor.defaultFormatter": "rust-lang.rust-analyzer",
            "editor.formatOnSave": true
          },
          // ESLint
          "eslint.validate": ["javascript", "typescript", "vue"],
          // Otras configuraciones útiles
          "files.eol": "\n", // Consistencia en finales de línea
          "search.exclude": {
            "**/node_modules": true,
            "**/dist": true,
            "**/target": true,
            "**/pnpm-lock.yaml": true
          }
        }
        ```

    * Considera añadir un archivo `.vscode/extensions.json` para recomendar extensiones a los colaboradores:

        ```json
        {
          "recommendations": [
            "rust-lang.rust-analyzer",
            "Vue.volar",
            "dbaeumer.vscode-eslint",
            "esbenp.prettier-vscode",
            "tauri-apps.tauri-vscode",
            "serayuzgur.crates",
            "EditorConfig.EditorConfig",
            "Gruntfuggly.todo-tree"
          ]
        }
        ```

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

3.  **Verificación inicial:**
    * **Backend (Rust):**

        ```bash
        cargo check       # Verifica el código Rust sin compilar
        cargo clippy --  # Linter para Rust (corrige advertencias comunes)
        # cargo test      # Ejecuta pruebas de Rust
        ```

    * **Frontend (Quasar/Vue/TS):**

        ```bash
        pnpm typecheck  # Verifica tipos de TypeScript
        # pnpm lint       # Linter para el frontend
        # pnpm test:unit  # Ejecuta pruebas unitarias del frontend
        ```

    * **Aplicación Tauri:**

        ```bash
        pnpm tauri dev # Inicia la aplicación en modo desarrollo
        ```

## Internacionalización (i18n)

* El proyecto utiliza `vue-i18n` para la internacionalización del frontend.
* Los archivos de localización se encuentran en `src/i18n/`.
* Si contribuyes con traducciones o modificas textos que requieren traducción, asegúrate de seguir la estructura existente y actualizar los archivos de idioma correspondientes.
* [Más detalles se añadirán aquí sobre el flujo de trabajo específico de i18n si es necesario].

---
*Esta guía se actualizará a medida que evolucionen los requisitos del entorno de desarrollo.*
