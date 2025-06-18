<script lang="ts" setup>
import { VkTemplatesContainer } from '@vunk-markdown/components/templates-container'
import { VkMarkdown, VkTemplatesDefault } from '@vunk/markdown'

const source = `
# Basic Markdown Example
This is a basic example of using **Markdown** in a Vue component.

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
    :containers="['echarts']"
  >
    <VkTemplatesDefault />
    <VkTemplatesContainer />
  </VkMarkdown>
</template>
