import { Ref, ref, watch } from 'vue'

import { db } from 'src/utils/db'
import { AvatarImage } from 'src/utils/types'

import { useFileURL } from './file-url'

export function useAvatarImage(imageId: Ref<string>) {
  const image = ref<AvatarImage>(null)
  watch(
    imageId,
    (to) => {
      if (to) {
        db.avatarImages
          .get(to)
          .then((i) => {
            image.value = i
            return null // Para promise/always-return
          })
          .catch((err) => {
            console.error(`Error obteniendo avatarImage para id ${to}:`, err)
            image.value = null // O manejar el estado de error como sea apropiado
          })
      } else {
        image.value = null
      }
    },
    { immediate: true }
  )
  return useFileURL(image)
}
