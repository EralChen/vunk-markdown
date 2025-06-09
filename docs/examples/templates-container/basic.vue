<script lang="ts" setup>
import { VkMarkdown } from '@vunk-markdown/components/markdown'
import { VkTemplatesContainer } from '@vunk-markdown/components/templates-container'
import { VkTemplatesDefault } from '@vunk-markdown/components/templates-default'
import { computed, ref } from 'vue'

const data = `
水系统设计采用三级循环架构，工艺水重复利用率达92%

:::echart 
\`\`\`yaml
title: 能源消耗结构
unit: "%"
type: 3
data:
  - key: 电解制氢
    value: 48
  - key: 生物质处理
    value: 23
  - key: 甲醇合成
    value: 18
  - key: 公用工程
    value: 11
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
    :containers="['echart']"
  >
    <VkTemplatesDefault />
    <VkTemplatesContainer />
  </VkMarkdown>
</template>
