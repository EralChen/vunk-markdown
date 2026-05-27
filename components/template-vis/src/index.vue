<script lang="ts">
import { VkRendererTemplate } from '@vunk-markdown/components/strategy-renderer'
import { defineComponent } from 'vue'
import Core from './core.vue'
import { emits, props as dpops } from './ctx'

export default defineComponent({
  name: 'VkTemplateVis',
  components: {
    VkRendererTemplate,
    Core,
  },
  props: dpops,
  emits,
})
</script>

<template>
  <VkRendererTemplate type="fence:vis">
    <template #default="{ raw }">
      <Core
        :content="raw.content"
        :options="defaultOptions"
      />
    </template>
  </VkRendererTemplate>
</template>