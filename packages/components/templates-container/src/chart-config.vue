<script lang="ts">
import type { NormalObject } from '@vunk/shared'
import type { EChartsOption } from 'echarts'
import type { Token } from 'markdown-it'
import type { Ref } from 'vue'
import { useEchart } from '@vunk/echarts'
import { noop } from '@vunk/shared/function'
import { throttle } from 'lodash-es'
import { computed, defineComponent, nextTick, ref, watchEffect } from 'vue'
import { parse } from 'yaml'

interface ChartData {
  title?: string
  data?: { key: string, value: number }[]
}

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

    const rawString = ref('')

    watchEffect(async () => {
      noop(props.source)

      await nextTick()

      const raw = props.source.find(
        (item: Token) => item.info === 'yaml',
      ) as Token | undefined

      rawString.value = raw?.content || ''
    })

    const chartData = computed<ChartData>(() => {
      try {
        return parse(rawString.value)
      }
      catch {
        return {}
      }
    })

    const ser = {
      name: '',
      type: 'pie',
      radius: ['40%', '70%'], // 环形图，如果想要普通饼图可设为 '50%'
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}: {d}%', // 展示百分比
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 18,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: true,
      },
      data: [],
    }
    const options = {
      title: {
        text: '',
        left: 'center',
        top: 20,
        textStyle: {
          fontSize: 20,
        },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {d}%',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'middle',
        textStyle: {
          fontSize: 14,
        },
      },
      series: [
        ser,
      ],
    } as EChartsOption

    // 根据 chartData 局部更新 options
    watchEffect(() => {
      if (!chartData.value || !chartData.value.title) {
        return
      }

      echart.setOption({
        title: {
          text: chartData.value?.title,
        },
      })
    })

    const setSeriesData = throttle((data) => {
      echart.setOption({
        series: [
          {
            data,
          },
        ],
      })
    }, 900, {
      trailing: true,
    })

    watchEffect(() => {
      const data = chartData.value?.data || []
      const theData = data.reduce((acc: NormalObject[], item) => {
        if (item && item.key && item.value) {
          acc.push({
            name: item.key,
            value: item.value,
          })
        }
        return acc
      }, [])
      if (theData.length === 0) {

      }

      setSeriesData(theData)
    })

    nextTick(() => {
      echart.setOption(options)
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
