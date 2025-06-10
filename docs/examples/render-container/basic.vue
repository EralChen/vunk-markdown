<script lang="ts" setup>
import { VkMarkdown, VkRendererTemplate, VkTemplatesDefault } from '@vunk/markdown'

const source = `

### Test Markdown with Custom Container


:::warning
This is a warning message.
:::
`
</script>

<template>
  <VkMarkdown
    :source="source"
    :containers="['echarts', 'warning']"
  >
    <VkTemplatesDefault />
    <VkRendererTemplate type="container:warning">
      <template #default="{ raw, Renderer }">
        <!-- 自定义警告组件 -->
        <div class="warning-box">
          <h4>⚠️ 警告</h4>
          <component :is="Renderer" :source="raw.children" />
        </div>
      </template>
    </VkRendererTemplate>
  </VkMarkdown>
</template>
