import type { __VkMarkdown } from '@vunk-markdown/components/markdown'
import type { MaybeArray } from '@vunk/shared'
import type { PropType } from 'vue'

export const props = {
  source: {
    type: null as unknown as PropType<MaybeArray<__VkMarkdown.RendererToken>>,
    default: () => [],
  },
  repair: {
    type: Boolean,
    default: true,
  },
}

export const emits = {
}
