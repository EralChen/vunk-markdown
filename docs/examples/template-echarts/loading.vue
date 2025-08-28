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
    dev
    :containers="['echarts']"
  >
    <VkTemplatesDefault />

    <VkTemplateEcharts>
      <template #default="{ finished, close }">
        <!-- finished 表示图表渲染完成，因为在 typing 的过程中，finished 可能由个 false => true 的过程  -->

        <!-- close 是 md 结束的 token, markup 为 ::: 可视为闭合, 答应完成  -->
        <div
          v-if="!close.markup"
          class="vk-template-echarts__loading"
        >
          <span>
            Loading...

            test: {{ finished }}
          </span>
        </div>
      </template>
    </VkTemplateEcharts>
  </VkMarkdown>
</template>

<style>
.vk-template-echarts__loading{
  position: absolute;
  color: white;
  padding:20px;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
}
</style>
