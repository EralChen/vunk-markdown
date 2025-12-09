<script lang="ts" setup>
import type { Ref } from 'vue'
import { GPTVis } from '@antv/gpt-vis'

import { createElement, useState } from 'react'

import { createRoot } from 'react-dom/client'

import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  content: string
}>()

const elRef = ref() as Ref<HTMLDivElement>

function ReactVis () {
  const [source, setSource] = useState(
    ['```vis-chart', props.content, '```'].join('\n'),
  )

  watch(
    () => props.content,
    (newVal) => {
      setSource(['```vis-chart', newVal, '```'].join('\n'))
    },
  )

  return (
    createElement(
      GPTVis,
      null,
      source,
    )
  )
}

onMounted(() => {
  const root = createRoot(elRef.value)
  root.render(
    createElement(ReactVis),
  )
})
</script>

<template>
  <div ref="elRef"></div>
</template>
