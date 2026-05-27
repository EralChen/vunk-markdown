import type { __VkRendererTemplate } from '@vunk/core/components/renderer-template'
import { createStrategyRenderer } from '@vunk/core/components/strategy-renderer'

export type SlotArguments = __VkRendererTemplate.DefaultSlotArguments

export const {
  Data: VkRendererData,
  Renderer: VkRenderer,
  Template: VkRendererTemplate,
  Templates: VkRendererTemplates,
  useData: useRendererData,
} = createStrategyRenderer('@vunk/markdown')
