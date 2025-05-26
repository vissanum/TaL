<template>
  <audio v-if="url" :src="url" controls />
</template>

<script setup lang="ts">
import { toRef } from 'vue'

import { useFileURL } from 'src/composables/file-url'
import { StoredItem } from 'src/utils/types'

const props = defineProps<{
  audio: StoredItem
}>()

defineEmits(['remove'])

const url = useFileURL(toRef(props, 'audio'))
</script>
