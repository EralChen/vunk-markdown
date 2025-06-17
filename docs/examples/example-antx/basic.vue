<script setup lang="ts">
import { VkMarkdown } from '@vunk/markdown'
import { Bubble } from 'ant-design-x-vue'
import Layout from './layout.vue'

const source = `
# Basic Markdown Example
This is a basic example of using **Markdown** in a Vue component.

## Features
- **Bold Text**
- *Italic Text*
- \`Inline Code\`


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
  <Layout>
    <Bubble
      :content="source" :typing="{ step: 4, interval: 50 }"
    >
      <template #message="{ content }">
        <VkMarkdown
          :source="content"
          :containers="['echarts']"
        ></VkMarkdown>
      </template>
    </Bubble>
  </Layout>
</template>
