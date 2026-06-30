<script lang="ts">
import type { NormalObject } from '@vunk/core'
import type { Token } from 'markdown-exit'
import type { PropType } from 'vue'
import { useEchart } from '@vunk/echarts'
import { noop } from '@vunk/shared/function'
import { isEmptyObject, isObject } from '@vunk/shared/object'
import { jsonrepair } from 'jsonrepair'
import { throttle } from 'es-toolkit'
import { computed, defineComponent, nextTick, onBeforeUnmount, ref, watchEffect } from 'vue'
import { parse } from 'yaml'

function parseJsObjectLiteral (source: string): NormalObject {
  // 将包含 formatter 等函数字面量的配置作为 JS 对象表达式执行。
  const factory = new Function(`"use strict"; return (${source});`)
  const value = factory()

  if (!isObject(value)) {
    throw new TypeError('ECharts options must be an object')
  }

  return value
}

function parseEchartsOptions (source: string): NormalObject {
  // 优先按 JSON/YAML 解析，失败后再尝试 jsonrepair，保留流式输出时的容错能力。
  try {
    return parse(source)
  }
  catch {
    try {
      const repairedJson = jsonrepair(source)
      return parse(repairedJson)
    }
    catch {
      // 最后才执行 JS 对象表达式，用于支持 ECharts 回调函数配置。
      return parseJsObjectLiteral(source)
    }
  }
}

export default defineComponent({
  props: {
    source: {
      type: Array<any>,
      default: () => [],
    },

    close: {
      type: Object as PropType<{ markup: string }>,
      default: () => ({}),
    },
  },
  setup (props) {
    const echart = useEchart()
    const theToken = ref<Token | undefined>()
    const error = ref()

    const finished = ref(false)

    watchEffect(async () => {
      noop(props.source)

      await nextTick()

      const raw = props.source.find(
        (item: Token) => item.info?.includes('yaml')
          || item.info?.includes('json'),
      ) as Token | undefined

      theToken.value = raw
    })

    const jsonStr = computed<string>(() => {
      return theToken.value?.info.includes('json')
        ? theToken.value.content
        : ''
    })
    const json = ref<NormalObject>({})

    watchEffect(async () => {
      noop(jsonStr.value)
      await nextTick()
      try {
        json.value = parseEchartsOptions(jsonStr.value)
      }
      catch {
        // 解析失败时保留上一次可渲染配置，避免流式内容半截输出时清空图表。
      }
    })

    const options = computed(() => {
      if (!theToken.value) {
        return {}
      }

      try {
        if (theToken.value.info.includes('json')) {
          return json.value
        }

        if (theToken.value.info.includes('yaml')) {
          return parseEchartsOptions(theToken.value.content)
        }
      }
      catch {
        return {}
      }

      return {}
    })

    function handleFinished () {
      finished.value = true
      error.value = undefined
    }
    echart.on('finished', handleFinished)
    onBeforeUnmount(() => {
      echart.off('finished', handleFinished)
    })

    const setSeriesData = throttle((options) => {
      if (!finished.value) {
        echart.clear()
      }

      try {
        echart.setOption(options, true, true)

        finished.value = false
      }
      catch (err) {
        // 渲染时可能会出现错误，忽略
        error.value = err
      }
    }, 1400, {
      edges: ['leading', 'trailing'],
    })

    watchEffect(() => {
      if (!options.value || !isObject(options.value)) {
        return
      }
      if (isEmptyObject(options.value)) {
        return
      }

      setTimeout(() => {
        setSeriesData(options.value)
      })
    })

    return {
      error,
      finished,
    }
  },
})
</script>

<template>
  <slot
    :close="close"
    :error="error"
    :finished="finished"
  >
    <div v-if="error" class="vk-template-echarts__error">
      <br />
      <span>  {{ error.message }}</span>
      <br />
      <br />
      <pre>{{ error.stack }}</pre>
    </div>
  </slot>
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
