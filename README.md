# TaL (Tu asistente Local)

**TaL es una aplicación de escritorio para interactuar con modelos de Inteligencia Artificial, diseñada con un fuerte enfoque en la privacidad del usuario y la capacidad de ejecución local.**

> [!NOTE]
> Este proyecto se encuentra actualmente en **desarrollo activo**. Las funcionalidades descritas pueden estar en proceso de implementación y la aplicación aún no está lista para uso general.

## ✨ Sobre TaL

TaL (Tu asistente Local) tiene como objetivo ser un asistente de IA versátil y seguro para tu escritorio. Es una aplicación de escritorio tipo chatbot, ligera, robusta y flexible, reingenierizada significativamente desde su base "AI as Workspace" (AIaW).

### Introducción al proyecto

TaL está siendo construido con un backend completamente reescrito en Rust (Edición 2021), aprovechando las capacidades de Tauri v2 para la interfaz de usuario. Esto asegura un alto rendimiento y una integración profunda con el sistema operativo, a la vez que prioriza la seguridad y la privacidad del usuario. TaL permite a los usuarios interactuar tanto con modelos de IA que se ejecutan 100% en local como con aquellos accesibles a través de APIs remotas.

### Objetivos clave

- **Privacidad y control local:** Permitir la ejecución 100% local de modelos de IA, asegurando que los datos sensibles del usuario no abandonen su máquina sin consentimiento explícito.
- **Flexibilidad y extensibilidad:** Soportar tanto modelos locales como proveedores de IA remotos, y ofrecer una arquitectura que permita la fácil integración de nuevas funcionalidades y extensiones (plugins).
- **Rendimiento y eficiencia:** Utilizar Rust y Tauri v2 para ofrecer una aplicación nativa, rápida y con bajo consumo de recursos.
- **Experiencia de usuario intuitiva:** Proporcionar una interfaz de usuario clara, amigable y personalizable.
- **Funcionalidades avanzadas de IA:** Incorporar capacidades de Retrieval-Augmented Generation (RAG), gestión de asistentes personalizados y espacios de trabajo.
- **Preparación para el futuro:** Diseñar la aplicación con una arquitectura que facilite la evolución hacia un modelo cliente-servidor, soportando clientes web y móviles.

### Stack tecnológico principal

- **Backend:** Rust (Edición 2021)
- **Framework de aplicación:** Tauri v2
- **Frontend:** Quasar v2 (con Vue 3 y TypeScript)
- **Motor de inferencia local:** Basado en Rust (explorando `Candle`).
- **Base de datos vectorial (para RAG):** LanceDB (embebida).
- **Runtime asíncrono Rust:** Tokio.
- **Serialización Rust:** Serde (JSON para IPC, Bincode para persistencia).

### Funcionalidades principales

- **Interacción con IA local y remota:** Capacidad para chatear con LLMs ejecutados localmente y a través de APIs.
- **Interfaz Multi-idioma:** Soporte para interfaz de usuario en Español (predeterminado) e Inglés.
- **Retrieval-Augmented Generation (RAG):** Procesamiento y consulta de documentos locales para enriquecer las respuestas de la IA.
- **Gestión de asistentes:** Creación y personalización de múltiples perfiles de asistentes de IA.
- **Espacios de trabajo:** Organización de chats, documentos y configuraciones en contextos separados.
- **Soporte de plugins:** Extensibilidad mediante un sistema de plugins.
- **Cliente MCP:** Posibilidad de uso como cliente MCP, permitiendo añadir servidores MCP.
- **Interfaz de usuario moderna:** Interfaz rica y personalizable gracias a Quasar y Vue3.
- **Privacidad por diseño:** Énfasis en el control del usuario sobre sus datos.
- **Futura evolución:** Preparado para soportar clientes web y móviles, y en desarrollo una web pública para documentación y descargas en [`tuasistentelocal.com`](https://tuasistentelocal.com/).

## 🚀 Contribución y desarrollo

Estamos abiertos a contribuciones. Si quieres ayudarnos a mejorar TaL, por favor revisa nuestra guía de contribución y las instrucciones para configurar tu entorno de desarrollo:

- **📜 Guía de contribución:** [`CONTRIBUTING.md`](./CONTRIBUTING.md)
- **🛠️ Configuración del entorno de desarrollo:** [`DEVELOPMENT_ENVIRONMENT_SETUP.md`](./DEVELOPMENT_ENVIRONMENT_SETUP.md)

## Licencia

TaL se distribuye bajo la licencia BSD 3-Clause. Ver el archivo [`LICENSE`](./LICENSE) para más detalles.
Este proyecto se basa en AIaW, también licenciado bajo BSD 3-Clause.

---

_Este README se actualizará a medida que el proyecto TaL avance._
