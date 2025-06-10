<script lang="ts" setup>
import { VkEchart } from '@vunk/echarts'
import { VkMarkdown, VkRendererTemplate, VkTemplatesDefault } from '@vunk/markdown'
import { computed, ref } from 'vue'
import ChartConfig from './chart-config.vue'

const data = `
水系统设计采用三级循环架构，工艺水重复利用率达92%

:::piechart 
\`\`\`yaml
title: 能源消耗结构
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
`

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
    :containers="['piechart']"
  >
    <VkTemplatesDefault />
    <VkRendererTemplate type="container:piechart">
      <template #default="{ raw }">
        <VkEchart h-500px>
          <ChartConfig :source="raw.children" />
        </VkEchart>
      </template>
    </VkRendererTemplate>
  </VkMarkdown>
</template>
