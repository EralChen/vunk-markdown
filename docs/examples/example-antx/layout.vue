<script setup lang="ts">
import { VkTemplatesContainer } from '@vunk-markdown/components/templates-container'
import { VkRendererTemplates, VkTemplatesDefault } from '@vunk/markdown'
</script>

<template>
  <VkRendererTemplates>
    <VkTemplatesContainer></VkTemplatesContainer>
    <VkTemplatesDefault></VkTemplatesDefault>
    <!-- 其他自定义策略 -->

    <slot></slot>
  </VkRendererTemplates>
</template>
