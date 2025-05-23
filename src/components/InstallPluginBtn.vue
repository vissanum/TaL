<template>
  <q-btn
    :label="
      store.availableIds.includes(id)
        ? $t('installPluginBtn.installed')
        : $t('installPluginBtn.install')
    "
    :disable="store.availableIds.includes(id)"
    :loading
    @click="installIt"
  />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { ref } from 'vue'
// import { useI18n } from 'vue-i18n'

import { useInstallPlugin } from 'src/composables/install-plugin'
import { usePluginsStore } from 'src/stores/plugins'
import { PluginManifest } from 'src/utils/types'

// const { t } = useI18n()

const props = defineProps<{
  id: string
  manifest: PluginManifest
}>()

const store = usePluginsStore()
const { install } = useInstallPlugin()
const loading = ref(false)
const $q = useQuasar()
async function installIt() {
  loading.value = true
  try {
    await install(props.manifest)
    // Posiblemente una notificación de éxito aquí si 'install' no la da
  } catch (err) {
    console.error(err)
    $q.notify({
      /* ... */
    })
  } finally {
    loading.value = false
  }
}
</script>
