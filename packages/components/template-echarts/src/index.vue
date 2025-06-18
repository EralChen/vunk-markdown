<script lang="tsx">
import { VkRendererTemplate } from '@vunk/core/components/strategy-renderer'
import { VkEchart } from '@vunk/echarts'
import { defineComponent } from 'vue'
import Core from './core.vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkTemplateEcharts',
  props,
  emits,
  setup () {
    return () => (
      <VkRendererTemplate type="container:echarts">
        {{
          default: (ctx) => {
            const children = ctx.raw.children
            return (
              <div
                class="vk-template-echarts__wrapper"
              >
                <VkEchart>
                  <Core
                    source={children}
                  >
                  </Core>
                </VkEchart>
              </div>
            )
          },
        }}
      </VkRendererTemplate>
    )
  },
})
</script>

<style>
.vk-template-echarts__wrapper{
  height: 500px;
}
</style>
