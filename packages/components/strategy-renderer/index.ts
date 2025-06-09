import { createStrategyRenderer } from '@vunk/core/components/strategy-renderer'

export const {
  Data: VkRendererData,
  Renderer: VkRenderer,
  Template: VkRendererTemplate,
  Templates: VkRendererTemplates,
  useData: useRendererData,
} = createStrategyRenderer('@vunk/markdown')
