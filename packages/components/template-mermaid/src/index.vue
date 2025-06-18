<script lang="ts">
import { VkRendererTemplate } from '@vunk-markdown/components/strategy-renderer'
import mermaid from 'mermaid'
import { defineComponent } from 'vue'
import Core from './core.vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkTemplateMermaid',
  components: {
    VkRendererTemplate,
    Core,
  },
  props,
  emits,
  setup (props) {
    props.initialize && mermaid.initialize({
      startOnLoad: false,
      suppressErrorRendering: true,
    })

    return {}
  },
})
</script>

<template>
  <VkRendererTemplate
    type="fence:mermaid"
  >
    <template #default="{ raw }">
      <Core
        :content="raw.content"
        :dev="dev"
      ></Core>
    </template>
  </VkRendererTemplate>
</template>
