<script lang="ts" setup>
import { VkRendererTemplate } from '@vunk/markdown'
import Core from './core.vue'

defineOptions({
  name: 'VkTemplateVis',
})
</script>

<template>
  <VkRendererTemplate type="fence:vis-chart">
    <template #default="{ raw }">
      <Core :content="raw.content" />
    </template>
  </VkRendererTemplate>
</template>
