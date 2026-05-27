import type { App } from 'vue'
import VkResolverToon from './src/index.vue'

export * as __VkResolverToon from './src/types'

VkResolverToon.install = (app: App): void => {
  app.component(VkResolverToon.name || 'VkResolverToon', VkResolverToon)
}
export {
  VkResolverToon,
}
export default VkResolverToon
