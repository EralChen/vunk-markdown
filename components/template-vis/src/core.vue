<script lang="ts" setup>
import { GPTVis } from '@antv/gpt-vis'
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
  try {
    gptVis?.render(v)
  } catch (err) {
    console.warn('gptVis rendering' , err)
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