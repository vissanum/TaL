<template>
  <a
    v-if="providerType?.getModelList"
    pri-link
    href="javascript:void(0)"
    @click="getModelList"
  >
    {{ $t('getModelList.getModelList') }}
  </a>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useProvidersStore } from 'src/stores/providers'
import { Provider } from 'src/utils/types'
import { dialogOptions } from 'src/utils/values'

const props = defineProps<{
  provider: Provider
}>()

const models = defineModel<string[]>()

const $q = useQuasar()
const { t } = useI18n()

const providersStore = useProvidersStore()

const providerType = computed(() =>
  providersStore.providerTypes.find((pt) => pt.name === props.provider?.type)
)

function getModelList() {
  providerType.value
    .getModelList(props.provider.settings)
    .then((modelList) => {
      $q.dialog({
        title: t('getModelList.selectModels'),
        options: {
          type: 'checkbox',
          model: models.value.filter((m) => modelList.includes(m)),
          items: modelList.sort().map((m) => ({ label: m, value: m })),
        },
        cancel: true,
        ...dialogOptions,
      }).onOk((val) => {
        models.value = val
      })
      return null // Para promise/always-return
    })
    // Similar al anterior, la promesa original de .getModelList() también necesita un .catch
    .catch((err) => {
      console.error('Error obteniendo lista de modelos:', err)
      $q.notify({ message: 'Error al cargar modelos', color: 'negative' })
    })
}
</script>
