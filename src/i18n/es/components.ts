export default {
  addMcpPluginDialog: {
    stdio: 'STDIO',
    sse: 'SSE',
    pluginName: 'Nombre del Plugin',
    pluginNameCaption: 'Cualquier nombre servirá',
    command: 'Comando a ejecutar',
    commandCaption: 'El comando para ejecutar en el servidor MCP',
    workDir: 'Directorio de trabajo',
    workDirCaption: 'Opcional',
    envVars: 'Variables de entorno',
    inputVarsPlaceholder: 'Introduce el valor de la variable...',
    url: 'URL',
    cancel: 'Cancelar',
    install: 'Instalar',
    installFailed: 'Falló la instalación',
    stdioPlatformTip:
      'Solo la versión de escritorio admite plugins MCP de tipo STDIO; la plataforma actual solo admite el tipo SSE',
  },
  abortableBtn: {
    stop: 'Detener',
  },
  artifactsExpansion: {
    searchPlaceholder: 'Buscar artefactos...',
    close: 'Cerrar',
    artifactsGuide: 'referido a',
    artifactsGuideLink: 'Guía de usuario de artefactos',
    create: 'Crear',
    selectFile: 'Seleccionar archivo',
    createArtifact: 'Crear artefacto',
    name: 'Nombre',
    nonTextFile: 'Archivo no de texto: {name}',
  },
  dialogsExpansion: {
    search: 'Buscar conversaciones...',
    dialogs: 'Conversaciones',
  },
  artifactItemMenu: {
    save: 'Guardar',
    rename: 'Renombrar',
    moveTo: 'Mover a',
    download: 'Descargar',
    delete: 'Eliminar',
    deleteConfirmTitle: 'Eliminar artefacto',
    deleteConfirmMessage:
      '¿Estás seguro de que quieres eliminar el artefacto "{name}"?',
    deleteConfirmOk: 'Eliminar',
  },
  addInfoBtn: {
    attachment: 'Adjunto',
    parameter: 'Parámetro',
  },
  accountBtn: {
    account: 'Cuenta',
    login: 'Iniciar sesión',
  },
  copyBtn: {
    title: 'Copiar',
    copyFailed: 'Falló la copia',
  },
  convertArtifactDialog: {
    title: 'Convertir en artefacto',
    name: 'Nombre',
    lang: 'Idioma',
    reserveOriginal: 'Conservar original',
    cancel: 'Cancelar',
    autoName: 'Nombre automático',
    ok: 'OK',
  },
  aTip: {
    tip: 'CONSEJO',
    dismiss: 'Descartar',
  },
  assistantsExpansion: {
    createDialog: 'Crear conversación',
    moveToGlobal: 'Mover a global',
    moveToWorkspace: 'Mover a espacio de trabajo',
    delete: 'Eliminar',
    deleteConfirmTitle: 'Eliminar asistente',
    deleteConfirmMessage:
      '¿Estás seguro de que quieres eliminar el asistente "{name}"?',
    createAssistant: 'Crear asistente',
    assistants: 'Asistentes',
  },
  customProviders: {
    delete: 'Eliminar',
    deleteProvider: 'Eliminar proveedor',
    deleteConfirm:
      '¿Estás seguro de que quieres eliminar el proveedor "{name}"?',
    createProvider: 'Crear proveedor',
    setAsDefault: 'Establecer como predeterminado',
  },
  assistantItem: {
    unselected: 'No seleccionado',
    global: 'Global',
  },
  importDataDialog: {
    title: 'Importar datos de usuario',
    fileLabel: 'Archivo de datos',
    overwrite: 'Sobrescribir datos existentes',
    force: 'Forzar escritura',
    clear: 'Limpiar datos existentes antes de importar',
    cancel: 'Cancelar',
    import: 'Importar',
    importSuccess: 'Importación exitosa',
    importFailed: 'Importación fallida: {message}',
  },
  imageInputArea: {
    clickToSelect: 'Haz Clic para seleccionar imagen',
    dragHere: 'Arrastra aquí',
    paste: 'O Ctrl+V para pegar',
  },
  hueSliderDialog: {
    title: 'Elige un color',
    hue: 'Tono',
    cancel: 'Cancelar',
    ok: 'Aceptar',
  },
  dialogList: {
    createDialog: 'Crear conversación',
    searchPlaceholder: 'Buscar conversaciones...',
    renameTitle: 'Renombrar título',
    summarizeDialog: 'Resumir conversación',
    title: 'Título',
    moveTo: 'Mover a',
    copyContent: 'Copiar contenido',
    delete: 'Eliminar',
    deleteConfirmTitle: 'Eliminar conversación',
    deleteConfirmMessage:
      '¿Estás seguro de que quieres eliminar la conversación "{name}"?',
    deleteConfirmOk: 'Eliminar',
  },
  darkSwitchBtn: {
    switchToDark: 'Cambiar a modo oscuro',
    switchToLight: 'Cambiar a modo claro',
    switchToAuto: 'Cambiar a modo automático',
  },
  messageInfoDialog: {
    userMessageInfo: 'Información del mensaje de usuario',
    assistantMessageInfo: 'Información del mensaje del asistente',
    id: 'ID',
    createdAt: 'Fecha de creación', // O "Creado el"
    textLength: 'Longitud del texto',
    model: 'Modelo',
    tokenUsage: 'Uso de Tokens',
    prompt: 'Prompt:', // O "Indicación:", "Entrada:"
    completion: 'Completado:', // O "Respuesta:", "Salida:"
    ok: 'Aceptar',
  },
  installPluginBtn: {
    installed: 'Instalado',
    install: 'Instalar',
    installFailed: 'Falló la instalación:',
  },
  installedPlugins: {
    uninstallPlugin: 'Desinstalar plugin',
    uninstallConfirm:
      '¿Estás seguro de que quieres desinstalar el plugin "{title}"?',
    uninstall: 'Desinstalar',
  },
  messageItem: {
    quote: 'Citar',
    copyMarkdown: 'Markdown',
    convertToArtifact: 'Convertir en artefacto',
    regenerate: 'Regenerar',
    edit: 'Editar',
    more: 'Más',
    showSourceCode: 'Mostrar código fuente',
    directEdit: 'Edición directa',
    moreInfo: 'Más información',
    userMessageQuote: 'Cita del mensaje de usuario',
    assistantMessageQuote: 'Cita del mensaje del asistente',
    editMessage: 'Editar mensaje',
    convertToArtifactTitle: 'Convertir en artefacto',
    convertToArtifactBtn: 'Convertir en artefacto',
    copyCode: 'Copiar código',
    fold: 'Contraer',
    reasoningContent: 'Contenido del razonamiento',
    deleteBranch: 'Eliminar rama',
    deleteBranchMessage:
      '¿Estás seguro de que quieres eliminar esta rama de mensajes? Este mensaje y todos los mensajes posteriores serán eliminados.',
    delete: 'Eliminar',
  },
  parseFilesDialog: {
    parseFiles: 'Procesar archivos',
    noParserAvailable: 'No hay procesador disponible para este tipo',
    cancel: 'Cancelar',
    parse: 'Procesar',
    parser: 'Procesador',
    parseFailed: 'Falló el procesamiento de "{file}": {error}',
  },
  modelInputItems: {
    model: 'Modelo',
    multimodalCapabilities: 'Capacidades multimodales',
    multimodalCapabilitiesCaption:
      'Modificar la configuración de capacidades multimodales del modelo',
    userInputTypes: 'Tipos de entrada de usuario soportados',
    assistantMessageTypes: 'Tipos de mensaje de asistente soportados',
    toolResultTypes: 'Tipos de resultado de herramienta soportados',
  },
  platformEnabledInput: {
    alwaysEnabled: 'Siempre habilitado',
    desktopOnly: 'Solo escritorio',
    mobileOnly: 'Solo móvil',
    alwaysDisabled: 'Siempre deshabilitado',
  },
  pickAvatarDialog: {
    ai: 'IA',
    icon: 'Icono',
    text: 'Texto',
    image: 'Imagen',
    aiCompany: 'IA y empresa',
    color: 'Color',
    aiCompanyQuestion: '¿IA? ¿Y empresa?',
    preview: 'Vista previa',
    showBackground: 'Mostrar fondo',
    backgroundColor: 'Color de fondo',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    textLabel: 'Texto',
    textHint: 'Admite emojis',
  },
  payDialog: {
    pay: 'Pagar',
    refreshAfterPay:
      'Después del pago, haz clic en "Pago completado" para actualizar los datos. Si el pago no se activa, copia manualmente el enlace de pago y ábrelo en el navegador.',
    cancel: 'Cancelar',
    paymentLink: 'Enlace de pago',
    completePayment: 'Pago completado',
  },
  saveDialog: {
    title: 'Guardar cambios',
    message: '¿Quieres guardar los cambios en "{name}"?',
    cancel: 'Cancelar',
    dontSave: 'No guardar',
    save: 'Guardar',
  },
  jsonInputDialog: {
    cancel: 'Cancelar',
    ok: 'Aceptar',
  },
  providerInputItems: {
    provider: 'Proveedor',
  },
  promptVarItem: {
    variableName: 'Nombre de variable',
    label: 'Etiqueta',
    type: 'Tipo',
    options: 'Opciones',
    defaultValue: 'Valor predeterminado',
    remove: 'Quitar', // O "Eliminar"
    clearable: 'Borrable', // O "Se puede limpiar/vaciar"
    text: 'Texto',
    number: 'Número',
    toggle: 'Interruptor', // O "Selector On/Off"
    select: 'Seleccionar',
    multiSelect: 'Selección múltiple',
  },
  promptVarEditor: {
    addVariable: 'Añadir variable',
  },
  pluginTypeBadge: {
    builtin: 'Integrado', // O "Interno"
    lobechat: 'LobeChat', // Mantener nombre propio
    gradio: 'Gradio', // Mantener nombre propio
    mcp: 'MCP', // Mantener si es un acrónimo técnico
  },
  textareaDialog: {
    cancel: 'Cancelar',
    confirm: 'Confirmar',
  },
  subscribeDialog: {
    title: 'Suscribirse al servicio de sincronización en la nube',
    duration: 'Duración de la suscripción (Meses)',
    priceCNY: 'Precio: ￥{price} / mes', // Mantener símbolo si es específico
    priceUSD: 'Precio: $ {price} / mes', // Mantener símbolo si es específico
    amountDue: 'Importe a pagar', // O "Total a pagar"
    paymentMethod: 'Método de pago',
    cancel: 'Cancelar',
    order: 'Realizar pedido', // O "Pedir", "Ordenar"
  },
  selectWorkspaceDialog: {
    selectWorkspace: 'Seleccionar espacio de trabajo',
    selectFolder: 'Seleccionar carpeta',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
  },
  selectFileBtn: {
    clickToSelect: 'Haz clic para seleccionar archivo',
    dragHere: 'Arrastra aquí',
    paste: 'O Ctrl+V para pegar',
  },
  viewFileDialog: {
    fileSize: 'Tamaño del archivo',
    fileType: 'Tipo de archivo',
    copy: 'Copiar',
    download: 'Descargar',
    ok: 'Aceptar',
  },
  varsInput: {
    addVariable: 'Añadir variable',
    variableName: 'Nombre de variable',
  },
  topupDialog: {
    title: 'Recargar servicio de modelos',
    amountCNY: 'Importe de recarga (Yuanes)', // Omitir Yuanes si no es relevante para el público español general
    amountUSD: 'Importe de recarga (USD)',
    amountCaption: 'Introduce un número entero entre 1 y 999',
    transactionFee: 'Comisión de transacción', // O "Tarifa de transacción"
    payableAmount: 'Total a pagar', // O "Total a pagar"
    cancel: 'Cancelar',
    order: 'Realizar pedido', // O "Recargar"
  },
  payMethodItem: {
    paymentMethod: 'Método de Pago',
    wxpay: 'WeChat Pay', // Mantener nombre propio
    stripe: 'Tarjeta bancaria', // "Stripe" es conocido, pero "Tarjeta Bancaria" es más genérico
  },
  toolContent: {
    toolCall: 'Llamada a herramienta',
    callParams: 'Parámetros de llamada',
    callResult: 'Resultado de llamada',
    errorMessage: 'Mensaje de error',
  },
  workspaceNav: {
    workspace: 'Espacio de trabajo',
    folder: 'Carpeta',
  },
  workspaceListSelect: {
    root: 'Directorio raíz',
  },
  workspaceListItem: {
    rename: 'Renombrar',
    changeIcon: 'Cambiar icono',
    newWorkspace: 'Nuevo espacio de trabajo',
    newFolder: 'Nueva carpeta',
    moveTo: 'Mover a',
    delete: 'Eliminar',
  },
  modelOptionsBtn: {
    modelOptions: 'Opciones del modelo',
    reasoningEffort: 'Nivel de profundidad de razonamiento',
    useSearchGrounding: 'Basar en búsqueda',
  },
  subproviderInput: {
    modelList: 'Lista de modelos',
  },
  getModelList: {
    getModelList: 'Obtener lista de modelos',
    selectModels: 'Seleccionar modelos',
    getModelListFailed: 'Falló la obtención de la lista de modelos',
  },
  modelDragSortDialog: {
    title: 'Arrastrar para ordenar',
    sortByName: 'Ordenar por nombre',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
  },
  searchDialog: {
    placeholder: 'Buscar mensajes...',
    noResults: 'No se encontraron resultados...',
    workspace: 'Espacio de trabajo',
    global: 'Global',
  },
  enablePluginsMenu: {
    moreInfo: 'Más información',
  },
}
