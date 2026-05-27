import type { App } from 'vue'
import VkTemplatesFence from './src/index.vue'

export * as __VkTemplatesFence from './src/types'

VkTemplatesFence.install = (app: App): void => {
  app.component(VkTemplatesFence.name || 'VkTemplatesFence', VkTemplatesFence)
}
export {
  VkTemplatesFence,
}
export default VkTemplatesFence
