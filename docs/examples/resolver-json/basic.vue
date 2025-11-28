<script lang="ts" setup>
import { VkMarkdown } from '@vunk-markdown/components/markdown'
import { VkResolverJson } from '@vunk-markdown/components/resolver-json'
import { VkRendererTemplate } from '@vunk-markdown/components/strategy-renderer'
import { VkTemplatesDefault } from '@vunk-markdown/components/templates-default'
import { computed, ref } from 'vue'
import text from './text.txt?raw'

const currentIndex = ref(1)
const currentText = computed(() => {
  return text.slice(0, currentIndex.value + 1)
})

const interval = setInterval(() => {
  if (currentIndex.value < text.length) {
    currentIndex.value++
  }
  else {
    clearInterval(interval)
  }
}, 50)
</script>

<template>
  <VkMarkdown
    dev
    :source="currentText"
  >
    <VkTemplatesDefault></VkTemplatesDefault>

    <VkRendererTemplate type="fence">
      <template #default="{ raw }">
        <VkResolverJson :source="raw">
          <template #default="e">
            {{ e }}
          </template>
        </VkResolverJson>
      </template>
    </VkRendererTemplate>
  </VkMarkdown>
</template>
