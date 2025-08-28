<script lang="ts" setup>
import { VkTemplateEcharts } from '@vunk-markdown/components/template-echarts'
import { VkMarkdown, VkTemplatesDefault } from '@vunk/markdown'
import { computed, ref } from 'vue'
import txt from './error.txt?raw'

const data = `
# ECharts Example


:::echarts
\`\`\`json
${txt}
\`\`\`

:::



`

const currentIndex = ref(10)
const currentText = computed(() => {
  return data.slice(0, currentIndex.value)
})

const interval = setInterval(() => {
  if (currentIndex.value < data.length) {
    currentIndex.value += 10
  }
  else {
    clearInterval(interval)
  }
}, 60)
</script>

<template>
  <VkMarkdown
    :source="currentText"
    :containers="['echarts', 'details']"
  >
    <VkTemplatesDefault />
    <VkTemplateEcharts>
      <template #default="{ error }">
        <div v-if="error" class="vk-template-echarts__error">
          <br />
          <span>  {{ error.message }}</span>
          <br />
          <br />
          <pre>{{ error.stack }}</pre>
        </div>
      </template>
    </VkTemplateEcharts>
  </VkMarkdown>
</template>

<style>
.vk-template-echarts__error{
  position: absolute;
  color: white;
  padding:20px;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  overflow: hidden;
}

.vk-template-echarts__error pre{
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0;
  padding: 10px;
  font-size: 12px;
}
</style>
