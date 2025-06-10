<script lang="ts" setup>
import { VkMarkdown, VkRendererTemplate, VkTemplatesDefault } from '@vunk/markdown'
import ShikiFence from './shiki-fence.vue'

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

111
`
</script>

<template>
  <VkMarkdown :source="source" :dev="true">
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
