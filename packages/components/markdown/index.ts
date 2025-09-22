import type { App } from 'vue'
import VkMarkdown from './src/index.vue'

export * as __VkMarkdown from './src/types'

export { tokensToString, tokensToTree, treeToTokens } from './src/utils'

VkMarkdown.install = (app: App): void => {
  app.component(VkMarkdown.name || 'VkMarkdown', VkMarkdown)
}
export {
  VkMarkdown,
}
export default VkMarkdown
