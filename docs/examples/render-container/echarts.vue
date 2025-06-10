<script lang="ts" setup>
import { VkTemplatesContainer } from '@vunk-markdown/components/templates-container'
import { VkMarkdown, VkRendererTemplate, VkTemplatesDefault } from '@vunk/markdown'

const source = `

# Hello ECharts

This is a simple ECharts example.

:::echarts
\`\`\`json
{
  "title": {
    "text": "ECharts 入门示例"
  },
  "tooltip": {},
  "legend": {
    "data": ["销量"]
  },
  "xAxis": {
    "data": ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
  },
  "yAxis": {},
  "series": [
    {
      "name": "销量",
      "type": "bar",
      "data": [5, 20, 36, 10, 10, 20]
    }
  ]
}

\`\`\`
:::
`
</script>

<template>
  <VkMarkdown
    :source="source"
    :containers="['warning', 'echarts']"
  >
    <VkTemplatesDefault />
    <VkTemplatesContainer />

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
