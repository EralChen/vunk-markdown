<script setup lang="ts">
import { VkMarkdown } from '@vunk-markdown/components/markdown'
import { VkTemplateVis } from '@vunk-markdown/components/template-vis'
import { VkTemplateVisChart } from '@vunk-markdown/components/template-vis-chart'
import { VkTemplatesDefault } from '@vunk-markdown/components/templates-default'
import { computed, ref } from 'vue'
import { ElScrollbar } from 'element-plus'

const data = `
# GPT-VIS


Components for GPTs, generative AI, and LLM projects. Not only UI Components.

Here is a visualization of Haidilao's food delivery revenue from 2013 to 2022.


\`\`\`vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
  - time 2022
    value 150
\`\`\`

## vis-chart demo

Components for GPTs, generative AI, and LLM projects. Not only UI Components.

Here is a visualization of Haidilao's food delivery revenue from 2013 to 2022.



\`\`\`vis-chart
{
  "type": "line",
  "data": [
    { "time": "2013", "value": 59.3 },
    { "time": "2014", "value": 64.4 },
    { "time": "2015", "value": 68.9 },
    { "time": "2016", "value": 74.4 },
    { "time": "2017", "value": 82.7 },
    { "time": "2018", "value": 91.9 },
    { "time": "2019", "value": 99.1 },
    { "time": "2020", "value": 101.6 },
    { "time": "2021", "value": 114.4 },
    { "time": "2022", "value": 121 }
  ]
}
\`\`\`




---


`

const currentIndex = ref(0)
const currentText = computed(() => data.slice(0, currentIndex.value))

const interval = setInterval(() => {
  if (currentIndex.value < data.length) {
    currentIndex.value += 4
  }
  else {
    clearInterval(interval)
  }
}, 60)

const defaultOptions = {
  height: 400,
  wrapper: true
}
</script>

<template>
  <div style="height: 80vh;">
    

  <ElScrollbar>


    <VkMarkdown :source="currentText" :fences="['vis', 'vis-chart']">
      <VkTemplatesDefault />
      <VkTemplateVis :default-options="defaultOptions" />
      <VkTemplateVisChart :default-options="defaultOptions" />
    </VkMarkdown>
  </ElScrollbar>
  </div>
</template>
