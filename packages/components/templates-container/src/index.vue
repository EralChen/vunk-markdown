<script lang="tsx">
import { VkRendererTemplate } from '@vunk-markdown/components/strategy-renderer'
import { VkEchart } from '@vunk/echarts'
import { defineComponent } from 'vue'
import ChartConfig from './chart-config.vue'

export default defineComponent({
  name: 'VkTemplatesContainer',
  setup () {
    return () => (
      <>
        <VkRendererTemplate type="echart">
          {{
            default: (ctx) => {
              const children = ctx.raw.children

              return (
                <div style={{ height: '500px' }}>

                  <VkEchart>
                    <ChartConfig
                      source={children}
                      renderer={ctx.Renderer}
                    >
                    </ChartConfig>
                  </VkEchart>
                </div>
              )
            },
          }}
        </VkRendererTemplate>

      </>

    )
  },
})
</script>
