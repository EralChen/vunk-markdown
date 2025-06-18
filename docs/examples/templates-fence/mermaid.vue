<script lang="ts" setup>
import { VkTemplatesFence } from '@vunk-markdown/components/templates-fence'
import { VkMarkdown } from '@vunk/markdown'

const source = `
# Mermaid 图表示例

\`\`\`mermaid
sequenceDiagram
    participant 浏览器
    participant 服务器
    
    浏览器->>服务器: GET /api/data
    服务器-->>浏览器: 返回数据
    浏览器->>浏览器: 渲染数据
    
    浏览器->>服务器: POST /api/update
    服务器-->>浏览器: 更新成功
\`\`\`
`
</script>

<template>
  <VkMarkdown :source="source" :fences="['mermaid']">
    <VkTemplatesFence></VkTemplatesFence>
  </VkMarkdown>
</template>
