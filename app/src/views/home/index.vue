<script lang="ts" setup>
import { VkMarkdown, VkTemplatesDefault } from '@vunk/markdown'
import { VkTemplateVis } from '@vunk/markdown/components/template-vis'
import { ref } from 'vue'

const data = ref(`
# Welcome to Vunk Markdown
This is a simple markdown example to demonstrate the usage of the VkMarkdown component.
## Features
- **Easy to use**: Just pass your markdown content as a prop.
- **Customizable**: You can style the markdown content as needed.

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
`)
</script>

<template>
  <page-x>
    <VkMarkdown
      :source="data"
      :fences="['vis-chart']"
    >
      <VkTemplatesDefault></VkTemplatesDefault>
      <VkTemplateVis></VkTemplateVis>
    </VkMarkdown>
  </page-x>
</template>
