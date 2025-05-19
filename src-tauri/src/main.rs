// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    // Corregir el PATH primero, puede ser importante para encontrar ejecutables
    // si alguna variable de entorno dependiera de ello.
    if let Err(e) = fix_path_env::fix() {
        eprintln!("Error al intentar corregir el PATH: {:?}", e);
        // Considerar si se debe continuar o no en caso de error aquí.
        // Para la mayoría de los casos, es probable que se pueda continuar.
    }

    // Cargar variables de entorno desde un archivo .env
    match dotenvy::dotenv() {
        Ok(path) => {
            println!("Variables de entorno cargadas desde: {:?}", path);
        }
        Err(e) => {
            if cfg!(debug_assertions) {
                eprintln!("Advertencia: No se pudo cargar el archivo .env: {:?}. Usando variables de entorno del sistema/por defecto.", e);
            }
        }
    }

    // Ejemplo de cómo podrías leer una variable (esto iría en tu lógica de app_lib o configuración)
    // let api_key = std::env::var("OPENAI_API_KEY").unwrap_or_else(|_| "clave_por_defecto_o_vacia".to_string());
    // println!("Clave API OpenAI (ejemplo): {}", api_key);

    app_lib::run();
}
