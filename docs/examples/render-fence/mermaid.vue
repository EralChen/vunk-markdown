<script lang="ts" setup>
import { VkTemplatesFence } from '@vunk-markdown/components/templates-fence'
import { VkMarkdown, VkTemplatesDefault } from '@vunk/markdown'

const source = `
#  Fence Renderer Example
\`\`\`mermaid
graph TD;
  A[Start] --> B{Decision};
  B -->|Yes| C[Option 1];
  B -->|No| D[Option 2];
  C --> E[End];
  D --> E;
  E --> F[Final Step];
  F --> G[Complete];
\`\`\`
`
</script>

<template>
  <VkMarkdown :source="source" :fences="['mermaid']">
    <VkTemplatesDefault />
    <VkTemplatesFence />
  </VkMarkdown>
</template>
