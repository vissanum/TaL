import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'
import { Quasar } from 'quasar'
import type { QuasarLanguage } from 'quasar'
import { watch, Ref } from 'vue'
import { localData } from 'src/utils/local-data'

export type MessageLanguages = keyof typeof messages
export type MessageSchema = (typeof messages)['en']

declare module 'vue-i18n' {
  // Define el esquema global de mensajes para el autocompletado y la seguridad de tipos
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefineLocaleMessage extends MessageSchema {}

  // Puedes definir aquí también formatos de fecha/hora y número si los usas
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefineDateTimeFormat {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefineNumberFormat {}
}

const quasarLangList = import.meta.glob(
  '../../node_modules/quasar/lang/(es|en-US).js'
)

export type AppSupportedLang = 'es' | 'en'
const appLanguages: AppSupportedLang[] = ['es', 'en']

function getLanguage(): AppSupportedLang {
  const storedLang = localData.language as AppSupportedLang | null | undefined

  // Si 'Auto' (null) está explícitamente seleccionado o no hay nada almacenado, detectar.
  if (storedLang === null || storedLang === undefined) {
    const browserLang = navigator.language
    if (browserLang.startsWith('es')) {
      return 'es'
    }
    // No es necesario 'else if (browserLang.startsWith('en'))' aquí si 'en' es el fallback
    // de la detección. Pero para claridad, podemos mantenerlo.
    if (browserLang.startsWith('en')) {
      return 'en'
    }
    return 'es' // Fallback de detección por defecto a español
  }

  // Si un idioma específico ('es' o 'en') está almacenado, y es soportado.
  if (appLanguages.includes(storedLang)) {
    return storedLang
  }

  // Si hay un valor antiguo como 'en-US' u otro no soportado, aplicar fallback.
  // Esto es más un saneamiento por si acaso. Con el UI corregido, no debería ocurrir.
  console.warn(
    `Valor de idioma inesperado en localData: ${storedLang}, aplicando fallback a 'es'.`
  )
  return 'es'
}

const currentAppLanguage = getLanguage() // Se llama al inicio

const i18n = createI18n({
  locale: currentAppLanguage,
  fallbackLocale: 'en',
  legacy: false,
  messages,
})

async function setQuasarLang(appLang: AppSupportedLang) {
  let quasarLangToLoad = ''
  if (appLang === 'es') {
    quasarLangToLoad = 'es'
  } else if (appLang === 'en') {
    quasarLangToLoad = 'en-US'
  }

  if (quasarLangToLoad) {
    const path = `../../node_modules/quasar/lang/${quasarLangToLoad}.js`
    try {
      const langModule = (await quasarLangList[path]()) as {
        default: QuasarLanguage
      }
      if (langModule && langModule.default) {
        Quasar.lang.set(langModule.default)
      } else {
        console.error(
          `El paquete de idioma de Quasar para ${quasarLangToLoad} tiene una estructura inesperada.`
        )
      }
    } catch (err) {
      console.error(
        `Falló la carga del paquete de idioma de Quasar para ${quasarLangToLoad}:`,
        err
      )
    }
  }
}

setQuasarLang(currentAppLanguage)

export { i18n }

export default boot(({ app }) => {
  watch(
    () => localData.language, // Observa la propiedad reactiva 'language' de localData
    async (newLangParam) => {
      const newLangValue = newLangParam as AppSupportedLang | null | undefined

      let langToSet: AppSupportedLang

      if (newLangValue === null || newLangValue === undefined) {
        // Si es 'Auto' o no definido
        langToSet = getLanguage() // Re-ejecuta la detección (que considerará navigator.language)
      } else if (appLanguages.includes(newLangValue)) {
        // Si es 'es' o 'en'
        langToSet = newLangValue
      } else {
        // Caso inesperado, podría ser un valor antiguo como 'en-US'.
        // Forzamos una re-evaluación o aplicamos un default.
        console.warn(
          `Valor de idioma no soportado o inesperado recibido del selector: ${newLangValue}. Re-evaluando.`
        )
        langToSet = getLanguage()
      }

      // Aplicar el idioma determinado
      const globalLocale = i18n.global.locale as Ref<AppSupportedLang>
      if (globalLocale.value !== langToSet) {
        // Solo actualiza si realmente hay un cambio
        globalLocale.value = langToSet
        await setQuasarLang(langToSet)
        // Considera si necesitas forzar un refresco de componentes o de la página
        // si Quasar o componentes complejos no se actualizan completamente.
        // Por ahora, intentaremos sin location.reload().
        // Si la versión .deb funcionaba y usaba reload, podría ser necesario aquí también
        // si la actualización dinámica no es perfecta.
        // console.log('Idioma cambiado a:', langToSet, 'Considera refrescar si hay problemas.')
        // Si en la versión .deb funcionaba y hacía reload, es posible que esta línea
        // (que teníamos comentada) sea la clave para una actualización completa y fiable:
        // location.reload();
      }
    }
  )
  app.use(i18n)
})
