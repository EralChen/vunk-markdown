<script lang="ts" setup>
import { VkMarkdown } from '@vunk/markdown'
import { ref } from 'vue'

const data = ref(`
# Welcome to Vunk Markdown
This is a simple markdown example to demonstrate the usage of the VkMarkdown component.
## Features
- **Easy to use**: Just pass your markdown content as a prop.
- **Customizable**: You can style the markdown content as needed.
`)
</script>

<template>
  <page-x>
    <VkMarkdown
      :source="data"
    >
    </VkMarkdown>
  </page-x>
</template>
