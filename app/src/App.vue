<script setup lang="ts">
import { VkMarkdown } from '@vunk/markdown/components/markdown'
import { VkTemplateVis } from '@vunk/markdown/components/template-vis'
import { VkTemplatesDefault } from '@vunk/markdown/components/templates-default'
import { computed, ref } from 'vue'

const data = `
# GPT-VIS

Components for GPTs, generative AI, and LLM projects. Not only UI Components.

Here is a visualization of Haidilao's food delivery revenue from 2013 to 2022.

\`\`\`vis
vis line
data
  - time 2020
    value 100
  - time 2021
    value 120
  - time 2022
    value 150
\`\`\`
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
  <main style="max-width: 960px; margin: 40px auto; padding: 0 16px;">
    <VkMarkdown
      :source="currentText"
      :fences="['vis']"
    >
      <VkTemplatesDefault />
      <VkTemplateVis
        :default-options="defaultOptions"
      />
    </VkMarkdown>
  </main>
</template>

