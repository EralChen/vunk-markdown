<script lang="tsx">
import { VkRendererTemplate } from '@vunk-markdown/components/strategy-renderer'
import { VkEchart } from '@vunk/echarts'
import { defineComponent } from 'vue'
import ChartOptions from './chart-options.vue'

export default defineComponent({
  name: 'VkTemplatesContainer',
  setup () {
    return () => (
      <>
        <VkRendererTemplate type="echarts">
          {{
            default: (ctx) => {
              const children = ctx.raw.children
              return (
                <div
                  class="vk-templates-container-echart__wrapper"
                >
                  <VkEchart>
                    <ChartOptions
                      source={children}
                      renderer={ctx.Renderer}
                    >
                    </ChartOptions>
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

<style>
.vk-templates-container-echart__wrapper{
  height: 500px;
}
</style>
