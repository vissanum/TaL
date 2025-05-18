import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

// Equivalente a __dirname en módulos ES para una correcta resolución de rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function updateVersions() {
  try {
    // 1. Leer la versión maestra desde src/version.json
    const versionJsonPath = path.resolve(__dirname, '../src/version.json')
    const versionData = JSON.parse(await fs.readFile(versionJsonPath, 'utf-8'))
    const newVersion = versionData.version.replace(/^v/, '') // Eliminar prefijo 'v' si existe

    console.log(`Sincronizando a la versión: ${newVersion} (desde ${versionData.version} en src/version.json)`)

    // 2. Actualizar 'src-tauri/tauri.conf.json'
    //    NOTA: Este nombre podría cambiar a tauri.conf.jsonc con Tauri v2.
    const tauriConfigPath = path.resolve(__dirname, '../src-tauri/tauri.conf.json')
    try {
      const tauriConfigContent = await fs.readFile(tauriConfigPath, 'utf-8')
      const tauriConfig = JSON.parse(tauriConfigContent)
      if (tauriConfig.version !== newVersion) {
        tauriConfig.version = newVersion
        await fs.writeFile(tauriConfigPath, JSON.stringify(tauriConfig, null, 2) + '\n')
        console.log(`Actualizado ${path.basename(tauriConfigPath)} a la versión ${newVersion}`)
      } else {
        console.log(`${path.basename(tauriConfigPath)} ya está en la versión ${newVersion}. No se requieren cambios.`)
      }
    } catch (e) {
      if (e.code === 'ENOENT') {
        console.warn(`ADVERTENCIA: ${tauriConfigPath} no encontrado. Omitiendo actualización. Esto podría ser esperado si se migra a tauri.conf.jsonc.`)
      } else {
        // Re-lanzar otros errores para no ocultar problemas inesperados
        throw new Error(`Error procesando ${tauriConfigPath}: ${e.message}`)
      }
    }

    // 3. Actualizar 'package.json'
    const packageJsonPath = path.resolve(__dirname, '../package.json')
    const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8')
    const packageJson = JSON.parse(packageJsonContent)
    if (packageJson.version !== newVersion) {
      packageJson.version = newVersion
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')
      console.log(`Actualizado ${path.basename(packageJsonPath)} a la versión ${newVersion}`)
    } else {
      console.log(`${path.basename(packageJsonPath)} ya está en la versión ${newVersion}. No se requieren cambios.`)
    }

    // 4. Actualizar 'src-tauri/Cargo.toml'
    const cargoTomlPath = path.resolve(__dirname, '../src-tauri/Cargo.toml')
    let cargoTomlContent = await fs.readFile(cargoTomlPath, 'utf-8')

    // Regex para encontrar 'version = "x.y.z"' directamente bajo la sección [package]
    // Esto es más específico para evitar cambiar versiones de dependencias por error.
    const cargoPackageVersionRegex = /(\[package\](?:.|\n)*?version\s*=\s*")[^"]*(")/

    if (cargoPackageVersionRegex.test(cargoTomlContent)) {
      const currentCargoVersionMatch = cargoTomlContent.match(cargoPackageVersionRegex)
      // El grupo 2 del match anterior ($2) sería la versión actual, pero necesitamos el contenido antes de la versión ($1) y después ($3)
      // Mejor, construimos el nuevo contenido buscando el valor de la version
      const currentCargoVersion = currentCargoVersionMatch[0].match(/version\s*=\s*"([^"]*)"/)[1]

      if (currentCargoVersion !== newVersion) {
        cargoTomlContent = cargoTomlContent.replace(cargoPackageVersionRegex, `$1${newVersion}$2`)
        await fs.writeFile(cargoTomlPath, cargoTomlContent)
        console.log(`Actualizado ${path.basename(cargoTomlPath)} [package] de la versión ${currentCargoVersion} a ${newVersion}`)
      } else {
        console.log(`${path.basename(cargoTomlPath)} [package] ya está en la versión ${newVersion}. No se requieren cambios.`)
      }
    } else {
      console.warn(`ADVERTENCIA: No se encontró la entrada 'version' bajo '[package]' en ${cargoTomlPath}. Omitiendo actualización de Cargo.toml.`)
    }

    console.log('\nInformación de versión (relevante para escritorio) sincronizada correctamente!')
  } catch (error) {
    console.error('Error actualizando versiones:', error)
    process.exit(1) // Salir con código de error para que falle en CI/CD si es necesario
  }
}

updateVersions()
