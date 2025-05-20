// Imports de Tauri y relacionados (se mantienen)
import { fetch as tauriFetch } from './tauri-stream'
import { readText as tauriClipboardReadText } from '@tauri-apps/plugin-clipboard-manager' // Renombrado para evitar colisión
import { platform as tauriNativePlatform } from '@tauri-apps/plugin-os' // Renombrado para evitar colisión

// Imports de Quasar/Web (se mantienen)
import { exportFile as webExportFile } from 'quasar'

// Imports de Capacitor eliminados

// --- Definiciones de Plataforma ---
export const IsTauri = '__TAURI_INTERNALS__' in window
export const IsCapacitor = false // Capacitor ha sido eliminado del proyecto TaL
export const IsWeb = !IsTauri // Simplificado, ya que IsCapacitor es siempre false

// TauriPlatform:
// La función platform() de @tauri-apps/plugin-os devuelve Promise<string>.
// Para un uso síncrono como se veía en update.ts, esto requerirá un manejo asíncrono
// o cargar el valor al inicio de la app. Por ahora, mantenemos la estructura original
// pero somos conscientes de que 'tauriNativePlatform()' es una Promesa.
// Esto probablemente necesite ajuste en los archivos que lo consumen si esperan un string síncrono.
export const TauriPlatform = IsTauri ? tauriNativePlatform() : undefined

// --- Funciones dependientes de la Plataforma ---
export const fetch = IsTauri ? tauriFetch : window.fetch.bind(window)

export async function clipboardReadText(): Promise<string> {
  if (IsTauri) {
    return await tauriClipboardReadText()
  } else {
    // IsWeb
    if (navigator.clipboard && navigator.clipboard.readText) {
      try {
        return await navigator.clipboard.readText()
      } catch (err) {
        console.error('Failed to read clipboard from web context:', err)
        // Para TaL, podríamos querer lanzar un error personalizado o devolver un string vacío
        // según cómo se manejen los errores en el resto de la aplicación.
        return ''
      }
    }
    console.warn(
      'Clipboard API not available or not permitted in this web context.'
    )
    return '' // O lanzar un error
  }
}

// PublicOrigin: Se cambia el valor específico de AIaW por uno más neutral para Tauri.
// El propósito exacto de esta constante en AIaW necesitaría ser revisado si se mantiene a largo plazo.
export const PublicOrigin = IsTauri ? 'tauri://localhost' : location.origin

export async function exportFile(
  filename: string,
  data: Blob | string | ArrayBuffer
) {
  // La lógica de Capacitor ha sido eliminada.
  // webExportFile es de Quasar. Su signatura de retorno puede variar.
  // Si se espera una Promise, y webExportFile no la devuelve, habrá que envolverla o ajustarla.
  // Por ahora, nos centramos en la eliminación de la lógica de Capacitor.
  try {
    // Quasar.exportFile puede devolver boolean o void dependiendo de la plataforma/éxito.
    // Lo dejamos así y si hay errores de tipo en el consumidor, se ajusta allí.
    webExportFile(filename, data)
  } catch (error) {
    console.error('Failed to export file using webExportFile:', error)
    // Considerar lanzar un error específico de TaL
    throw error
  }
}
