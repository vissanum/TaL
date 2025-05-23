import { until } from '@vueuse/core'
import { onMounted, Ref } from 'vue'
import { useRoute } from 'vue-router'

function useLocateId(ready: Ref<unknown>) {
  const route = useRoute()
  onMounted(() => {
    until(ready)
      .toBeTruthy()
      .then(() => {
        route.hash && document.querySelector(route.hash)?.scrollIntoView()
        return null // Para promise/always-return
      })
      .catch((err) => {
        console.error('Error en until(ready).toBeTruthy():', err)
      })
  })
}

export { useLocateId }
