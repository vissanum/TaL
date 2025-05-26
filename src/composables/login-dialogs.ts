import { useObservable } from '@vueuse/rxjs'
import { useQuasar } from 'quasar'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { DexieDBURL } from 'src/utils/config'
import { db } from 'src/utils/db'
import { dialogOptions } from 'src/utils/values'


export function useLoginDialogs() {
  if (!DexieDBURL) return
  const userInteraction = useObservable(db.cloud.userInteraction)
  const user = useObservable(db.cloud.currentUser)
  const $q = useQuasar()
  const { t } = useI18n()
  let loginNotify = false

  watch(userInteraction, (interaction) => {
    if (!interaction) return
    if (interaction.type === 'email') {
      $q.dialog({
        title: t('login.register'),
        prompt: {
          model: '',
          type: 'email',
          label: 'Email',
        },
        cancel: true,
        ok: t('login.next'),
        noRouteDismiss: true,
        ...dialogOptions,
      }).onOk((email) => {
        interaction.onSubmit({ email })
      })
    } else if (interaction.type === 'otp') {
      $q.dialog({
        title: t('login.otp'),
        message: t('login.enterOtp'),
        prompt: {
          model: '',
          type: 'text',
          label: t('login.otp'),
        },
        cancel: true,
        persistent: true,
        noRouteDismiss: true,
        ...dialogOptions,
      })
        .onOk((otp) => {
          interaction.onSubmit({ otp })
          loginNotify = true
        })
        .onCancel(() => {
          interaction.onCancel()
        })
    } else if (interaction.type === 'logout-confirmation') {
      $q.dialog({
        title: t('login.logout'),
        message: t('login.confirmLogout'),
        cancel: true,
        ok: t('login.logout'),
        persistent: true,
        ...dialogOptions,
      })
        .onOk(() => {
          interaction.onSubmit({})
        })
        .onCancel(() => {
          interaction.onCancel()
        })
    } else if (interaction.type === 'message-alert') {
      for (const alert of interaction.alerts) {
        $q.notify({
          message: alert.message,
          color: alert.type === 'info' ? undefined : 'negative',
        })
      }
    }
  })
  watch(
    () => user.value.isLoggedIn,
    (isLoggedIn) => {
      isLoggedIn &&
        loginNotify &&
        $q.notify(t('login.loggedIn', { email: user.value.email }))
      loginNotify = false
    }
  )
}
