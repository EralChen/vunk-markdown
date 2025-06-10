<script lang="ts">
import { VkRenderer } from '@vunk-markdown/components/strategy-renderer'
import { VkTemplatesDefault } from '@vunk-markdown/components/templates-default'
import { consola } from 'consola'
import MarkdownIt from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'
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
    const md = MarkdownIt({})

    props.containers.forEach((tag) => {
      md.use(MarkdownItContainer, tag)
    })

    const items = computed(() => tokensToTree(
      md.parse(props.source, {}),
      props.tokens,
    ))

    const handlelog = () => {
      consola.log('Markdown tokens:', items.value)
    }
    expose({})

    return {
      items,
      handlelog,
    }
  },
})
</script>

<template>
  <VkRenderer :source="items">
    <ElButton v-if="dev" @click="handlelog">
      log
    </ElButton>
    <template #placeholder>
      <VkTemplatesDefault />
    </template>
    <slot></slot>
  </VkRenderer>
</template>
