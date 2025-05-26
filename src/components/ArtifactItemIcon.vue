<template>
  <q-icon :name="icon" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Artifact } from 'src/utils/types'
import { codeExtensions } from 'src/utils/values'

const props = defineProps<{
  artifact: Artifact
}>()

const icon = computed(() =>
  codeExtensions.includes(props.artifact.name.split('.').pop())
    ? 'sym_o_code'
    : 'sym_o_description'
)
</script>
