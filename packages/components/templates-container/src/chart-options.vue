<script lang="ts">
import type { Token } from 'markdown-it'
import type { Ref } from 'vue'
import { useEchart } from '@vunk/echarts'
import { noop } from '@vunk/shared/function'
import { isEmptyObject, isObject } from '@vunk/shared/object'
import { throttle } from 'lodash-es'
import { computed, defineComponent, nextTick, ref, watchEffect } from 'vue'
import { parse } from 'yaml'

export default defineComponent({
  props: {
    source: {
      type: Array<any>,
      default: () => [],
    },
    renderer: null,
  },
  setup (props) {
    const echart = useEchart()
    const configRef = ref() as Ref<HTMLDivElement>

    const theToken = ref<Token | undefined>()

    watchEffect(async () => {
      noop(props.source)

      await nextTick()

      const raw = props.source.find(
        (item: Token) => item.info === 'yaml'
          || item.info === 'json',
      ) as Token | undefined

      theToken.value = raw
    })

    const options = computed(() => {
      if (!theToken.value) {
        return {}
      }

      try {
        if (theToken.value.info === 'json') {
          return JSON.parse(theToken.value.content)
        }

        if (theToken.value.info === 'yaml') {
          return parse(theToken.value.content)
        }
      }
      catch {
        return {}
      }

      return {}
    })

    const setSeriesData = throttle((options) => {
      try {
        echart.setOption(options, true)
      }
      catch {
        // 渲染时可能会出现错误，忽略
      }
    }, 900, {
      trailing: true,
    })

    watchEffect(() => {
      if (!options.value || !isObject(options.value)) {
        return
      }
      if (isEmptyObject(options.value)) {
        return
      }
      nextTick(() => {
        setSeriesData(options.value)
      })
    })

    return {
      configRef,
    }
  },
})
</script>

<template>
  <div v-show="false" ref="configRef">
    <component
      :is="renderer"
      :source="source"
    ></component>
  </div>
</template>
