<template>
  <q-avatar>
    <img v-if="url" :src="url" />
  </q-avatar>
</template>

<script setup lang="ts">
import { toRef } from 'vue'

import { useAvatarImage } from 'src/composables/avatar-image'

const props = defineProps<{
  id: string
}>()

const url = useAvatarImage(toRef(props, 'id'))
</script>
