<script lang="ts">
import { VkRenderer } from '@vunk-markdown/components/strategy-renderer'
import { VkTemplatesDefault } from '@vunk-markdown/components/templates-default'
import { consola } from 'consola'
import MarkdownIt from 'markdown-it'
import { computed, defineComponent, watchEffect } from 'vue'
import { emits, props } from './ctx'
import { tokensToTree } from './utils'

export default defineComponent({
  name: 'VkMarkdown',
  components: {
    VkRenderer,
    VkTemplatesDefault,
  },
  props,
  emits,
  setup (props, { expose }) {
    const md = MarkdownIt({})
    const items = computed(() => tokensToTree(
      md.parse(props.source, {}),
    ))

    watchEffect(() => {
      consola.log('Markdown tokens:', items.value)
    })

    expose({})

    return {
      items,
    }
  },
})
</script>

<template>
  <VkRenderer :source="items">
    <template #placeholder>
      <VkTemplatesDefault />
    </template>
    <slot></slot>
  </VkRenderer>
</template>
