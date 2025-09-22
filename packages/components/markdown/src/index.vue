<script lang="ts">
import type { MarkdownItContainerOptions } from '@vunk-markdown/shared/container'
import { VkRenderer } from '@vunk-markdown/components/strategy-renderer'
import { VkTemplatesDefault } from '@vunk-markdown/components/templates-default'
import { container } from '@vunk-markdown/shared/container'
import MarkdownIt from 'markdown-it'
import { computed, defineComponent } from 'vue'
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
    const md = MarkdownIt(props.markdownItOptions)

    props.markdownItSetup!(md)

    props.containers.forEach((tag) => {
      // md.use(MarkdownItContainer, tag)
      md.use(container, {
        name: tag,
      } as MarkdownItContainerOptions)
    })
    const tags = props.tags
    const fences = props.fences

    const items = computed(() => tokensToTree(
      md.parse(props.source, {}),
      tags,
      fences,
    ))

    const handlelog = () => {
      // eslint-disable-next-line no-console
      console.debug('Markdown tokens:', items.value)
    }
    expose({})

    return {
      items,
      handlelog,
      md,
    }
  },
})
</script>

<template>
  <VkRenderer :source="items" :md="md">
    <button v-if="dev" @click="handlelog">
      log
    </button>

    <template #placeholder>
      <VkTemplatesDefault />
    </template>

    <slot></slot>
  </VkRenderer>
</template>
