<script lang="ts">
import { VkRendererTemplate } from '@vunk-markdown/components/strategy-renderer'
import { defineComponent } from 'vue'
import Core from './core.vue'
import { emits, props as dpops } from './ctx'

export default defineComponent({
  name: 'VkTemplateVisChart',
  components: {
    VkRendererTemplate,
    Core,
  },
  props: dpops,
  emits,
})
</script>

<template>
  <VkRendererTemplate type="fence:vis-chart">
    <template #default="{ raw }">
      <Core
        :content="raw.content"
        :options="defaultOptions"
      />
    </template>
  </VkRendererTemplate>
</template>