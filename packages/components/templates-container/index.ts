import type { App } from 'vue'
import VkTemplatesContainer from './src/index.vue'

export * as __VkTemplatesContainer from './src/types'

VkTemplatesContainer.install = (app: App): void => {
  app.component(VkTemplatesContainer.name || 'VkTemplatesContainer', VkTemplatesContainer)
}
export {
  VkTemplatesContainer,
}
export default VkTemplatesContainer
