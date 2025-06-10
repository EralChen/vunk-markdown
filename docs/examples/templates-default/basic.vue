<script lang="ts" setup>
import { VkTemplatesDefault } from '@vunk-markdown/components/templates-default'
import { VkMarkdown } from '@vunk/markdown'

const source = `
### Table
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Row 1    | Row 1    |
| Row 2    | Row 2    | Row 2    |

### Code 

\`\`\`javascript
console.log('This is a code block')
\`\`\`
`
</script>

<template>
  <VkMarkdown :source="source">
    <VkTemplatesDefault />
  </VkMarkdown>
</template>
