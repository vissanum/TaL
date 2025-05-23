// src/utils/tauri-stream.ts

import { invoke } from '@tauri-apps/api/core'
import { listen, UnlistenFn } from '@tauri-apps/api/event' // Importar UnlistenFn

import { IsTauri } from './platform-api'

type ResponseEvent = {
  id: number
  payload: {
    request_id: number
    status?: number
    chunk?: number[]
  }
}

type StreamResponse = {
  request_id: number
  status: number
  status_text: string
  headers: Record<string, string>
}

// Convertir la función principal a async
export async function fetch(
  url: string,
  options?: RequestInit
): Promise<Response> {
  if (!IsTauri) return window.fetch(url, options)

  const {
    signal,
    method = 'GET',
    headers: _headers = {},
    body = [],
  } = options || {}

  let unlisten: UnlistenFn | undefined // Usar tipo UnlistenFn
  // let setRequestId: Function | undefined; // No necesitaremos setRequestId con async/await para el ID
  // const requestIdPromise = new Promise((resolve) => (setRequestId = resolve)); // Reemplazado

  const ts = new TransformStream()
  const writer = ts.writable.getWriter()
  let requestId: number | null = null

  let closed = false
  const closeStream = async () => {
    // Renombrado para claridad y hecho async
    if (closed) return
    closed = true
    if (unlisten) {
      unlisten()
    }
    try {
      await writer.ready // Esperar a que esté listo
      await writer.close()
    } catch (e) {
      console.error('Error closing writer:', e)
    }
  }

  if (signal) {
    signal.addEventListener('abort', () => closeStream())
  }

  try {
    // 1. Invocar 'stream_fetch' y obtener la respuesta inicial con el request_id
    const initialResponse: StreamResponse = await invoke('stream_fetch', {
      method: method.toUpperCase(),
      url,
      headers: {
        // Asegurar que headers sea Record<string, string>
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
        'User-Agent': navigator.userAgent,
        ...Object.fromEntries(new Headers(_headers || {}).entries()), // Convertir Headers a Record
      },
      body:
        typeof body === 'string'
          ? Array.from(new TextEncoder().encode(body))
          : Array.isArray(body)
            ? body
            : [], // Asegurar que el body es un array si no es string
    })

    requestId = initialResponse.request_id
    // setRequestId?.(initialResponse.request_id); // Ya no es necesario

    // 2. Escuchar eventos de stream
    // El listen retorna una promesa que resuelve a la función unlisten
    unlisten = await listen('stream-response', (event: ResponseEvent) => {
      // No necesitamos requestIdPromise.then aquí con async/await
      if (requestId === null) return // Asegurarse que requestId está seteado

      const { request_id: rid, chunk, status } = event?.payload || {}
      if (requestId !== rid) {
        return
      }

      if (chunk) {
        writer.ready
          .then(() => writer.write(new Uint8Array(chunk)))
          .catch((e) => console.error('Error writing chunk to stream:', e)) // Manejar error de escritura
      } else if (status === 0) {
        // end of body
        closeStream()
      }
    })

    const response = new Response(ts.readable, {
      status: initialResponse.status,
      statusText: initialResponse.status_text,
      headers: initialResponse.headers,
    })

    if (initialResponse.status >= 300) {
      // setTimeout(closeStream, 100); // Opcional, o cerrar directamente si es un error
      // Podríamos querer cerrar el stream si hay un error HTTP inmediato
      await closeStream() // o simplemente dejar que el consumidor maneje el error de status
    }
    return response
  } catch (error) {
    // Si invoke falla o cualquier otro await antes de retornar la Response.
    console.error('Error in tauri-stream fetch:', error)
    await closeStream() // Asegurarse de limpiar en caso de error temprano
    // Re-lanzar o retornar una Response de error según la necesidad
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(String(error))
  }
}
