<script lang="ts" setup>
import { GPTVis, isVisSyntax } from '@antv/gpt-vis'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { TemplateVisOptions } from './types'
import { nextTick } from 'vue';

const props = defineProps<{
  content: string
  options?: Partial<TemplateVisOptions>
}>()

const chartRef = ref<HTMLDivElement>()
let gptVis: GPTVis | null = null

function read (v = props.content) {
  if (isVisSyntax(v)) {
    gptVis?.render(v)
  }
}

onMounted(() => {
  if (!chartRef.value) {
    return
  }

  gptVis = new GPTVis({
    ...props.options,
    container: chartRef.value,
  })

  nextTick(read)
})

watch(
  () => props.content,
  read,
)

onUnmounted(() => {
  gptVis?.destroy()
  gptVis = null
})
</script>

<template>
  <div ref="chartRef"></div>
</template>