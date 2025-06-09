<script lang="ts" setup>
import { VkMarkdown } from '@vunk-markdown/components/markdown'
import { VkRendererTemplate } from '@vunk/core/components/renderer-template'
</script>

<template>
  <VkRendererTemplate type="VkMarkdown">
    <template #default="{ props }">
      <VkMarkdown
        :source="props.content"
      ></VkMarkdown>
    </template>
  </VkRendererTemplate>
</template>
