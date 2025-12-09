import { App } from 'vue'
import VkTemplateVis from './src/index.vue'
export * as __VkTemplateVis from './src/types'

VkTemplateVis.install = (app: App): void => {
  app.component(VkTemplateVis.name || 'VkTemplateVis', VkTemplateVis)
}
export {
  VkTemplateVis,
}
export default VkTemplateVis
