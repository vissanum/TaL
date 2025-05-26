import { execSync } from 'child_process'
import os from 'os'

const Colors = {
  Off: '\x1b[0m',
  Green: '\x1b[32m',
  Red: '\x1b[31m',
  Yellow: '\x1b[33m',
}

function printCheck(toolName, status, versionInfo = '', details = '') {
  const statusColor =
    status === 'OK'
      ? Colors.Green
      : status === 'FALLO' || status === 'NO ENCONTRADO'
        ? Colors.Red
        : Colors.Yellow
  let message = `${toolName.padEnd(30, ' ')}${statusColor}${status}${Colors.Off}`
  if (versionInfo) {
    message += ` (Versión: ${versionInfo})`
  }
  if (details) {
    message += ` - ${details}`
  }
  console.log(message)
}

function checkCommand(toolName, command, versionRegex = null) {
  try {
    const rawOutput = execSync(command, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    let version = rawOutput

    if (toolName.includes('Git') && rawOutput.startsWith('git version')) {
      version = rawOutput.split(' ')[2]
    } else if (
      toolName.includes('Node.js (actual)') &&
      rawOutput.startsWith('v')
    ) {
      version = rawOutput.substring(1)
    } else if (toolName.includes('pnpm') && /^\d+\.\d+\.\d+/.test(rawOutput)) {
      version = rawOutput.match(/^\d+\.\d+\.\d+/)[0]
    } else if (
      toolName.includes('Rust (rustc)') &&
      rawOutput.startsWith('rustc')
    ) {
      version = rawOutput.split(' ')[1]
    } else if (
      toolName.includes('Rust (cargo)') &&
      rawOutput.startsWith('cargo')
    ) {
      version = rawOutput.split(' ')[1]
    } else if (
      toolName.includes('Rust (rustfmt)') &&
      rawOutput.startsWith('rustfmt')
    ) {
      const match = rawOutput.match(/^rustfmt\s+([\d.]+-[a-zA-Z]+)/)
      if (match) version = match[1]
      else version = rawOutput.split(' ')[1]
    } else if (
      toolName.includes('Tauri CLI') &&
      rawOutput.includes('tauri-cli')
    ) {
      const match = rawOutput.match(/tauri-cli\s+(\d+\.\d+\.\d+)/)
      if (match) version = match[1]
      else version = rawOutput
    }

    if (versionRegex && !new RegExp(versionRegex).test(version)) {
      printCheck(toolName, 'FALLO', version, `No cumple regex: ${versionRegex}`)
      return false
    }

    printCheck(toolName, 'OK', version)
    return true
  } catch (_error) {
    // console.error(`Error ejecutando ${command}: ${error.stderr || error.message}`); // Para depuración
    printCheck(toolName, 'NO ENCONTRADO')
    return false
  }
}

function checkNvm() {
  const toolName = 'Node.js (nvm)'
  try {
    const command = 'bash -ic \'. "$NVM_DIR/nvm.sh" && nvm --version\''
    const rawOutput = execSync(command, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    const versionMatch = rawOutput.match(/\d+\.\d+\.\d+/)
    const versionToDisplay = versionMatch ? versionMatch[0] : rawOutput
    printCheck(toolName, 'OK', versionToDisplay)
    return true
  } catch (_error) {
    if (process.env.NVM_DIR) {
      printCheck(
        toolName,
        'POTENCIALMENTE OK',
        `NVM_DIR=${process.env.NVM_DIR}`,
        "No se pudo ejecutar 'nvm --version' directamente."
      )
      return true
    }
    printCheck(
      toolName,
      'NO DETECTADO',
      '',
      "Prueba 'nvm --version' manualmente o asegura que NVM_DIR está en el entorno del script."
    )
    return false
  }
}

function checkDpkgPackage(packageName) {
  const toolName = packageName
  if (os.platform() !== 'linux') {
    return true
  }
  try {
    execSync(
      `dpkg-query -W -f='\${Status}' ${packageName} 2>/dev/null | grep -q "install ok installed"`,
      { encoding: 'utf8', stdio: 'ignore' }
    )
    printCheck(toolName, 'OK', 'Instalado')
    return true
  } catch (_error) {
    printCheck(
      toolName,
      'NO ENCONTRADO',
      '',
      'No instalado o no es un sistema basado en dpkg'
    )
    return false
  }
}

console.log('Verificando el entorno de desarrollo para TaL...')
console.log('-------------------------------------------------')

// Asegurarse de que pnpm se ejecute desde el directorio correcto si es necesario
// Para comandos generales como git, node, rustc, el CWD no debería importar tanto.
// Para `pnpm tauri --version`, sí podría importar si `pnpm` no está global y se basa en el `package.json` local.
// Sin embargo, `execSync` por defecto hereda el CWD del proceso padre (este script).

checkCommand('Git', 'git --version', '^2\\.')
checkNvm()
checkCommand('Node.js (actual)', 'node --version', '^20\\.')
checkCommand('pnpm', 'pnpm --version', '^10\\.')
checkCommand('Rust (rustc)', 'rustc --version', '^1\\.(8[6-9]|[9-9]\\d*)\\.')
checkCommand('Rust (cargo)', 'cargo --version', '^1\\.(8[6-9]|[9-9]\\d*)\\.')
checkCommand('Rust (cargo)', 'cargo --version', '^1\\.(8[6-9]|[9-9]\\d*)\\.')
checkCommand('Rust (rustfmt)', 'rustfmt --version', '^1\\.')

console.log('-------------------------------------------------')
console.log(
  'Verificando herramientas específicas de Tauri (desde el directorio del proyecto)...'
)
// El script se debe ejecutar desde la raíz del proyecto para que `pnpm tauri` funcione correctamente.
checkCommand('Tauri CLI (via pnpm)', 'pnpm tauri --version', '^2\\.')

console.log('-------------------------------------------------')
console.log('Verificando dependencias de sistema Linux (si aplica)...')
if (os.platform() === 'linux') {
  checkDpkgPackage('libwebkit2gtk-4.1-dev')
  checkDpkgPackage('build-essential')
  checkDpkgPackage('curl')
  checkDpkgPackage('wget')
  checkDpkgPackage('libssl-dev')
  checkDpkgPackage('libgtk-3-dev')
  checkDpkgPackage('librsvg2-dev')
  checkDpkgPackage('patchelf')
  // checkDpkgPackage("libayatana-appindicator3-dev"); // Mantener comentado por ahora
} else {
  console.log(
    'No es Linux, omitiendo chequeo de dependencias de sistema Linux.'
  )
}

console.log('-------------------------------------------------')
console.log('Verificación completada.')
console.log(
  "Nota: 'FALLO' o 'NO ENCONTRADO' indica una posible discrepancia o ausencia."
)
