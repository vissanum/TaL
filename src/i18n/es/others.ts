export default {
  routes: {
    settings: 'Configuración',
    shortcutKeys: 'Teclas de acceso rápido',
    pluginsMarket: 'Catálogo de plugins',
    assistantsMarket: 'Catálogo de asistentes',
    account: 'Cuenta',
    modelPricing: 'Precios de modelos',
  },
  values: {
    apiAddress: 'Dirección de la API',
    defaultServiceAddress:
      'Por defecto, la dirección oficial del proveedor de servicios',
    defaultOpenAIAddress: 'Por defecto, la dirección oficial de OpenAI',
    organization: 'Organización',
    project: 'Proyecto',
    optional: 'Opcional',
    resourceName: 'Nombre del recurso',
    apiVersion: 'Versión de la API',
    defaultAnthropicAddress: 'Por defecto, la dirección oficial de Anthropic',
    defaultGoogleAddress: 'Por defecto, la dirección oficial de Google',
    openaiCompatible: 'Compatible con OpenAI',
    required: 'Requerido',
  },
  templates: {
    defaultWsIndexContent: `## {'{{ workspace.name }}'}

### Guía de uso

Haz clic en "**Crear diálogo**" en la barra lateral derecha para iniciar una conversación.

- Puedes cambiar las teclas de acceso rápido para enviar mensajes en la configuración de la barra lateral izquierda. Por defecto es Ctrl+Enter.
- Esta aplicación es multiplataforma y se puede utilizar en diferentes dispositivos como ordenadores y teléfonos móviles.
- Haz clic en el asistente en la barra lateral derecha para acceder a la configuración del asistente, donde puedes establecer prompts y habilitar varios plugins.
- En la barra lateral izquierda, puedes crear múltiples espacios de trabajo para separar conversaciones con diferentes temas.
- Haz clic en el icono de configuración en la esquina superior derecha para acceder a la configuración del espacio de trabajo, donde puedes cambiar el asistente predeterminado y modificar el contenido que se muestra aquí.

Para más información, consulta la <a href="https://docs.aiaw.app/usage/" target="_blank">Guía de uso</a>

GitHub: <a href="https://github.com/NitroRCr/aiaw" target="_blank">NitroRCr/AIaW</a>
`, // FIXME: Los enlaces apuntan a AIaW. Se deberían actualizar a la documentación de TaL cuando exista.
  },
  mcpClient: {
    connectingMcpServer: 'Conectando al servidor MCP...',
  },
  plugins: {
    time: {
      title: 'Hora y fecha',
      description:
        'Permite a la IA obtener la hora y fecha actuales (no muy útil. Se puede usar para probar si las llamadas a herramientas funcionan correctamente)',
      prompt: 'Obtener la hora y fecha actuales',
    },
    calculator: {
      title: 'Calculadora',
      description:
        'Proporciona una calculadora para permitir que la IA complete cálculos más complejos',
    },
    whisper: {
      title: 'Reconocimiento de voz: Whisper',
      description:
        'Sube archivos de audio y convierte voz a texto usando el modelo Whisper',
      transcribe: {
        description: 'Convertir voz a texto',
      },
      taskType: 'Tipo de tarea',
    },
    flux: {
      title: 'Generación de imágenes: FLUX',
      description:
        'Permite a la IA llamar al modelo FLUX para generar imágenes. Se llama a través de 🤗 Spaces, por lo que es gratuito',
    },
    videoTranscript: {
      title: 'Vídeo a texto',
      description:
        'Extrae el audio del vídeo y lo convierte a texto. Para preguntar a la IA sobre el contenido del vídeo',
      transcribe: {
        description: 'Convertir vídeo a texto',
      },
      audioEncoderError:
        'El navegador actual no admite la codificación de audio. Se recomienda utilizar la última versión del navegador Chrome/Edge.',
      rangeInput: {
        label: 'Rango de tiempo',
      },
    },
    emotions: {
      title: 'Emoticonos',
      description:
        'Permite que la IA use emoticonos en sus respuestas para hacerlas más vivas',
      displayWidth: {
        label: 'Tamaño de visualización',
      },
    },
    mermaid: {
      title: 'Diagrama Mermaid',
      description:
        'Permite que la IA use la sintaxis de Mermaid para crear diagramas en sus respuestas',
      prompt:
        'En la respuesta, si necesitas dibujar un diagrama, puedes usar directamente la sintaxis de mermaid para crearlo, el cual se podrá renderizar normalmente.',
    },
    mcp: {
      runCommand: 'Ejecutar comando',
      cwd: 'Directorio de trabajo',
    },
  },
  artifactsPlugin: {
    description: 'Modificar artefacto',
  },
  update: {
    updating: 'Actualizando...',
    updateFound: 'Actualización encontrada: {version}',
    download: 'Descargar',
    ignore: 'Ignorar',
    install: 'Instalar',
    downloadedNewVersion: 'Nueva versión descargada: {version}',
    installedNewVersion: 'Nueva versión instalada: {version}',
    relaunch: 'Reiniciar',
  },
  stores: {
    plugins: {
      stdioRequireDesktop:
        'Los plugins MCP de tipo STDIO solo son compatibles con la versión de escritorio',
    },
    assistants: {
      newAssistant: 'Nuevo asistente',
    },
    workspaces: {
      newFolder: 'Nueva carpeta',
      newWorkspace: 'Nuevo espacio de trabajo',
    },
    providers: {
      newProvider: 'Nuevo proveedor',
    },
  },
  db: {
    exampleWorkspace: 'Espacio de trabajo de ejemplo',
    defaultAssistant: 'Asistente predeterminado',
  },
  webSearchPlugin: {
    title: 'Búsqueda web y rastreo',
    description:
      'Proporciona la capacidad de usar motores de búsqueda y rastrear contenido web',
    searxngURLCaption: 'Personaliza la dirección de la instancia SearXNG',
    jinaApiKeyCaption:
      'Rellena para mejorar el límite de tasa del rastreo web, disponible en jina.ai',
    toolSearchCaption: 'Llamar a motores de búsqueda para buscar en la web',
    toolCrawlCaption: 'Rastrear contenido web',
    defaultEngines: 'Motores de búsqueda predeterminados',
    defaultEnginesCaption:
      'Lista de motores de búsqueda separados por comas, dejar en blanco para seguir la configuración del servidor',
    resultsLimit: 'Límite de resultados',
    resultsLimitCaption: 'Limitar el número de resultados de búsqueda por vez',
    configureSearxngMessage:
      'Por favor, configura la instancia SearXNG en el servidor, o configura la URL de SearXNG en los ajustes del plugin',
  },
  docParsePlugin: {
    title: 'Análisis de documentos',
    description:
      'Analiza el contenido de documentos (PDF, Word, Excel, PPT, etc.) y lo convierte a texto Markdown',
    llamaParseDescription: 'Llamar a LlamaParse para analizar el documento',
    pdfExtractTextLabel: 'Extraer texto de PDF',
    pdfExtractTextDescription: 'Extraer contenido de texto de PDF',
    pdfScreenshotLabel: 'Captura de pantalla de PDF',
    pdfScreenshotDescription: 'Capturar contenido de PDF como imagen',
    docxParseLabel: 'Análisis de documentos Word',
    docxParseDescription: 'Convertir documento Word a HTML',
    xlsxParseLabel: 'Análisis de hojas de cálculo Excel',
    xlsxParseDescription: 'Convertir hoja de cálculo Excel a tabla Markdown',
    pptxParseLabel: 'Extraer texto de PPTX',
    pptxParseDescription: 'Extraer contenido de texto de PPTX',
    rangeInput: {
      label: 'Rango de páginas',
      hint: 'Ejemplo: 1-3,5',
    },
    ocrLanguage: 'Idioma para OCR',
    pagesLimitDialog: {
      title: 'Demasiadas páginas',
      message:
        'El número de capturas de pantalla de documentos a renderizar es demasiado grande (>{limit}). Demasiadas imágenes pueden causar una carga lenta y afectar la comprensión del modelo. Se recomienda especificar un rango de páginas y volver a analizar. ¿Continuar analizando?',
      cancel: 'Cancelar',
      continue: 'Continuar analizando',
    },
    emptyPagesDialog: {
      title: 'Demasiadas páginas vacías',
      message:
        'Más de la mitad de los resultados del análisis de páginas están vacíos. Esto puede deberse a que el documento PDF consiste en imágenes escaneadas, y este analizador solo puede extraer texto del documento. Se recomienda volver a analizar utilizando el analizador "@:{docParsePlugin.pdfScreenshotLabel}".',
    },
  },
}
