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

===========================


:::echarts
\`\`\`json
{
  "title": {
    "text": "饼图示例",
    "left": "center"
  },
  "tooltip": {
    "trigger": "axis",
    "axisPointer": {
      "type": "shadow"
    }
  },
  "series": [
    {
      "name": "销量",
      "type": "pie",
      "data": [10, 52, 200, 334, 390, 330, 220]
    }
  ]
}

\`\`\`
:::


:::
`

const currentIndex = ref(0)
const currentText = computed(() => {
  return data.slice(0, currentIndex.value)
})

const interval = setInterval(() => {
  if (currentIndex.value < data.length) {
    currentIndex.value += 4
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
