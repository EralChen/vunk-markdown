<script lang="ts" setup>
import type { __VkMarkdown } from '@vunk-markdown/components/markdown'
import type { PropType } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  token: {
    type: Object as PropType<__VkMarkdown.BasicToken>,
    required: true,
  },
})
const attributes = computed(() => {
  const attrs = props.token.attrs || []
  const attrsObj: Record<string, string> = {}
  attrs.forEach(([key, value]) => {
    attrsObj[key] = value
  })
  return attrsObj
})
</script>

<template>
  <img
    v-bind="attributes"
    :alt="token.content ?? attributes.alt ?? ''"
  />
</template>
