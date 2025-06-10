<script lang="ts" setup>
import { VkMarkdown } from '@vunk-markdown/components/markdown'
import { VkTemplatesContainer } from '@vunk-markdown/components/templates-container'
import { VkTemplatesDefault } from '@vunk-markdown/components/templates-default'
import { computed, ref } from 'vue'

const data = `
水系统设计采用三级循环架构，工艺水重复利用率达92%

:::echarts
\`\`\`yaml
title:
  text: "ECharts 入门示例"

tooltip: {}

legend:
  data:
    - "销量"

xAxis:
  data:
    - "衬衫"
    - "羊毛衫"
    - "雪纺衫"
    - "裤子"
    - "高跟鞋"
    - "袜子"

yAxis: {}

series:
  - name: "销量"
    type: "bar"
    data:
      - 5
      - 20
      - 36
      - 10
      - 10
      - 20
\`\`\`
:::

\`\`\`javascript
console.log('水系统设计采用三级循环架构，工艺水重复利用率达92%')
\`\`\`

供电系统配置2台63MVA主变压器，功率因数补偿至0.95`

const currentIndex = ref(10)
const currentText = computed(() => {
  return data.slice(0, currentIndex.value + 1)
})

const interval = setInterval(() => {
  if (currentIndex.value < data.length) {
    currentIndex.value++
  }
  else {
    clearInterval(interval)
  }
}, 50)
</script>

<template>
  <VkMarkdown
    :source="currentText"
    :dev="true"
    :containers="['echarts']"
  >
    <VkTemplatesDefault />
    <VkTemplatesContainer />
  </VkMarkdown>
</template>
