import { App } from 'vue'
import VkTemplatesDefault from './src/index.vue'
export * as __VkTemplatesDefault from './src/types'

VkTemplatesDefault.install = (app: App): void => {
  app.component(VkTemplatesDefault.name || 'VkTemplatesDefault', VkTemplatesDefault)
}
export {
  VkTemplatesDefault,
}
export default VkTemplatesDefault
