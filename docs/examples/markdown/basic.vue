<script lang="ts" setup>
import { VkMarkdown } from '@vunk-markdown/components/markdown'
import { computed, ref } from 'vue'

const text = `# Hello, Markdown!
This is a simple example of using **Markdown** in a Vue component.
You can write _italic_, **bold**, and even [links](https://example.com).

+ List item 1
+ List item 2
  \`\`\`javascript
  console.log('Hello, world!');
  \`\`\`
+ Nested list item
  + Sub-item 1
  + Sub-item 2
You can also include code blocks, like this one:
`

const currentIndex = ref(0)
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
}, 100)
</script>

<template>
  <VkMarkdown
    :source="currentText"
  ></VkMarkdown>
</template>
