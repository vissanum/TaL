<template><div /></template>

<script setup lang="ts">
import { Validator } from '@cfworker/json-schema'
import { until } from '@vueuse/core'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useOpenLastWorkspace } from 'src/composables/open-last-workspace'
import { useUserPerfsStore } from 'src/stores/user-perfs'
import { ProviderSchema } from 'src/utils/types'

const route = useRoute()
const userPerfsStore = useUserPerfsStore()
const $q = useQuasar()
const { t } = useI18n()

const { openLastWorkspace } = useOpenLastWorkspace()

until(() => userPerfsStore.ready)
  .toBeTruthy()
  .then(() => {
    try {
      const provider = JSON.parse(route.query.provider as string)
      if (!new Validator(ProviderSchema).validate(provider)) {
        throw new Error('Invalid provider schema')
      }
      const bak = userPerfsStore.perfs.provider
      userPerfsStore.perfs.provider = provider
      $q.notify({
        message: t('setProviderPage.providerSet', {
          baseURL: provider.settings.baseURL,
        }),
        color: 'positive',
        actions: [
          {
            label: t('setProviderPage.restore'),
            handler: () => {
              userPerfsStore.perfs.provider = bak
            },
            color: 'white',
          },
        ],
        timeout: 6000,
      })
    } catch (e) {
      console.error(e)
      $q.notify({
        message: t('setProviderPage.providerSetFailed'),
        color: 'negative',
      })
    } finally {
      openLastWorkspace()
    }
    return null // Para promise/always-return
  })
  .catch((err) => {
    console.error(
      'Error en until(() => userPerfsStore.ready).toBeTruthy():',
      err
    )
    // Manejo de error para la promesa `until`
    $q.notify({
      message: 'Error inicializando la página de proveedor.',
      color: 'negative',
    })
  })
</script>
