<script lang="tsx">
import { VkRendererTemplate } from '@vunk-markdown/components/strategy-renderer'
import { VkEchart } from '@vunk/echarts'
import { defineComponent } from 'vue'
import Core from './core.vue'
import { emits, props } from './ctx'

export default defineComponent({
  name: 'VkTemplateEcharts',
  props,
  emits,
  setup (_props, { slots }) {
    return () => (
      <VkRendererTemplate type="container:echarts">
        {{
          default: (ctx) => {
            const children = ctx.raw.children
            const close = ctx.raw.close
            return (
              <div
                class="vk-template-echarts__wrapper"
              >

                <VkEchart>
                  <Core
                    source={children}
                    close={close}
                  >
                    {{
                      default: slots.default,
                    }}
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
  position: relative;
}
</style>
