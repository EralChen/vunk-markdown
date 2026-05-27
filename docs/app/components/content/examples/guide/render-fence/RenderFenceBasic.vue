<script lang="ts" setup>
import { VkMarkdown, VkRendererTemplate, VkTemplatesDefault } from '@vunk/markdown'

const source = `
# Custom Fence Renderer Example
\`\`\`card 我是标题
This is a custom fenced code block.
\`\`\`
`
</script>

<template>
  <VkMarkdown :source="source" :fences="['card']">
    <VkTemplatesDefault></VkTemplatesDefault>
    <VkRendererTemplate type="fence:card">
      <template #default="{ raw }">
        <el-card :header="raw.info.split(' ')[1]" class="custom-fence-card">
          <pre>{{ raw.content }}</pre>
        </el-card>
      </template>
    </VkRendererTemplate>
  </VkMarkdown>
</template>
