<script lang="ts" setup>
import { VkMarkdown } from '@vunk-markdown/components/markdown'
import { computed, ref } from 'vue'

const text = `# Hello, Markdown!
This is a simple example of using **Markdown** in a Vue component.

\`\`\`javascript
console.log('Hello, world!');
\`\`\`

You can write _italic_, **bold**, and even [links](https://example.com).

+ List item 1
+ List item 2

+ Nested list item
  + Sub-item 1
  + Sub-item 2

<div>
    <p>HTML content inside Markdown:</p>
    <span style="color:red;">test</span>
<div>

Before span <span style="color:red;" >test1</span> After span

<video 
  src="https://www.w3schools.com/html/mov_bbb.mp4" 
  controls 
/> 

after html block

> This is a blockquote.

`

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
    :markdown-it-options="{
      html: true,
    }"
  ></VkMarkdown>
</template>
