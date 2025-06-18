import type { App } from 'vue'
import VkTemplateMermaid from './src/index.vue'

export * as __VkTemplateMermaid from './src/types'

VkTemplateMermaid.install = (app: App): void => {
  app.component(VkTemplateMermaid.name || 'VkTemplateMermaid', VkTemplateMermaid)
}
export {
  VkTemplateMermaid,
}
export default VkTemplateMermaid
