import { App } from 'vue'
import VkResolverJson from './src/index.vue'
export * as __VkResolverJson from './src/types'

VkResolverJson.install = (app: App): void => {
  app.component(VkResolverJson.name || 'VkResolverJson', VkResolverJson)
}
export {
  VkResolverJson,
}
export default VkResolverJson
