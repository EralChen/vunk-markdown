<script lang="ts" setup>
import type { __VkMarkdown } from '@vunk/markdown'
import type { MarkdownExit } from 'markdown-exit'
import type { PropType } from 'vue'
import { ref, watch } from 'vue'

const props = defineProps({
  md: {
    type: Object as PropType<MarkdownExit>,
    required: true,
  },
  token: {
    type: Object as PropType<__VkMarkdown.BasicToken>,
    required: true,
  },
})

const data = ref('')

watch(() => props.token.content, () => {
  props.md.renderer.renderAsync([props.token], props.md.options).then((res) => {
    data.value = res
  }).catch((err) => {
    console.warn('FenceRender renderAsync error', err)
  })
}, { immediate: true })
</script>

<template>
  <div v-html="data"></div>
</template>
