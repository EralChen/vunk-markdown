<script lang="ts" setup>
import { noop } from '@vunk/shared/function'
import { throttle } from 'lodash-es'
import mermaid from 'mermaid'
import { nextTick, ref, useId, watchEffect } from 'vue'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  dev: {
    type: Boolean,
    default: false,
  },
})
const domId1 = useId()
const domId2 = useId()
const currentDomId = ref(domId1)
function toggleDomId () { // 交替渲染用于缓存上一次结果
  const oId = currentDomId.value
  const oDom = document.getElementById(oId)
  currentDomId.value = oId === domId1 ? domId2 : domId1
  if (oDom) {
    oDom.innerHTML = ''
  }
}

const htmlString = ref('')

const throttledRender = throttle(render, 400)

watchEffect(async () => {
  noop(props.content)
  await nextTick()
  throttledRender()
})

function render () {
  mermaid.render(currentDomId.value, props.content).then((
    { svg, bindFunctions },
  ) => {
    htmlString.value = svg
    const dom = document.getElementById(currentDomId.value)
    dom && bindFunctions?.(dom)
    toggleDomId()
  }).catch(() => {
    // 默认忽略错误
    props.dev && console.error('Mermaid render error:', props.content)
  })
}
</script>

<template>
  <div :id="domId1"></div>
  <div :id="domId2"></div>
  <div
    v-html="htmlString"
  ></div>
</template>

<style>
/* 隐藏 Mermaid 错误时的弹窗 */
body > [id^="dv-"] svg{
  position: fixed;
  top: 0;
  left: -9999px;
}
</style>
