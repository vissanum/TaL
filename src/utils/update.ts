import {
  check as tauriCheckUpdate,
  type Update as TauriUpdateManifest,
  type DownloadEvent,
} from '@tauri-apps/plugin-updater'
import { relaunch as tauriRelaunch } from '@tauri-apps/plugin-process'
import { fetch, IsTauri, TauriPlatform } from './platform-api' // IsWeb eliminado
import version from 'src/version.json'
import { Loading, Notify, type QNotifyAction } from 'quasar' // QNotifyAction se mantiene
import { i18n } from 'src/boot/i18n'
import { localData } from './local-data' // Se mantiene, se usará
import { invoke } from '@tauri-apps/api/core'

// TODO: TaL - Esta URL debe apuntar al repositorio de releases de TaL para la auto-actualización.
const BaseURL = 'https://github.com/NitroRCr/AIaW/releases/latest/download'
type Version = typeof version // Tipo para la estructura de tu version.json
const { t } = i18n.global // Mover aquí para que esté disponible para las funciones auxiliares

// --- Funciones Auxiliares (Definidas antes de su uso) ---
function wrapNotify(message: string, actions: QNotifyAction[]) {
  return Notify.create({
    message,
    actions: actions.map((a) => ({ ...a, textColor: 'inv-pri' })),
    color: 'inv-sur',
    textColor: 'inv-on-sur',
    position: 'top',
    timeout: 0,
    multiLine: true,
  })
}

function isUpdateIgnored(versionNum: string): boolean {
  return localData.ignoredUpdate === versionNum
}

function ignoreUpdate(versionNum: string): void {
  localData.ignoredUpdate = versionNum
}

// --- Lógica Principal de Actualización ---
async function tauriUpdate(latestVersionInfo: Version, force: boolean) {
  try {
    const currentOsPlatform = await TauriPlatform
    if (!currentOsPlatform) {
      console.error('Tauri update: Could not determine OS platform.')
      return
    }

    const isDeb =
      currentOsPlatform === 'linux' && (await invoke('is_deb_package'))
    const updateManifest: TauriUpdateManifest | null = await tauriCheckUpdate(
      isDeb ? { target: 'linux-deb' } : {}
    )

    if (!updateManifest) {
      return
    }

    if (force || !isUpdateIgnored(updateManifest.version)) {
      let downloadInProgress = false
      let totalSizeForProgress: number | undefined // Variable para almacenar el contentLength

      try {
        downloadInProgress = true
        Loading.show({ message: t('update.downloading', { progress: 0 }) })

        await updateManifest.download((event: DownloadEvent) => {
          switch (event.event) {
            case 'Started': {
              // Almacenamos el contentLength si está disponible
              totalSizeForProgress = event.data.contentLength
              Loading.show({
                message: t('update.downloading', { progress: 0 }),
              })
              // console.log('Download started. Content length (optional):', totalSizeForProgress);
              break
            }
            case 'Progress': {
              const progressData = event.data // data aquí es { chunkLength: number }
              let percent = 0

              // Usamos el totalSizeForProgress almacenado del evento 'Started'
              if (totalSizeForProgress && totalSizeForProgress > 0) {
                // chunkLength es el acumulado descargado hasta ahora según algunas implementaciones de updaters,
                // o el tamaño del chunk actual. La API de Tauri es un poco ambigua aquí sin ejemplos claros.
                // Si chunkLength es el total descargado, el cálculo es directo.
                // Si es el tamaño del chunk, necesitaríamos acumularlo nosotros mismos.
                // Asumiremos por ahora que chunkLength es el total acumulado por el evento Progress.
                // El plugin de Tauri es más probable que dé el total de bytes descargados en chunkLength aquí.
                percent = Math.round(
                  (progressData.chunkLength / totalSizeForProgress) * 100
                )
              } else {
                // Si no tenemos totalSizeForProgress, no podemos calcular un porcentaje exacto.
                // Podríamos mostrar un spinner indeterminado o solo los bytes descargados.
                // console.warn('Download progress: contentLength not available from "Started" event or zero.');
                // O podrías mostrar los bytes: message: t('update.downloadingBytes', { bytes: progressData.chunkLength })
              }

              Loading.show({
                message: t('update.downloading', { progress: percent }),
              })
              break
            }
            case 'Finished': {
              // console.log('Download finished.');
              break
            }
            default: {
              // console.log('Unknown download event:', event);
              break
            }
          }
        })

        downloadInProgress = false
        Loading.hide()

        wrapNotify(
          t('update.downloadedNewVersion', { version: updateManifest.version }),
          // ... (resto de la lógica de notificación y botones sin cambios) ...
          [
            {
              label: t('update.ignore'),
              handler: () => {
                ignoreUpdate(updateManifest.version)
              },
            },
            {
              label: t('update.installAndRelaunch'),
              handler: async () => {
                await updateManifest.install()
                await tauriRelaunch()
              },
            },
          ]
        )
      } catch (downloadError) {
        if (downloadInProgress) {
          Loading.hide()
        }
        console.error('Tauri update: Error during download.', downloadError)
        Notify.create({ type: 'negative', message: t('update.downloadError') })
      }
    } else {
      // console.log(`Tauri update: Update for manifest version ${updateManifest.version} is available but currently ignored or not forced.`);
    }
  } catch (error) {
    Loading.hide()
    console.error('Tauri update: Error during update process.', error)
    Notify.create({ type: 'negative', message: t('update.updateError') })
  }
}

async function checkUpdate() {
  if (!IsTauri) {
    return
  }
  try {
    const res = await fetch(`${BaseURL}/version.json`)
    if (!res.ok) {
      return
    }
    const latest: Version = await res.json()

    if (latest.versionCode <= version.versionCode) {
      return
    }
    const force = version.versionCode <= latest.forceUpdateFrom
    await tauriUpdate(latest, force)
  } catch (error) {
    console.error(
      'Update check: Error fetching or processing update information.',
      error
    )
  }
}

async function ready() {
  // console.log('Update "ready" function: No operations to perform after Capacitor removal.');
}

export { checkUpdate, ready }
