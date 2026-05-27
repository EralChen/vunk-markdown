import type { App } from 'vue'
import VkTemplateEcharts from './src/index.vue'

export * as __VkTemplateEcharts from './src/types'

VkTemplateEcharts.install = (app: App): void => {
  app.component(VkTemplateEcharts.name || 'VkTemplateEcharts', VkTemplateEcharts)
}
export {
  VkTemplateEcharts,
}
export default VkTemplateEcharts
