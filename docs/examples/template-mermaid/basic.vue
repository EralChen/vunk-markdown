<script lang="ts" setup>
import { VkTemplateMermaid } from '@vunk-markdown/components/template-mermaid'
import { VkMarkdown, VkTemplatesDefault } from '@vunk/markdown'
import { computed, ref } from 'vue'
import txt from './demo.txt?raw'

const data = `
# Mermaid Example

\`\`\`mermaid
${txt}
\`\`\`
`

const currentIndex = ref(10)
const currentText = computed(() => {
  return data.slice(0, currentIndex.value + 5)
})

const interval = setInterval(() => {
  if (currentIndex.value < data.length) {
    currentIndex.value++
  }
  else {
    clearInterval(interval)
  }
}, 50)
</script>

<template>
  <VkMarkdown
    :source="currentText"
    :containers="['mermaid']"
  >
    <VkTemplatesDefault />
    <VkTemplateMermaid />
  </VkMarkdown>
</template>
