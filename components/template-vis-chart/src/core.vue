<script lang="ts" setup>
import { GPTVis } from '@antv/gpt-vis'
import { useJsonrepair } from '@vunk-markdown/composables/jsonrepair'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { TemplateVisChartOptions } from './types'

const props = defineProps<{
  content: string
  options?: Partial<TemplateVisChartOptions>
}>()

const chartRef = ref<HTMLDivElement>()
let gptVis: GPTVis | null = null

const content = computed(() => props.content)

function isJsonText (value: string) {
  const trimmed = value.trim()
  return trimmed.startsWith('{') || trimmed.startsWith('[')
}

const jsonContent = computed(() => {
  return isJsonText(content.value) ? content.value : ''
})

const { json } = useJsonrepair(jsonContent)

const isJsonContent = computed(() => Boolean(jsonContent.value))

function isChartConfig (value: unknown): value is Record<string, unknown> {
  return Boolean(
    value
    && typeof value === 'object'
    && !Array.isArray(value)
    && 'type' in value,
  )
}

function render (config: string | Record<string, unknown>) {
  try {
    gptVis?.render(config)
  }
  catch (err) {
    console.warn('gptVis rendering', err)
  }
}

function renderContent () {
  if (isJsonContent.value) {
    renderJsonContent()
    return
  }

  if (content.value.trim()) {
    render(content.value)
  }
}

function renderJsonContent () {
  if (isChartConfig(json.value)) {
    render(json.value)
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

  nextTick(renderContent)
})

watch(
  content,
  renderContent,
)

watch(
  json,
  renderJsonContent,
)

onUnmounted(() => {
  gptVis?.destroy()
  gptVis = null
})
</script>

<template>
  <div ref="chartRef"></div>
</template>