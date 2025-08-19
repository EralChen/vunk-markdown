<script lang="ts" setup>
import { VkMarkdown, VkRendererTemplate, VkTemplatesDefault } from '@vunk/markdown'
import { computed, ref } from 'vue'
import ShikiFence from './shiki-fence.vue'

const text = `
### Table
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Row 1    | Row 1    |
| Row 2    | Row 2    | Row 2    |

### Code 

\`\`\`javascript
console.log('This is a code block')
console.log('This is a code block')
console.log('This is a code block')
console.log('This is a code block')
console.log('This is a code block')
console.log('This is a code block')
\`\`\`

111
`

const currentIndex = ref(0)
const currentText = computed(() => {
  return text.slice(0, currentIndex.value + 1)
})

const interval = setInterval(() => {
  if (currentIndex.value < text.length) {
    currentIndex.value += 5
  }
  else {
    clearInterval(interval)
  }
}, 50)
</script>

<template>
  <VkMarkdown :source="currentText" :dev="true">
    <VkTemplatesDefault />

    <VkRendererTemplate type="fence">
      <template #default="{ raw }">
        <ShikiFence
          :code="raw.content"
          :lang="raw.info ? raw.info.split(' ')[0] : ''"
        />
      </template>
    </VkRendererTemplate>
  </VkMarkdown>
</template>
