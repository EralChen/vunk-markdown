<script lang="ts" setup>
import { VkTemplateEcharts } from '@vunk-markdown/components/template-echarts'
import { VkMarkdown, VkTemplatesDefault } from '@vunk/markdown'
import { computed, ref } from 'vue'
import txt from './demo.txt?raw'

const data = `
# ECharts Example

:::echarts
\`\`\`json
${txt}
\`\`\`
:::
`

const currentIndex = ref(400)
const currentText = computed(() => {
  return data.slice(0, currentIndex.value)
})

const interval = setInterval(() => {
  if (currentIndex.value < data.length) {
    currentIndex.value += 2
  }
  else {
    clearInterval(interval)
  }
}, 60)
</script>

<template>
  <VkMarkdown
    :source="currentText"
    :containers="['echarts']"
  >
    <VkTemplatesDefault />
    <VkTemplateEcharts />
  </VkMarkdown>
</template>
