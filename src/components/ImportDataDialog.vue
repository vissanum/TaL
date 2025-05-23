<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card min-w="320px">
      <q-card-section>
        <div class="text-h6">
          {{ $t('importDataDialog.title') }}
        </div>
      </q-card-section>
      <q-card-section py-0 px-2>
        <div px-2>
          <q-file
            v-model="file"
            :label="$t('importDataDialog.fileLabel')"
            dense
          />
        </div>
        <div my-2>
          <q-checkbox
            v-model="options.overwrite"
            :label="$t('importDataDialog.overwrite')"
          /><br />
          <q-checkbox
            v-model="options.force"
            :label="$t('importDataDialog.force')"
          /><br />
          <q-checkbox
            color="err"
            v-model="options.clear"
            :label="$t('importDataDialog.clear')"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          color="primary"
          :label="$t('importDataDialog.cancel')"
          @click="onDialogCancel"
        />
        <q-btn
          flat
          color="primary"
          :label="$t('importDataDialog.import')"
          :loading
          :disable="!file"
          @click="importData"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { importInto } from 'dexie-export-import'
import { useDialogPluginComponent, useQuasar } from 'quasar'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { db } from 'src/utils/db'

const { t } = useI18n()
const file = ref<File>(null)

const options = reactive({
  overwrite: true,
  force: false,
  clear: false,
})

defineEmits([...useDialogPluginComponent.emits])

const $q = useQuasar()
const loading = ref(false)
async function importData() {
  loading.value = true
  try {
    await importInto(db, file.value, {
      acceptMissingTables: options.force, // Usar options.force
      acceptVersionDiff: options.force, // Usar options.force
      overwriteValues: options.overwrite, // Usar options.overwrite
      clearTablesBeforeImport: options.clear, // Usar options.clear
    })
    $q.notify({
      message: t('importDataDialog.importSuccess'), // t() aquí
      color: 'positive',
    })
    onDialogOK()
  } catch (e) {
    console.error(e)
    $q.notify({
      message: t('importDataDialog.importFailed', { message: e.message }), // t() aquí
      color: 'negative',
    })
  } finally {
    loading.value = false
  }
}

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent()
</script>
