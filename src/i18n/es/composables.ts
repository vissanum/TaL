export default {
  firstVisit: {
    title: 'Bienvenido Tu asistente Local',
    messageWithLogin:
      'Para utilizar los modelos de IA, necesitas <b>configurar manualmente el proveedor de servicios</b>, o <b>iniciar sesión</b> para usar el servicio de modelos que proporcionamos. <br>Además, después de iniciar sesión, también puedes experimentar la sincronización en la nube en tiempo real entre dispositivos.',
    messageWithoutLogin:
      'Para utilizar los modelos de IA, necesitas <b>configurar manualmente el proveedor de servicios</b>',
    cancel: 'Configurar proveedor',
    ok: 'Iniciar sesión',
  },
  createDialog: {
    newDialog: 'Nuevo diálogo',
  },
  callApi: {
    argValidationFailed: 'Falló la validación de argumentos de la llamada',
    settingsValidationFailed:
      'Falló la validación de la configuración del plugin, por favor revisa la configuración del plugin',
  },
  order: {
    failure: 'Pedido fallido',
  },
  login: {
    register: 'Iniciar sesión / Registrarse',
    next: 'Siguiente',
    otp: 'Código OTP',
    enterOtp: 'Por favor, introduce el código OTP del correo de verificación',
    logout: 'Cerrar sesión',
    confirmLogout: '¿Estás seguro de que quieres cerrar sesión?',
    loggedIn: 'Sesión iniciada como: {email}',
  },
  installPlugin: {
    fetchFailed: 'Falló la obtención de la configuración del plugin: {message}',
    installFailed: 'Falló la instalación del plugin: {message}',
    formatError: 'Error de formato',
    unsupportedFormat: 'Formato de plugin no soportado',
  },
  workspace: {
    newWorkspace: 'Nuevo espacio de trabajo',
    name: 'Nombre',
    create: 'Crear',
    defaultAssistant: 'Asistente predeterminado',
    newFolder: 'Nueva carpeta',
    rename: 'Renombrar',
    deleteWorkspace: 'Eliminar espacio de trabajo',
    deleteFolder: 'Eliminar carpeta',
    confirmDeleteWorkspace:
      '¿Estás seguro de que quieres eliminar el espacio de trabajo "{name}"? Todas las conversaciones y asistentes dentro de él serán eliminados',
    confirmDeleteFolder:
      '¿Estás seguro de que quieres eliminar la carpeta "{name}"? Todos los espacios de trabajo dentro de ella serán eliminados',
    delete: 'Eliminar',
  },
  subscriptionNotify: {
    evalExpired:
      'La prueba de sincronización en la nube ha expirado, puedes elegir suscribirte',
    evalExpiring:
      'La prueba de sincronización en la nube está a punto de expirar, puedes elegir suscribirte',
    prodExpired: 'Tu suscripción de sincronización en la nube ha expirado',
    prodExpiring:
      'Tu suscripción de sincronización en la nube está a punto de expirar',
    renewal: 'Renovar',
    subscribe: 'Suscribirse',
  },
}
